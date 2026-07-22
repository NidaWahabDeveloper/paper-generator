import jsPDF from "jspdf";

// ============================================================
// exportPaperToPdf()
// jsPDF library use karke paperData (meta + questions) ko
// ek real, downloadable PDF file mein convert karta hai.
// ============================================================
export function exportPaperToPdf(paperData) {
  const { meta, questions } = paperData;

  // A4 size ka PDF document banao
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 40;
  let y = 50;

  // ---- Header ----
  doc.setFont(undefined, "bold");
  doc.setFontSize(16);
  doc.text(meta.schoolName, pageWidth / 2, y, { align: "center" });

  y += 20;
  doc.setFont(undefined, "normal");
  doc.setFontSize(11);
  doc.text(
    `${meta.examName}   |   Class: ${meta.className}   |   Subject: ${meta.subject}`,
    pageWidth / 2,
    y,
    { align: "center" }
  );

  y += 12;
  doc.setDrawColor(78, 2, 80); // primary purple line (#4E0250 in RGB)
  doc.setLineWidth(1.5);
  doc.line(marginX, y, pageWidth - marginX, y);

  // ---- Meta row ----
  y += 22;
  doc.setFontSize(10);
  doc.text(
    `Teacher: ${meta.teacherName}    Date: ${meta.examDate}    Time: ${meta.timeAllowed}    Total Marks: ${meta.totalMarks}`,
    marginX,
    y
  );

  // ---- Instructions ----
  y += 20;
  doc.setFont(undefined, "italic");
  const instructionLines = doc.splitTextToSize(
    `Instructions: ${meta.instructions}`,
    pageWidth - marginX * 2
  );
  doc.text(instructionLines, marginX, y);
  y += instructionLines.length * 13 + 10;
  doc.setFont(undefined, "normal");

  // ---- Questions ----
  questions.forEach((q) => {
    // agar page khatam ho raha ho to naya page shuru kardo
    if (y > 760) {
      doc.addPage();
      y = 50;
    }

    doc.setFontSize(11);
    const qLines = doc.splitTextToSize(
      `Q${q.number}. ${q.text}   [${q.marks} marks]`,
      pageWidth - marginX * 2
    );
    doc.text(qLines, marginX, y);
    y += qLines.length * 14 + 4;

    if (q.options) {
      doc.setFontSize(10);
      q.options.forEach((opt, i) => {
        doc.text(`${String.fromCharCode(65 + i)}) ${opt}`, marginX + 20, y);
        y += 14;
      });
      y += 6;
    } else {
      y += 10;
    }
  });

  // ---- Footer ----
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text("Paper Generator", pageWidth / 2, 810, {
    align: "center",
  });

  doc.save("exam-paper.pdf");
}
