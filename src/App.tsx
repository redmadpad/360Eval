import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import BehaviorForm from "./BehaviorForm";
import MyBehaviors from "./MyBehaviors";
import MyEvaluations from "./MyEvaluations";
import AdminCategoriesPanel from "./AdminCategoriesPanel";
import AdminEvaluationsExport from "./AdminEvaluationsExport";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold accent-text">ارزیابی ۳۶۰ درجه</h2>
        <SignOutButton />
      </header>
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl mx-auto">
          <Content />
        </div>
      </main>
      <Toaster />
    </div>
  );
}

function Content() {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const isAdmin = loggedInUser?.email === "admin@company.com";

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold accent-text mb-4">سامانه ارزیابی ۳۶۰ درجه</h1>
        <Authenticated>
          <p className="text-xl text-slate-600">
            خوش آمدید، {loggedInUser?.email ?? "کاربر"}!
          </p>
        </Authenticated>
        <Unauthenticated>
          <p className="text-xl text-slate-600">برای استفاده وارد شوید</p>
        </Unauthenticated>
      </div>
      <Unauthenticated>
        <SignInForm />
      </Unauthenticated>
      <Authenticated>
        <div className="flex flex-col gap-6">
          {isAdmin && (
            <>
              <AdminCategoriesPanel />
              <AdminEvaluationsExport />
            </>
          )}
          <BehaviorForm />
          <MyBehaviors />
          <MyEvaluations />
        </div>
      </Authenticated>
    </div>
  );
}
