{`import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";

export default function BehaviorForm() {
  const categories = useQuery(api.behaviors.behaviorsCategoriesList) ?? [];
  const variables = useQuery(api.behaviors.cultureVariablesList) ?? [];
  const addBehavior = useMutation(api.behaviors.addBehavior);

  const [categoryId, setCategoryId] = useState("");
  const [variableId, setVariableId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!categoryId || !variableId || !title) return;
    await addBehavior({
      categoryId,
      variableId,
      title,
      description: description || undefined,
    });
    setTitle("");
    setDescription("");
    setCategoryId("");
    setVariableId("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
      <h2 className="font-bold text-lg">ثبت رفتار جدید</h2>
      <div>
        <label className="block mb-1">دسته‌بندی رفتاری:</label>
        <select
          className="w-full border rounded p-2"
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
          required
        >
          <option value="">انتخاب کنید</option>
          {categories.map((cat: any) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1">متغیر فرهنگ سازمانی:</label>
        <select
          className="w-full border rounded p-2"
          value={variableId}
          onChange={e => setVariableId(e.target.value)}
          required
        >
          <option value="">انتخاب کنید</option>
          {variables.map((v: any) => (
            <option key={v._id} value={v._id}>{v.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1">عنوان رفتار:</label>
        <input
          className="w-full border rounded p-2"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1">توضیحات:</label>
        <textarea
          className="w-full border rounded p-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded"
        disabled={!categoryId || !variableId || !title}
      >
        ثبت رفتار
      </button>
    </form>
  );
}
`}
