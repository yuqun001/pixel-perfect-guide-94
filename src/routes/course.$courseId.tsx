import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Star, Users, Clock, CheckCircle2 } from "lucide-react";
import { PageHeader, Screen, SectionTitle, Bar } from "@/components/dj/Shell";
import { courses } from "@/lib/dj-data";

export const Route = createFileRoute("/course/$courseId")({
  head: () => ({
    meta: [
      { title: "课程学习 | 冻见 · 冷冻消融专区" },
      { name: "description", content: "冷冻消融课程视频学习、章节列表、课程简介与课后测验入口。" },
      { property: "og:title", content: "课程学习 · 冻见专区" },
      { property: "og:description", content: "视频课程、章节列表与课后测验。" },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CoursePage,
});

function CoursePage() {
  const { courseId } = Route.useParams();
  const c = courses.find((x) => x.id === courseId) ?? courses[0];
  if (!c) return null;


  return (
    <Screen>
      <div className="-mx-4 -mt-4 mb-4">
        <PageHeader title="课程学习" />
      </div>

      <div className="bg-brand relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl">
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_20%,white,transparent_45%),radial-gradient(circle_at_80%_70%,white,transparent_40%)]" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/25 backdrop-blur">
          <Play className="ml-0.5 h-7 w-7 fill-primary-foreground text-primary-foreground" />
        </span>
        <span className="absolute bottom-3 left-4 text-xs text-primary-foreground/90">
          示例课程封面 · 演示占位
        </span>
      </div>

      <h1 className="mt-4 text-[17px] font-bold leading-snug text-foreground">{c.title}</h1>
      <p className="mt-1.5 text-xs text-muted-foreground">
        {c.teacher} | {c.hospital}
      </p>
      <div className="mt-2.5 flex items-center gap-4 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          {c.rating}
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          {c.learners} 人在学
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {c.lessons} 课时
        </span>
      </div>

      <div className="card-surface mt-3 p-4">
        <p className="text-[13px] font-semibold">课程简介</p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">{c.intro}</p>
        <div className="mt-3">
          <Bar value={c.progress} />
        </div>
        <p className="mt-1.5 text-[11px] text-muted-foreground">学习进度 {c.progress}%</p>
      </div>

      <SectionTitle title="章节列表" />
      <div className="card-surface divide-y divide-border">
        {c.chapters.map((ch, i) => {
          const learned = (i + 1) / c.chapters.length <= c.progress / 100;
          return (
            <div key={ch.title} className="flex items-center gap-3 p-3.5">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] ${
                  learned ? "bg-success/12 text-success" : "bg-muted text-muted-foreground"
                }`}
              >
                {learned ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </span>
              <p className="flex-1 text-[13px] text-foreground">{ch.title}</p>
              <span className="text-[11px] text-muted-foreground">{ch.duration}</span>
            </div>
          );
        })}
      </div>

      <Link
        to="/assess"
        className="bg-brand mt-6 block rounded-xl py-3 text-center text-sm font-medium text-primary-foreground"
      >
        进入测验
      </Link>
    </Screen>
  );
}
