{`import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function MyBehaviors() {
  const behaviors = useQuery(api.behaviors.myBehaviors) ?? [];

  return (
    <div className="border p-4 rounded space-y-2">
      <h2 className="font-bold text-lg mb-2">رفتارهای ثبت‌شده من</h2>
      {behaviors.length === 0 && <div>هنوز رفتاری ثبت نکرده‌اید.</div>}
      <ul className="space-y-2">
        {behaviors.map((b: any) => (
          <li key={b._id} className="border-b pb-2">
            <div className="font-semibold">{b.title}</div>
            {b.description && <div className="text-sm text-gray-600">{b.description}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
`}
