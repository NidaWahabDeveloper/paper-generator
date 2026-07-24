import { useState } from "react";
import { useForm } from "react-hook-form";
import Card from "../components/Card";
import Button from "../components/Button";
import PaperPreview from "../components/PaperPreview";
import Toast from "../components/Toast";
import { generatePaperData } from "../utils/generatePaper";
import { exportPaperToPdf } from "../utils/exportPdf";

export default function GeneratePaper() {
  // react-hook-form form ki saari values track karta hai
  const { register, handleSubmit , reset} = useForm({
    defaultValues: {
      schoolName: "",
      examName: "",
      className: "",
      subject: "",
      teacherName: "",
      examDate: "",
      timeAllowed: "",
      totalMarks: 50,
      paperType: "mcqs",
      difficulty: "medium",
      instructions: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [paperData, setPaperData] = useState(null);
  const [toast, setToast] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  // Toast dikhao aur 2.5 second baad khud gayab kardo
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleImageUpload = (e) => {
  const image = e.target.files[0];

  if (!image) return;

  const reader = new FileReader();

  reader.onload = () => {
    setImageBase64(reader.result);
  };

  reader.readAsDataURL(image);
};

const generateWithAI = async (values) => {
  const prompt = `You are an expert exam paper setter. Based on the attached image (if any) and these details:
School: ${values.schoolName}, Subject: ${values.subject}, Class: ${values.className},
Paper Type: ${values.paperType}, Difficulty: ${values.difficulty}, Total Marks: ${values.totalMarks}.

Generate exam questions in this EXACT JSON format only, no extra text, no markdown:
{"questions":[{"number":1,"type":"mcqs","text":"question here","marks":10,"options":["A","B","C","D"]}]}

If paperType is "short" or "long", omit the "options" field. Generate a reasonable number of questions so marks add up close to the total.`;

// 2. Image ka "data:image/png;base64,XXXX" wala prefix hatate hain
  //    (Gemini ko sirf XXXX wala hissa chahiye, prefix nahi)
  const base64Data = imageBase64 ? imageBase64.split(",")[1] : null;
// 3. Request ka "body" (jo bhejna hai) taiyar karte hain
  const parts = [{ text: prompt }];
  if (base64Data) {
    parts.push({ inline_data: { mime_type: "image/png", data: base64Data } });
  }

  // 4. Asal API call — yahan "await" use ho raha hai kyunke internet
  //    par jana hai, turant jawab nahi milta
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts }] }),
    }
  );

  const result = await response.json();

  // 5. AI ka jawab text ke roop mein nikaalte hain
  let aiText = result.candidates[0].content.parts[0].text;

  // 6. Kabhi kabhi AI jawab ke sath ```json waghera bhi bhej deta hai,
  //    usay saaf karte hain
  aiText = aiText.replace(/```json|```/g, "").trim();

  // 7. Text ko asal JavaScript object mein convert karte hain
  const aiData = JSON.parse(aiText);

  // 8. Meta (school name, exam name waghera) khud values se bana lete hain
  const meta = {
    schoolName: values.schoolName || "ABC Public School",
    examName: values.examName || "Mid Term Examination",
    className: values.className || "8th",
    subject: values.subject || "General Subject",
    teacherName: values.teacherName || "Class Teacher",
    examDate: values.examDate || "__________",
    timeAllowed: values.timeAllowed || "1 Hour",
    totalMarks: Number(values.totalMarks) || 50,
    paperType: values.paperType,
    difficulty: values.difficulty,
    instructions: values.instructions || "Attempt all questions.",
  };

  // 9. Meta + AI ke questions ko jodkar wapis bhejte hain
  return { meta, questions: aiData.questions };
};

  // Jab form submit ho (Generate Paper button dabaye)
  // const onSubmit = (values) => {
  //   setLoading(true);
  //   setPaperData(null);

  //   // 1.2 second ka fake delay — taake lage AI paper bana raha hai
  //   setTimeout(() => {
  //     const data = generatePaperData(values);
  //     setPaperData(data);
  //     setLoading(false);
  //     showToast("✅ Paper generated successfully!");
  //   }, 1200);
  // };

  const onSubmit = async (values) => {
  setLoading(true);
  setPaperData(null);

  try {
    // Pehle AI se try karo
    const data = await generateWithAI(values);
    setPaperData(data);
    showToast("✅ AI se paper generate ho gaya!");
  } catch (error) {
    // Agar AI fail ho jaye (network issue, ya kuch bhi), dummy paper dikhado
    console.error("AI failed, using dummy data:", error);
    const data = generatePaperData(values);
    setPaperData(data);
    showToast("✅ Paper generated!");
  } finally {
    setLoading(false);
  }
};


  const handleDownload = () => {
    exportPaperToPdf(paperData);
    showToast("⬇️ PDF downloaded!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* -------- LEFT: FORM -------- */}
      <Card>
        <h2 className="font-semibold mb-4">📝 Paper Details</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field label="School Name">
            <input {...register("schoolName")} placeholder="e.g. City Public School" className="input" />
          </Field>

          <Field label="Exam Name">
            <input {...register("examName")} placeholder="e.g. Mid Term Examination" className="input" />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Class">
              <input {...register("className")} placeholder="e.g. 8" className="input" />
            </Field>
            <Field label="Subject">
              <input {...register("subject")} placeholder="e.g. Computer Science" className="input" />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Teacher Name">
              <input {...register("teacherName")} placeholder="e.g. Ms. Ayesha" className="input" />
            </Field>
            <Field label="Date">
              <input type="date" {...register("examDate")} className="input" />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Time Allowed">
              <input {...register("timeAllowed")} placeholder="e.g. 1 Hour 30 Min" className="input" />
            </Field>
            <Field label="Total Marks">
              <input type="number" {...register("totalMarks")} className="input" />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Paper Type">
              <select {...register("paperType")} className="input">
                <option value="mcqs">MCQs</option>
                <option value="short">Short Questions</option>
                <option value="long">Long Questions</option>
                <option value="mixed">Mixed</option>
              </select>
            </Field>
            <Field label="Difficulty">
              <select {...register("difficulty")} className="input">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </Field>
          </div>

          <Field label="Upload Paper Image / PDF (optional — for show)">
            <input type="file" className="input" accept="image/*" onChange={handleImageUpload}/>
          </Field>

          <Field label="Additional Instructions">
            <textarea
              {...register("instructions")}
              placeholder="e.g. Generate MCQs with 4 options, easy language"
              className="input min-h-[70px]"
            />
          </Field>

          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                Generating...
              </>
            ) : (
              "✨ Generate Paper"
            )}
          </Button>


          <Button
  type="button"
  variant="secondary"
  onClick={() => {
    reset();
    setPaperData(null);
  }}
>
   Reset Form
</Button>
        </form>
      </Card>

      {/* -------- RIGHT: PREVIEW -------- */}
      <Card>
        <h2 className="font-semibold mb-4 no-print">📄 Paper Preview</h2>

        {!paperData && !loading && (
          <div className="text-gray-400 text-sm text-center py-16 animate-fadeIn">
            Form bhar kar "Generate Paper" dabayein — <br /> yahan paper preview show hoga.
          </div>
        )}

        {loading && (
          <div className="text-gray-400 text-sm text-center py-16 animate-pulseSoft">
            Generating your paper…
          </div>
        )}

        {paperData && (
          <div className="animate-fadeIn">
            <PaperPreview data={paperData} />
            <Button variant="secondary" className="mt-4 no-print" onClick={handleDownload}>
              ⬇️ Download as PDF
            </Button>
          </div>
        )}
      </Card>

      <Toast message={toast} />
    </div>
  );

}

// Chota helper component — label + input ko group karta hai
function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
