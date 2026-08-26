import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Medal, Check, Lock, Flame, ChevronRight } from "lucide-react";
import { PageHeader, Screen, SectionTitle, Bar } from "@/components/dj/Shell";
import { CourseCard } from "@/components/dj/CourseCard";
import { courses, stages, circles, hotCases } from "@/lib/dj-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "冻见 · 冷冻消融专区 | 冻见新境 · 消融有道" },
      {
        name: "description",
        content:
          "冻见冷冻消融专区：三阶学习路径、能力自测、培训基地、学习圈与病例通道，助力医生系统掌握冷冻消融技术。",
      },
      { property: "og:title", content: "冻见 · 冷冻消融专区" },
      {
        property: "og:description",
        content: "冻见新境 · 消融有道：三阶学习路径、培训基地与学习圈一站式医学教育专区。",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DongjianHome,
});

function DongjianHome() {
  return (
    <Screen tabbar>
      <div className="-mx-4 -mt-4 mb-4">
        <PageHeader
          title="冻见 · 冷冻消融专区"
          back={false}
          right={
            <Link
              to="/medals"
              aria-label="勋章墙"
              className="flex h-9 w-9 items-center justify-center rounded-full active:bg-primary-foreground/15"
            >
              <Medal className="h-5 w-5" />
            </Link>
          }
        />
      </div>

      <section className="bg-brand relative overflow-hidden rounded-2xl px-5 py-6 text-primary-foreground shadow-[var(--shadow-header)]">
        <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-primary-foreground/10" />
        <p className="text-xs tracking-[0.3em] opacity-80">DONGJIAN</p>
        <h2 className="mt-2 text-2xl font-bold tracking-wide">冻见新境 · 消融有道</h2>
        <p className="mt-2 text-xs opacity-85">冷冻消融规范化学习与实训一体化平台</p>
      </section>

      <div className="mt-4 flex items-center gap-2 rounded-xl bg-card px-3 py-2.5 shadow-[var(--shadow-card)]">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          placeholder="搜课程、搜病例、搜带教、搜基地..."
        />
      </div>

      <Link
        to="/assess"
        className="card-surface mt-4 flex items-center gap-3 border border-primary/15 p-3.5"
      >
        <div className="flex-1">
          <p className="text-[13px] font-medium text-foreground">
            根据您未测状态，建议从「砺刃基础营」开始
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            完成 5 道题能力自测，获取专属课程包推荐
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-medium text-primary">
          去自测
        </span>
      </Link>

      <SectionTitle
        title="三阶学习路径"
        action={
          <Link to="/path" className="flex items-center text-[12px] text-primary">
            查看完整三阶学习路径 <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        }
      />
      <div className="card-surface flex items-start gap-1 p-4">
        {stages.map((s, i) => (
          <div key={s.key} className="flex flex-1 flex-col items-center text-center">
            <div className="flex w-full items-center">
              <span className={`h-0.5 flex-1 ${i === 0 ? "bg-transparent" : "bg-border"}`} />
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  s.status === "done"
                    ? "bg-success text-success-foreground"
                    : s.status === "current"
                      ? "bg-brand text-primary-foreground ring-4 ring-primary-soft"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {s.status === "done" ? (
                  <Check className="h-4 w-4" />
                ) : s.status === "locked" ? (
                  <Lock className="h-3.5 w-3.5" />
                ) : (
                  i + 1
                )}
              </span>
              <span
                className={`h-0.5 flex-1 ${i === stages.length - 1 ? "bg-transparent" : "bg-border"}`}
              />
            </div>
            <Link
              to="/path/$stage"
              params={{ stage: s.key }}
              className={`mt-2 text-[12px] font-medium ${
                s.status === "locked" ? "text-muted-foreground" : "text-foreground"
              }`}
            >
              {s.name}
            </Link>
            <span className="mt-0.5 text-[10px] text-muted-foreground">
              {s.status === "done" ? "已完成" : s.status === "current" ? "进行中" : "未解锁"}
            </span>
          </div>
        ))}
      </div>

      <SectionTitle title="推荐学习内容" />
      <div className="space-y-3">
        {courses.slice(0, 3).map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>

      <SectionTitle
        title="热门学习圈"
        action={
          <Link to="/circles" className="text-[12px] text-primary">
            全部圈子
          </Link>
        }
      />
      <div className="card-surface flex justify-around p-4">
        {circles.map((c) => (
          <Link
            key={c.id}
            to="/circles/$circleId"
            params={{ circleId: c.id }}
            className="flex flex-col items-center gap-2"
          >
            <span className="bg-brand flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold text-primary-foreground">
              {c.emoji}
            </span>
            <span className="text-[12px] text-foreground">{c.name}</span>
            <span className="text-[10px] text-muted-foreground">
              {c.members.toLocaleString()} 成员
            </span>
          </Link>
        ))}
      </div>

      <SectionTitle title="本周热门病例" />
      <div className="card-surface divide-y divide-border">
        {hotCases.map((c) => (
          <Link
            key={c.title}
            to="/circles/$circleId"
            params={{ circleId: "lung" }}
            className="flex items-center gap-3 p-3.5"
          >
            <p className="flex-1 text-[13px] leading-snug text-foreground">{c.title}</p>
            <span className="flex shrink-0 items-center gap-1 text-[11px] text-muted-foreground">
              <Flame className="h-3.5 w-3.5 text-warning" />
              {c.hot} 人看过
            </span>
          </Link>
        ))}
      </div>

      <SectionTitle title="快捷入口" />
      <div className="grid grid-cols-2 gap-3">
        <Link to="/case-submit" className="card-surface p-3.5 text-[13px] font-medium">
          病例提交通道
          <p className="mt-1 text-[11px] font-normal text-muted-foreground">上传规范病例视频</p>
        </Link>
        <Link to="/bases" className="card-surface p-3.5 text-[13px] font-medium">
          培训基地报名
          <p className="mt-1 text-[11px] font-normal text-muted-foreground">线下实训一键预约</p>
        </Link>
      </div>

      <div className="card-surface mt-3 p-4">
        <p className="text-[13px] font-medium">我的整体进度</p>
        <div className="mt-2">
          <Bar value={48} />
        </div>
        <p className="mt-1.5 text-[11px] text-muted-foreground">三阶路径累计完成 48%</p>
      </div>
    </Screen>
  );
}
