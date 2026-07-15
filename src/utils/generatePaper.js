import { mcqBank, shortBank, longBank } from "../data/questionBank";

// Agar user ne field khali chhodi ho to default value de do
function orDefault(value, fallback) {
  return value && String(value).trim() ? value : fallback;
}

// ============================================================
// generatePaperData()
// Form ki values leta hai aur ek poora paper object banata hai:
// { meta: {...}, questions: [ {number, type, text, marks, options}, ... ] }
// ============================================================
export function generatePaperData(values) {
  // Step 1: Meta info (paper ki basic details) tayyar karo
  const meta = {
    schoolName: orDefault(values.schoolName, "ABC Public School"),
    examName: orDefault(values.examName, "Mid Term Examination"),
    className: orDefault(values.className, "8th"),
    subject: orDefault(values.subject, "General Subject"),
    teacherName: orDefault(values.teacherName, "Class Teacher"),
    examDate: orDefault(values.examDate, "__________"),
    timeAllowed: orDefault(values.timeAllowed, "1 Hour"),
    totalMarks: Number(values.totalMarks) || 50,
    paperType: values.paperType,
    difficulty: values.difficulty,
    instructions: orDefault(values.instructions, "Attempt all questions. Write neatly."),
  };

  // Step 2: Paper type ke hisab se kitne sawal banane hain
  let numberOfQuestions = 5;
  if (meta.paperType === "mixed") numberOfQuestions = 6;
  if (meta.paperType === "long") numberOfQuestions = 4;

  // Step 3: Har question ke marks nikalo
  const marksPerQuestion = Math.round(meta.totalMarks / numberOfQuestions);

  // Step 4: Har question banao
  const questions = [];

  for (let i = 0; i < numberOfQuestions; i++) {
    // Type decide karo (mixed ho to rotate karo: mcqs -> short -> long)
    let type = meta.paperType;
    if (meta.paperType === "mixed") {
      const types = ["mcqs", "short", "long"];
      type = types[i % types.length];
    }

    let baseText = "";
    let options = null;

    // Bank se sawal utha lo
    if (type === "mcqs") {
      baseText = mcqBank[i % mcqBank.length];
      options = [
        "Option A related to the topic",
        "Option B related to the topic",
        "Option C related to the topic",
        "Option D related to the topic",
      ];
    } else if (type === "short") {
      baseText = shortBank[i % shortBank.length];
    } else {
      baseText = longBank[i % longBank.length];
    }

    // Subject ab question text ke sath nahi jorha jayega — sirf baseText use hoga
    const text = baseText;

    questions.push({
      number: i + 1,
      type,
      text,
      marks: marksPerQuestion,
      options,
    });
  }

  return { meta, questions };
}