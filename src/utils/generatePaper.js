import { mcqBank, shortBank, longBank } from "../data/questionBank";

// "{subject}" ki jagah asli subject ka naam daal do
function fillTemplate(text, subject) {
  return text.replace("{subject}", subject || "the subject");
}

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

  // Paper type ke hisab se kitne sawal banane hain
  let numberOfQuestions = 5;
  if (meta.paperType === "mixed") numberOfQuestions = 6;
  if (meta.paperType === "long") numberOfQuestions = 4;

  const marksPerQuestion = Math.round(meta.totalMarks / numberOfQuestions);

  const questions = [];

  for (let i = 0; i < numberOfQuestions; i++) {
    // decide karo is number ke liye konsa type banega
    let type = meta.paperType;
    if (meta.paperType === "mixed") {
      const types = ["mcqs", "short", "long"];
      type = types[i % types.length];
    }

    let text = "";
    let options = null;

    if (type === "mcqs") {
      text = fillTemplate(mcqBank[i % mcqBank.length], meta.subject);
      options = [
        "Option A related to the topic",
        "Option B related to the topic",
        "Option C related to the topic",
        "Option D related to the topic",
      ];
    } else if (type === "short") {
      text = fillTemplate(shortBank[i % shortBank.length], meta.subject);
    } else {
      text = fillTemplate(longBank[i % longBank.length], meta.subject);
    }

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
