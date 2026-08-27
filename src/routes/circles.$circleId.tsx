import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, MessageSquare, FileText, ChevronRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { PageHeader, Screen, SectionTitle, Tag } from "@/components/dj/Shell";
import { circles, circleContent } from "@/lib/dj-data";

export const Route = createFileRoute("/circles/$circleId")({
  head: () => ({
    meta: [
      { title: "圈子详情 | 冻见 · 冷冻消融专区" },
      { name: "description", content: "圈内精选病例、导师答疑讨论与资源对接，配套七步进阶学习清单。" },
      { property: "og:title", content: "学习圈详情" },
      { property: "og:description", content: "精选病例、圈内讨论与资源对接三维内容生态。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CircleDetail,
});

function CircleDetail() {
  const { circleId } = Route.useParams();
  const c = circles.find((x) => x.id === circleId) ?? circles[0];
  const [added, setAdded] = useState(false);

  return (
    <Screen>
      <div className="-mx-4 -mt-4 mb-4">
        <PageHeader title={c.name} />
      </div>

      <section className="bg-brand rounded-2xl p-5 text-primary-foreground">
        <div className="flex items-center gap-3.5">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/20 text-lg font-bold">
            {c.owner.split("·")[1]?.trim().slice(0, 1) ?? "医"}
          </span>
          <div>
            <p className="text-[15px] font-semibold">{c.owner.split("·")[1]?.trim()}</p>
            <p className="mt-0.5 text-[11px] opacity-85">
              圈主 · {c.owner.split("·")[0]?.trim()}
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-8">
          <div>
            <p className="text-xl font-bold">{c.members.toLocaleString()}</p>
            <p className="text-[11px] opacity-80">成员总数</p>
          </div>
          <div>
            <p className="text-xl font-bold">{c.weekly}</p>
            <p className="text-[11px] opacity-80">周活跃讨论</p>
          </div>
        </div>
      </section>

      <SectionTitle title="精选病例层" />
      <div className="card-surface divide-y divide-border">
        {circleContent.cases.map((p) => (
          <div key={p.title} className="p-3.5">
            <p className="text-[13px] font-medium leading-snug text-foreground">{p.title}</p>
            <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
              <span>{p.author} 主任</span>
              <span className="flex items-center gap-1">
                <Flame className="h-3.5 w-3.5 text-warning" />
                {p.hot} 人看过
              </span>
            </div>
          </div>
        ))}
      </div>

      <SectionTitle title="圈内讨论层" />
      <div className="card-surface divide-y divide-border">
        {circleContent.topics.map((t) => (
          <div key={t.title} className="p-3.5">
            <Tag>{t.tag}</Tag>
            <p className="mt-1.5 text-[13px] leading-snug text-foreground">{t.title}</p>
            <p className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
              <MessageSquare className="h-3.5 w-3.5" />
              导师已答疑 · {t.replies} 条回复
            </p>
          </div>
        ))}
      </div>

      <SectionTitle title="资源对接层" />
      <div className="card-surface divide-y divide-border">
        {circleContent.resources.map((r, i) => (
          <Link
            key={r.title}
            to={i === 2 ? "/bases" : "/circles/$circleId"}
            params={{ circleId: c.id }}
            className="flex items-center gap-3 p-3.5"
          >
            <FileText className="h-4 w-4 text-primary" />
            <div className="flex-1">
              <p className="text-[13px] text-foreground">{r.title}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{r.meta}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        ))}
      </div>

      <SectionTitle title="七步进阶学习清单" />
      <div className="card-surface p-4">
        <div className="space-y-2">
          {circleContent.sevenSteps.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[11px] font-bold text-primary">
                {i + 1}
              </span>
              <p className="flex-1 text-[13px] text-foreground">{s}</p>
              {added && i < 2 && <CheckCircle2 className="h-4 w-4 text-success" />}
            </div>
          ))}
        </div>
        <button
          onClick={() => setAdded(true)}
          className={`mt-4 w-full rounded-xl py-2.5 text-[13px] font-medium ${
            added
              ? "bg-success/12 text-success"
              : "bg-brand text-primary-foreground"
          }`}
        >
          {added ? "已纳入我的学习计划" : "一键纳入我的计划"}
        </button>
      </div>
    </Screen>
  );
}
