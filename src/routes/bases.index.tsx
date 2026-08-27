import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Users2, CalendarDays } from "lucide-react";
import { PageHeader, Screen, Tag } from "@/components/dj/Shell";
import { bases } from "@/lib/dj-data";

export const Route = createFileRoute("/bases/")({
  head: () => ({
    meta: [
      { title: "培训基地 | 冻见 · 冷冻消融专区" },
      { name: "description", content: "全国冷冻消融培训基地列表，按地区与专科方向筛选，查看开班计划与报名入口。" },
      { property: "og:title", content: "冷冻消融培训基地" },
      { property: "og:description", content: "按地区与专科方向筛选培训基地，查看近期开班并一键预约。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BasesPage,
});

const regions = ["全部", "华东", "华北", "华南", "西南"];
const specialties = ["全部", "肺部", "肝脏", "肾癌", "联合治疗"];

function BasesPage() {
  const [region, setRegion] = useState("全部");
  const [spec, setSpec] = useState("全部");

  const list = bases.filter(
    (b) =>
      (region === "全部" || b.region === region) &&
      (spec === "全部" || b.specialty.includes(spec)),
  );

  return (
    <Screen tabbar>
      <div className="-mx-4 -mt-4 mb-4">
        <PageHeader title="培训基地" back={false} />
      </div>

      <Filter label="地区" options={regions} value={region} onChange={setRegion} />
      <Filter label="专科方向" options={specialties} value={spec} onChange={setSpec} />

      <div className="mt-4 space-y-3">
        {list.map((b) => (
          <Link
            key={b.id}
            to="/bases/$baseId"
            params={{ baseId: b.id }}
            className="card-surface block p-4"
          >
            <div className="flex items-start gap-2">
              <h3 className="flex-1 text-[15px] font-semibold leading-snug text-foreground">
                {b.hospital}
              </h3>
              <Tag>{b.region}</Tag>
            </div>
            <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">{b.intro}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users2 className="h-3.5 w-3.5" />
                累计培养 {b.trained} 名学员
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                近期开班 {b.next}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {b.specialty}
              </span>
            </div>
          </Link>
        ))}
        {list.length === 0 && (
          <p className="card-surface p-6 text-center text-[12px] text-muted-foreground">
            暂无符合筛选条件的培训基地
          </p>
        )}
      </div>
    </Screen>
  );
}

function Filter({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mt-3 flex items-center gap-2">
      <span className="w-14 shrink-0 text-[11px] text-muted-foreground">{label}</span>
      <div className="-mx-1 flex flex-1 gap-2 overflow-x-auto px-1 pb-1">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`shrink-0 rounded-full px-3 py-1 text-[12px] ${
              value === o
                ? "bg-brand text-primary-foreground"
                : "bg-card text-muted-foreground shadow-[var(--shadow-card)]"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
