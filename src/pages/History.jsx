import Card from "../components/Card";

const dummyHistory = [
  { subject: "Computer Science", cls: "8th", date: "2026-06-20", type: "MCQs" },
  { subject: "Mathematics", cls: "6th", date: "2026-06-18", type: "Mixed" },
  { subject: "English", cls: "9th", date: "2026-06-10", type: "Short Questions" },
];

export default function History() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">📜 Paper History</h2>
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bgsoft text-gray-400 text-xs uppercase">
            <tr>
              <th className="text-left px-5 py-3">Subject</th>
              <th className="text-left px-5 py-3">Class</th>
              <th className="text-left px-5 py-3">Type</th>
              <th className="text-left px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {dummyHistory.map((h, i) => (
              <tr key={i} className="border-t border-gray-100">
                <td className="px-5 py-3 font-medium">{h.subject}</td>
                <td className="px-5 py-3">{h.cls}</td>
                <td className="px-5 py-3">{h.type}</td>
                <td className="px-5 py-3 text-gray-400">{h.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
