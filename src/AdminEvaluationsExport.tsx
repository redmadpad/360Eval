{`import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";

export default function AdminEvaluationsExport() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [range, setRange] = useState<{ from: number; to: number } | null>(null);

  const evaluations = useQuery(
    api.evaluations.evaluationsByDateRange,
    range ? { from: range.from, to: range.to } : "skip"
  ) ?? [];

  function handleExport(e: React.FormEvent) {
    e.preventDefault();
    if (!from || !to) return;
    setRange({ from: new Date(from).getTime(), to: new Date(to).getTime() });
  }

  return (
    <div className="border p-4 rounded space-y-4">
      <h2 className="font-bold text-lg mb-2">استخراج ارزیابی‌ها بر اساس بازه زمانی</h2>
      <form onSubmit={handleExport} className="flex gap-4 items-end">
        <div>
          <label className="block mb-1">از تاریخ:</label>
          <input
            type="date"
            className="border rounded p-2"
            value={from}
            onChange={e => setFrom(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">تا تاریخ:</label>
          <input
            type="date"
            className="border rounded p-2"
            value={to}
            onChange={e => setTo(e.target.value)}
            required
          />
        </div>
        <button className="bg-indigo-600 text-white px-3 py-1 rounded" type="submit">
          نمایش
        </button>
      </form>
      {range && (
        <div>
          <h4 className="font-semibold mb-1">تعداد ارزیابی‌ها: {evaluations.length}</h4>
          <ul className="max-h-64 overflow-y-auto">
            {evaluations.map((e: any) => (
              <li key={e._id} className="border-b py-1">
                <span>امتیاز: {e.score}</span>
                {e.comment && <span className="ml-2 text-gray-600">({e.comment})</span>}
                <span className="ml-2 text-xs text-gray-400">
                  {new Date(e.createdAt).toLocaleDateString("fa-IR")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
`}
