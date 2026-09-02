import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Users2, Eye, MapPin, CalendarDays } from "lucide-react";
import { PageHeader, Screen, SectionTitle, Tag } from "@/components/dj/Shell";
import { bases, baseDetail } from "@/lib/dj-data";

export const Route = createFileRoute("/bases/$baseId")({
  head: () => ({
    meta: [
      { title: "基地详情 | 冻见 · 冷冻消融专区" },
      { name: "description", content: "培训基地品牌介绍、授课特色、导师团队、实训视频回放与开班报名。" },
      { property: "og:title", content: "培训基地详情" },
      { property: "og:description", content: "查看基地导师团队、课程回放与开班计划，一键预约线下实训。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BaseDetail,
});

function BaseDetail() {
  const { baseId } = Route.useParams();
  const b = bases.find((x) => x.id === baseId) ?? bases[0];
  if (!b) return null;


  return (
    <Screen>
      <div className="-mx-4 -mt-4 mb-4">
        <PageHeader title="基地详情" />
      </div>

      <section className="bg-brand rounded-2xl p-5 text-primary-foreground">
        <h1 className="text-[17px] font-bold leading-snug">{b.hospital}</h1>
        <p className="mt-2 text-[12px] leading-relaxed opacity-90">{b.intro}</p>
        <div className="mt-4 flex gap-6">
          <div>
            <p className="text-2xl font-bold">{b.trained}</p>
            <p className="text-[11px] opacity-80">累计培养学员</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{baseDetail.classes.length}</p>
            <p className="text-[11px] opacity-80">近期开班计划</p>
          </div>
        </div>
      </section>

      <SectionTitle title="授课特色" />
      <div className="card-surface space-y-2.5 p-4">
        {baseDetail.features.map((f, i) => (
          <div key={f} className="flex gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[11px] font-bold text-primary">
              {i + 1}
            </span>
            <p className="text-[13px] leading-relaxed text-foreground">{f}</p>
          </div>
        ))}
      </div>

      <SectionTitle title="导师团队" />
      <div className="space-y-3">
        {baseDetail.mentors.map((m) => (
          <div key={m.name} className="card-surface flex items-center gap-3 p-3.5">
            <span className="bg-brand flex h-12 w-12 items-center justify-center rounded-full text-base font-semibold text-primary-foreground">
              {m.name.slice(0, 1)}
            </span>
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-foreground">{m.name}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{m.title}</p>
              <div className="mt-1.5 flex gap-1.5">
                {m.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <SectionTitle title="优质课程视频回放" />
      <div className="card-surface divide-y divide-border">
        {baseDetail.replays.map((r) => (
          <div key={r.title} className="flex items-center gap-3 p-3.5">
            <span className="bg-brand flex h-10 w-14 shrink-0 items-center justify-center rounded-lg">
              <Play className="h-4 w-4 fill-primary-foreground text-primary-foreground" />
            </span>
            <div className="flex-1">
              <p className="text-[13px] font-medium leading-snug text-foreground">{r.title}</p>
              <p className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
                <span>{r.duration}</span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {r.views} 次观看
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <SectionTitle title="开班计划与报名" />
      <div className="space-y-3">
        {baseDetail.classes.map((c) => (
          <div key={c.name} className="card-surface p-4">
            <p className="text-[14px] font-semibold text-foreground">{c.name}</p>
            <div className="mt-2 space-y-1 text-[11px] text-muted-foreground">
              <p className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {c.address}
              </p>
              <p className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                {c.time}
              </p>
              <p className="flex items-center gap-1.5">
                <Users2 className="h-3.5 w-3.5" />
                剩余名额 {c.seats} 席
              </p>
            </div>
            <Link
              to="/enroll"
              className="bg-brand mt-3 block rounded-lg py-2.5 text-center text-[13px] font-medium text-primary-foreground"
            >
              一键预约
            </Link>
          </div>
        ))}
      </div>
    </Screen>
  );
}
