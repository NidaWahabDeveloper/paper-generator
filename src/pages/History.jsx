import { useState } from "react";
import Card from "../components/Card";

const dummyHistory = [
  { subject: "Computer Science", cls: "8th", date: "2026-06-20", type: "MCQs" },
  { subject: "Mathematics", cls: "6th", date: "2026-06-18", type: "Mixed" },
  { subject: "English", cls: "9th", date: "2026-06-10", type: "Short Questions" },
];

export default function History() {
  const [search, setSearch] = useState("");

  const filteredHistory = dummyHistory.filter((item) =>
    item.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">📜 Paper History</h2>

      <input
        type="text"
        placeholder="Search History..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
      />

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
            {filteredHistory.map((h, i) => (
              <tr key={i} className="border-t border-gray-100">
                <td className="px-5 py-3 font-medium">{h.subject}</td>
                <td className="px-5 py-3">{h.cls}</td>
                <td className="px-5 py-3">{h.type}</td>
                <td className="px-5 py-3 text-gray-400">{h.date}</td>
              </tr>
            ))}

            {filteredHistory.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}