import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Lock } from "lucide-react";
import { PageHeader, Screen, SectionTitle, Bar, Tag } from "@/components/dj/Shell";
import { CourseCard } from "@/components/dj/CourseCard";
import { courses, stages } from "@/lib/dj-data";

export const Route = createFileRoute("/path")({
  head: () => ({
    meta: [
      { title: "三阶段学习路径 | 冻见 · 冷冻消融专区" },
      {
        name: "description",
        content: "砺刃基础营、破局实战营、登峰大师营三阶段学习路径与课程进度总览。",
      },
      { property: "og:title", content: "三阶段学习路径" },
      { property: "og:description", content: "砺刃基础营 / 破局实战营 / 登峰大师营完整学习路径。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PathPage,
});

function PathPage() {
  return (
    <Screen tabbar>
      <div className="-mx-4 -mt-4 mb-4">
        <PageHeader title="三阶段学习路径" />
      </div>

      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
        {stages.map((s) => (
          <Link
            key={s.key}
            to="/path/$stage"
            params={{ stage: s.key }}
            className={`card-surface w-[210px] shrink-0 p-4 ${
              s.status === "locked" ? "opacity-70" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-semibold text-foreground">{s.name}</p>
              {s.status === "done" ? (
                <Tag tone="success">已完成</Tag>
              ) : s.status === "current" ? (
                <Tag>进行中</Tag>
              ) : (
                <Tag tone="muted">未解锁</Tag>
              )}
            </div>
            <p className="mt-1.5 line-clamp-2 text-[11px] text-muted-foreground">{s.subtitle}</p>
            <div className="mt-3">
              <Bar value={s.progress} />
            </div>
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              {s.progress}% · 共 {s.courseCount} 门课程
            </p>
          </Link>
        ))}
      </div>

      <SectionTitle title="学习路线总览" />
      <div className="card-surface p-4">
        {stages.map((s, i) => (
          <div key={s.key} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${
                  s.status === "done"
                    ? "bg-success text-success-foreground"
                    : s.status === "current"
                      ? "bg-brand text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {s.status === "done" ? (
                  <Check className="h-4 w-4" />
                ) : s.status === "locked" ? (
                  <Lock className="h-3 w-3" />
                ) : (
                  i + 1
                )}
              </span>
              {i < stages.length - 1 && <span className="my-1 w-px flex-1 bg-border" />}
            </div>
            <div className="pb-5">
              <p className="text-[14px] font-semibold text-foreground">{s.name}</p>
              <p className="mt-1 text-[12px] text-muted-foreground">{s.subtitle}</p>
              <Link
                to="/path/$stage"
                params={{ stage: s.key }}
                className="mt-1.5 inline-block text-[12px] text-primary"
              >
                查看阶段详情 →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <SectionTitle title="当前阶段课程" />
      <div className="space-y-3">
        {courses
          .filter((c) => c.stage === "battle")
          .map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
      </div>
    </Screen>
  );
}
