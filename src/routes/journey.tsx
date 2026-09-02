import { createFileRoute, Link } from "@tanstack/react-router";
import { Medal, Video, Building2, FileText } from "lucide-react";
import { PageHeader, Screen, SectionTitle, Bar, Tag } from "@/components/dj/Shell";
import { courses, stages, medals } from "@/lib/dj-data";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "我的学习旅程 | 冻见 · 冷冻消融专区" },
      { name: "description", content: "查看自测段位、三阶段学习进度、课程学习进度与能力档案。" },
      { property: "og:title", content: "我的学习旅程" },
      { property: "og:description", content: "我的段位、学习进度、能力档案与已获勋章。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Journey,
});

function Journey() {
  const overall = Math.round(
    stages.reduce((acc, s) => acc + s.progress, 0) / stages.length,
  );

  return (
    <Screen tabbar>
      <div className="-mx-4 -mt-4 mb-4">
        <PageHeader title="我的学习旅程" back={false} />
      </div>

      <section className="bg-brand rounded-2xl p-5 text-primary-foreground">
        <p className="text-xs opacity-80">最近一次能力自测</p>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold">熟练段位 · 独立开台</p>
            <p className="mt-1 text-[11px] opacity-85">66 分 · 建议进入破局实战营</p>
          </div>
          <Link
            to="/assess"
            className="rounded-full bg-primary-foreground/20 px-3 py-1.5 text-[11px] font-medium"
          >
            重新自测
          </Link>
        </div>
      </section>

      <SectionTitle
        title="三阶段进度总览"
        action={
          <Link to="/path" className="text-[12px] text-primary">
            全部阶段
          </Link>
        }
      />
      <div className="card-surface space-y-4 p-4">
        {stages.map((s) => (
          <div key={s.key}>
            <div className="flex items-center justify-between text-[13px]">
              <span className="font-medium text-foreground">{s.name}</span>
              <span className="text-muted-foreground">{s.progress}%</span>
            </div>
            <div className="mt-2">
              <Bar value={s.progress} />
            </div>
          </div>
        ))}
        <div className="rounded-lg bg-muted/60 p-3">
          <p className="text-[12px] text-foreground">整体完成度</p>
          <p className="mt-1 text-2xl font-bold text-primary">{overall}%</p>
        </div>
      </div>

      <SectionTitle
        title="课程学习进度"
        action={
          <Link to="/path" className="text-[12px] text-primary">
            更多
          </Link>
        }
      />
      <div className="card-surface divide-y divide-border">
        {courses
          .filter((c) => c.progress > 0)
          .map((c) => (
            <Link
              key={c.id}
              to="/course/$courseId"
              params={{ courseId: c.id }}
              className="block p-3.5"
            >
              <div className="flex items-start gap-2">
                <p className="flex-1 text-[13px] font-medium leading-snug text-foreground">
                  {c.title}
                </p>
                <Tag tone={c.type === "必修" ? "primary" : "muted"}>{c.type}</Tag>
              </div>
              <div className="mt-2">
                <Bar value={c.progress} />
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">{c.progress}% 已学</p>
            </Link>
          ))}
        {courses.filter((c) => c.progress > 0).length === 0 && (
          <p className="p-4 text-[12px] text-muted-foreground">暂无在学的课程</p>
        )}
      </div>

      <SectionTitle title="能力档案" />
      <div className="grid grid-cols-2 gap-3">
        <div className="card-surface flex flex-col gap-2 p-4">
          <div className="flex items-center gap-2 text-[13px] font-semibold text-foreground">
            <Video className="h-4 w-4 text-primary" />
            线上学习
          </div>
          <p className="text-[11px] text-muted-foreground">
            已修 7 课时 / 完成 2 门测验 / 平均 4.8 分
          </p>
        </div>
        <div className="card-surface flex flex-col gap-2 p-4">
          <div className="flex items-center gap-2 text-[13px] font-semibold text-foreground">
            <Building2 className="h-4 w-4 text-primary" />
            线下培训
          </div>
          <p className="text-[11px] text-muted-foreground">
            已报名 0 班次 / 开台记录 0 / 术后病例 1
          </p>
        </div>
        <Link to="/medals" className="card-surface col-span-2 flex items-center justify-between p-4">
          <div className="flex items-center gap-2 text-[13px] font-semibold text-foreground">
            <Medal className="h-4 w-4 text-gold" />
            已获勋章
          </div>
          <span className="text-[12px] text-primary">
            {medals.stage.concat(medals.special).filter((m) => m.earned).length} 枚
          </span>
        </Link>
        <div className="card-surface col-span-2 flex items-center gap-2 p-4 text-[13px] font-semibold text-foreground">
          <FileText className="h-4 w-4 text-primary" />
          病例提交记录
          <span className="ml-auto text-[12px] font-normal text-muted-foreground">1 例评审中</span>
        </div>
      </div>
    </Screen>
  );
}
