import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageSquare, Users2 } from "lucide-react";
import { PageHeader, Screen } from "@/components/dj/Shell";
import { circles } from "@/lib/dj-data";

export const Route = createFileRoute("/circles/")({
  head: () => ({
    meta: [
      { title: "学习圈 | 冻见 · 冷冻消融专区" },
      { name: "description", content: "肺部、肝脏、肾癌冷冻学习圈：病例精讲、导师答疑与资源对接。" },
      { property: "og:title", content: "冷冻消融学习圈" },
      { property: "og:description", content: "加入专科学习圈，参与病例讨论与导师答疑。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CirclesPage,
});

function CirclesPage() {
  return (
    <Screen tabbar>
      <div className="-mx-4 -mt-4 mb-4">
        <PageHeader title="学习圈" back={false} />
      </div>
      <div className="space-y-3">
        {circles.map((c) => (
          <Link
            key={c.id}
            to="/circles/$circleId"
            params={{ circleId: c.id }}
            className="card-surface flex items-center gap-3.5 p-4"
          >
            <span className="bg-brand flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold text-primary-foreground">
              {c.emoji}
            </span>
            <div className="flex-1">
              <p className="text-[15px] font-semibold text-foreground">{c.name}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">圈主：{c.owner}</p>
              <div className="mt-2 flex items-center gap-4 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users2 className="h-3.5 w-3.5" />
                  {c.members.toLocaleString()} 成员
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5" />
                  本周 {c.weekly} 条讨论
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Screen>
  );
}
