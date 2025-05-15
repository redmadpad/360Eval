{`import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";

export default function AdminCategoriesPanel() {
  const categories = useQuery(api.behaviors.behaviorsCategoriesList) ?? [];
  const variables = useQuery(api.behaviors.cultureVariablesList) ?? [];
  const addCategory = useMutation(api.behaviors.addCategory);
  const addVariable = useMutation(api.behaviors.addVariable);
  const removeCategory = useMutation(api.behaviors.removeCategory);
  const removeVariable = useMutation(api.behaviors.removeVariable);

  const [catName, setCatName] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [varName, setVarName] = useState("");
  const [varDesc, setVarDesc] = useState("");

  return (
    <div className="border p-4 rounded space-y-4">
      <h2 className="font-bold text-lg mb-2">مدیریت دسته‌بندی‌ها و متغیرها (ادمین)</h2>
      <div className="flex gap-8">
        <form
          onSubmit={async e => {
            e.preventDefault();
            if (!catName) return;
            await addCategory({ name: catName, description: catDesc || undefined });
            setCatName("");
            setCatDesc("");
          }}
          className="flex-1 space-y-2"
        >
          <h3 className="font-semibold">افزودن دسته‌بندی رفتاری</h3>
          <input
            className="border rounded p-2 w-full"
            placeholder="نام دسته‌بندی"
            value={catName}
            onChange={e => setCatName(e.target.value)}
            required
          />
          <input
            className="border rounded p-2 w-full"
            placeholder="توضیحات (اختیاری)"
            value={catDesc}
            onChange={e => setCatDesc(e.target.value)}
          />
          <button className="bg-indigo-600 text-white px-3 py-1 rounded" type="submit">
            افزودن
          </button>
        </form>
        <form
          onSubmit={async e => {
            e.preventDefault();
            if (!varName) return;
            await addVariable({ name: varName, description: varDesc || undefined });
            setVarName("");
            setVarDesc("");
          }}
          className="flex-1 space-y-2"
        >
          <h3 className="font-semibold">افزودن متغیر فرهنگ سازمانی</h3>
          <input
            className="border rounded p-2 w-full"
            placeholder="نام متغیر"
            value={varName}
            onChange={e => setVarName(e.target.value)}
            required
          />
          <input
            className="border rounded p-2 w-full"
            placeholder="توضیحات (اختیاری)"
            value={varDesc}
            onChange={e => setVarDesc(e.target.value)}
          />
          <button className="bg-indigo-600 text-white px-3 py-1 rounded" type="submit">
            افزودن
          </button>
        </form>
      </div>
      <div className="flex gap-8">
        <div className="flex-1">
          <h4 className="font-semibold mb-1">دسته‌بندی‌های فعلی:</h4>
          <ul>
            {categories.map((cat: any) => (
              <li key={cat._id} className="flex justify-between items-center border-b py-1">
                <span>{cat.name}</span>
                <button
                  className="text-red-600"
                  onClick={() => {
                    if (window.confirm("آیا از حذف این دسته‌بندی مطمئن هستید؟")) {
                      removeCategory({ id: cat._id });
                    }
                  }}
                >
                  حذف
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold mb-1">متغیرهای فعلی:</h4>
          <ul>
            {variables.map((v: any) => (
              <li key={v._id} className="flex justify-between items-center border-b py-1">
                <span>{v.name}</span>
                <button
                  className="text-red-600"
                  onClick={() => {
                    if (window.confirm("آیا از حذف این متغیر مطمئن هستید؟")) {
                      removeVariable({ id: v._id });
                    }
                  }}
                >
                  حذف
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
`}
