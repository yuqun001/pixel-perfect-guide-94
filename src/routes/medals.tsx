import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Screen, SectionTitle } from "@/components/dj/Shell";
import { medals } from "@/lib/dj-data";

export const Route = createFileRoute("/medals")({
  head: () => ({
    meta: [
      { title: "勋章墙 | 冻见 · 冷冻消融专区" },
      { name: "description", content: "阶段勋章与专项勋章展示：砺刃新星、破局勇士、登峰学者、三阶圆满等成就。" },
      { property: "og:title", content: "勋章墙 · 冻见专区" },
      { property: "og:description", content: "查看已获得与待解锁的学习成就勋章及获得规则。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Medals,
});

function MedalGrid({ items }: { items: typeof medals.stage }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((m) => (
        <div key={m.name} className="card-surface flex flex-col items-center p-4 text-center">
          <span
            className={`flex h-16 w-16 items-center justify-center rounded-full text-2xl ${
              m.earned
                ? "medal-glow bg-[linear-gradient(135deg,oklch(0.86_0.12_88),oklch(0.7_0.15_62))] text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {m.icon}
          </span>
          <p
            className={`mt-2.5 text-[14px] font-semibold ${
              m.earned ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {m.name}
          </p>
          <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{m.rule}</p>
          <span
            className={`mt-2 rounded-full px-2 py-0.5 text-[10px] ${
              m.earned ? "bg-success/12 text-success" : "bg-muted text-muted-foreground"
            }`}
          >
            {m.earned ? "已获得" : "未获得"}
          </span>
        </div>
      ))}
    </div>
  );
}

function Medals() {
  const earned = [...medals.stage, ...medals.special].filter((m) => m.earned).length;
  return (
    <Screen>
      <div className="-mx-4 -mt-4 mb-4">
        <PageHeader title="勋章墙" />
      </div>
      <div className="bg-brand rounded-2xl p-5 text-primary-foreground">
        <p className="text-sm opacity-85">已点亮勋章</p>
        <p className="mt-1 text-3xl font-bold">
          {earned}
          <span className="ml-1 text-base font-normal opacity-80">/ 8</span>
        </p>
        <p className="mt-2 text-[11px] opacity-80">持续学习与实践，解锁更多专业成就</p>
      </div>

      <SectionTitle title="阶段勋章" />
      <MedalGrid items={medals.stage} />

      <SectionTitle title="专项勋章" />
      <MedalGrid items={medals.special} />
    </Screen>
  );
}
