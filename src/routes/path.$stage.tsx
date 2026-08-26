import { createFileRoute, Link } from "@tanstack/react-router";
import { Stethoscope, ChevronRight } from "lucide-react";
import { PageHeader, Screen, SectionTitle, Bar, Tag } from "@/components/dj/Shell";
import { courses, stages, type StageKey } from "@/lib/dj-data";

export const Route = createFileRoute("/path/$stage")({
  head: () => ({
    meta: [
      { title: "阶段详情 | 冻见 · 冷冻消融专区" },
      { name: "description", content: "查看阶段内必修与选修课程列表、学习进度与手术带教预约入口。" },
      { property: "og:title", content: "学习阶段详情" },
      { property: "og:description", content: "阶段必修选修课程、进度与手术带教预约。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StageDetail,
});

function StageDetail() {
  const { stage } = Route.useParams();
  const key = stage as StageKey;
  const s = stages.find((x) => x.key === key) ?? stages[0];
  const list = courses.filter((c) => c.stage === s.key);

  return (
    <Screen>
      <div className="-mx-4 -mt-4 mb-4">
        <PageHeader title={s.name} />
      </div>

      <div className="bg-brand rounded-2xl p-5 text-primary-foreground">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{s.name}</h2>
          <span className="rounded-full bg-primary-foreground/20 px-2.5 py-1 text-[11px]">
            {s.status === "done" ? "已完成" : s.status === "current" ? "进行中" : "未解锁"}
          </span>
        </div>
        <p className="mt-1.5 text-xs opacity-85">{s.subtitle}</p>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-primary-foreground/25">
          <div className="h-full bg-primary-foreground" style={{ width: `${s.progress}%` }} />
        </div>
        <p className="mt-1.5 text-[11px] opacity-85">
          进度 {s.progress}% · 共 {s.courseCount} 门课程
        </p>
      </div>

      {s.key === "battle" && (
        <Link to="/bases" className="card-surface mt-4 flex items-center gap-3 p-4">
          <span className="bg-brand flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground">
            <Stethoscope className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="text-[14px] font-semibold text-foreground">手术带教预约</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              线下手术一对一指导 · 导师匹配中
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Link>
      )}

      <SectionTitle title="必修课程" />
      <div className="card-surface divide-y divide-border">
        {list
          .filter((c) => c.type === "必修")
          .map((c) => (
            <CourseRow key={c.id} id={c.id} title={c.title} type={c.type} progress={c.progress} />
          ))}
        {list.filter((c) => c.type === "必修").length === 0 && (
          <p className="p-4 text-[12px] text-muted-foreground">本阶段暂无必修课程</p>
        )}
      </div>

      <SectionTitle title="选修 / 推荐课程" />
      <div className="card-surface divide-y divide-border">
        {list
          .filter((c) => c.type !== "必修")
          .map((c) => (
            <CourseRow key={c.id} id={c.id} title={c.title} type={c.type} progress={c.progress} />
          ))}
        {list.filter((c) => c.type !== "必修").length === 0 && (
          <p className="p-4 text-[12px] text-muted-foreground">本阶段暂无选修课程</p>
        )}
      </div>
    </Screen>
  );
}

function CourseRow({
  id,
  title,
  type,
  progress,
}: {
  id: string;
  title: string;
  type: string;
  progress: number;
}) {
  return (
    <Link to="/course/$courseId" params={{ courseId: id }} className="block p-3.5">
      <div className="flex items-start gap-2">
        <p className="flex-1 text-[13px] font-medium leading-snug text-foreground">{title}</p>
        <Tag tone={type === "必修" ? "primary" : "muted"}>{type}</Tag>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="flex-1">
          <Bar value={progress} />
        </div>
        <span className="w-16 text-right text-[11px] text-muted-foreground">
          {progress === 100 ? "已完成" : progress === 0 ? "未开始" : `${progress}%`}
        </span>
      </div>
    </Link>
  );
}
