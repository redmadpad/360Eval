import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function MyEvaluations() {
  const evaluations = useQuery(api.evaluations.myReceivedEvaluations) ?? [];

  return (
    <div className="border p-4 rounded space-y-2">
      <h2 className="font-bold text-lg mb-2">ارزیابی‌های دریافتی</h2>
      {evaluations.length === 0 && <div>هنوز ارزیابی‌ای دریافت نکرده‌اید.</div>}
      <ul className="space-y-2">
        {evaluations.map((e: any) => (
          <li key={e._id} className="border-b pb-2">
            <div>امتیاز: <b>{e.score}</b></div>
            {e.comment && <div className="text-sm text-gray-600">نظر: {e.comment}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
