import Card from "../components/Card";
import Button from "../components/Button";

export default function Settings() {
  return (
    <div className="max-w-md">
      <h2 className="text-lg font-semibold mb-4">⚙️ Settings</h2>
      <Card>
        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Default School Name</label>
        <input className="input mb-4" placeholder="e.g. City Public School" />

        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Default Teacher Name</label>
        <input className="input mb-4" placeholder="e.g. Ms. Ayesha" />

        <Button type="button">Save Settings</Button>
      </Card>
    </div>
  );
}
