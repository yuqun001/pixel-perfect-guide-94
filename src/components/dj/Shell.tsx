import { Link, useRouter, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ChevronLeft, Home, Building2, Users, GraduationCap } from "lucide-react";

export function PageHeader({
  title,
  right,
  back = true,
}: {
  title: string;
  right?: ReactNode;
  back?: boolean;
}) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-30 bg-brand text-primary-foreground shadow-[var(--shadow-header)]">
      <div className="mx-auto flex h-14 max-w-[430px] items-center gap-2 px-3">
        {back ? (
          <button
            aria-label="返回"
            onClick={() => router.history.back()}
            className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full transition-colors active:bg-primary-foreground/15"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        ) : (
          <span className="w-2" />
        )}
        <h1 className="flex-1 truncate text-[17px] font-semibold tracking-wide">{title}</h1>
        {right}
      </div>
    </header>
  );
}

const tabs = [
  { to: "/", label: "冻见首页", icon: Home },
  { to: "/bases", label: "培训基地", icon: Building2 },
  { to: "/circles", label: "学习圈", icon: Users },
  { to: "/journey", label: "我的学习", icon: GraduationCap },
];

export function TabBar() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-[430px] items-stretch">
        {tabs.map((t) => {
          const active = t.to === "/" ? pathname === "/" : pathname.startsWith(t.to);
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "stroke-[2.4]" : ""}`} />
              {t.label}
            </Link>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}

export function Screen({
  children,
  tabbar = false,
}: {
  children: ReactNode;
  tabbar?: boolean;
}) {
  return (
    <div className="min-h-screen bg-background">
      <main className={`mx-auto max-w-[430px] px-4 py-4 ${tabbar ? "pb-24" : "pb-10"}`}>
        {children}
      </main>
      {tabbar && <TabBar />}
    </div>
  );
}

export function SectionTitle({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-2.5 mt-5 flex items-end justify-between">
      <h2 className="flex items-center gap-2 text-[15px] font-semibold text-foreground">
        <span className="h-3.5 w-1 rounded-full bg-primary" />
        {title}
      </h2>
      {action}
    </div>
  );
}

export function Tag({
  children,
  tone = "primary",
}: {
  children: ReactNode;
  tone?: "primary" | "muted" | "success" | "warning";
}) {
  const tones = {
    primary: "bg-primary-soft text-primary",
    muted: "bg-muted text-muted-foreground",
    success: "bg-success/12 text-success",
    warning: "bg-warning/18 text-warning-foreground",
  } as const;
  return (
    <span className={`rounded-md px-1.5 py-0.5 text-[11px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function Bar({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div className="h-full rounded-full bg-brand" style={{ width: `${value}%` }} />
    </div>
  );
}
