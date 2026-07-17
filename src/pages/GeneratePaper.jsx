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

  // Toast dikhao aur 2.5 second baad khud gayab kardo
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // Jab form submit ho (Generate Paper button dabaye)
  const onSubmit = (values) => {
    setLoading(true);
    setPaperData(null);

    // 1.2 second ka fake delay — taake lage AI paper bana raha hai
    setTimeout(() => {
      const data = generatePaperData(values);
      setPaperData(data);
      setLoading(false);
      showToast("✅ Paper generated successfully!");
    }, 1200);
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
            <input type="file" className="input" />
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
