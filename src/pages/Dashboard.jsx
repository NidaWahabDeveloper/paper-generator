import Card from "../components/Card";

const stats = [
  { label: "Papers Generated", value: "12", color: "text-primary" },
  { label: "Subjects Covered", value: "5", color: "text-secondary" },
  { label: "This Week", value: "3", color: "text-accent" },
];

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-1">Welcome back 👋</h2>
      <p className="text-sm text-gray-400 mb-6">Here's a quick overview of your paper generator.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 animate-fadeIn">
        {stats.map((s) => (
          <Card key={s.label}>
            <p className="text-xs font-semibold text-gray-400 uppercase">{s.label}</p>
            <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <Card>
        <p className="text-sm text-gray-500">
          Go to <b>Generate Paper</b> from the sidebar to create a new exam paper.
        </p>
      </Card>
    </div>
  );
}
