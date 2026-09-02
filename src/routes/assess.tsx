import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Screen, Bar } from "@/components/dj/Shell";
import { quizLevels, quizQuestions } from "@/lib/dj-data";

export const Route = createFileRoute("/assess")({
  head: () => ({
    meta: [
      { title: "能力自测 · 测一测你的冷冻消融段位 | 冻见专区" },
      { name: "description", content: "5 道题约 3 分钟，评估冷冻消融能力段位并获取专属课程包推荐。" },
      { property: "og:title", content: "冷冻消融能力自测" },
      { property: "og:description", content: "5 道题评估你的冷冻消融段位，获取推荐课程包。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Assess,
});

function Assess() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const score = answers.reduce(
    (acc, a, i) => acc + (a === quizQuestions[i]?.answer ? 20 : 0),
    0,
  );


  const pick = (i: number) => {
    const next = [...answers];
    next[idx] = i;
    setAnswers(next);
    setTimeout(() => {
      if (idx === quizQuestions.length - 1) setDone(true);
      else setIdx(idx + 1);
    }, 180);
  };

  if (done) {
    return (
      <Screen>
        <div className="-mx-4 -mt-4 mb-4">
          <PageHeader title="自测结果" />
        </div>
        <div className="bg-brand rounded-2xl p-5 text-center text-primary-foreground">
          <p className="text-xs opacity-80">本次得分</p>
          <p className="mt-1 text-4xl font-bold">{score}</p>
          <p className="mt-2 text-sm">
            {quizLevels.find((l) => score >= l.min && score <= l.max)?.level}
          </p>
        </div>
        <p className="mt-5 text-[13px] font-semibold">分档结果与推荐课程包</p>
        <div className="mt-2.5 space-y-3">
          {quizLevels.map((l) => {
            const hit = score >= l.min && score <= l.max;
            return (
              <div
                key={l.range}
                className={`rounded-xl border p-4 ${
                  hit
                    ? "border-primary bg-primary-soft shadow-[var(--shadow-card)]"
                    : "border-border bg-muted/40 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p
                    className={`text-[14px] font-semibold ${hit ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {l.level}
                  </p>
                  <span className="text-[11px] text-muted-foreground">{l.range}</span>
                </div>
                <p className="mt-2 text-[12px] text-foreground/80">推荐课程包：{l.pack}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{l.desc}</p>
              </div>
            );
          })}
        </div>
        <Link
          to="/path"
          className="bg-brand mt-6 block rounded-xl py-3 text-center text-sm font-medium text-primary-foreground"
        >
          按推荐进入学习路径
        </Link>
      </Screen>
    );
  }

  const q = quizQuestions[idx];
  return (
    <Screen>
      <div className="-mx-4 -mt-4 mb-4">
        <PageHeader title="能力自测" />
      </div>
      <h2 className="text-lg font-bold text-foreground">测一测你的冷冻消融段位</h2>
      <p className="mt-1 text-xs text-muted-foreground">5 道题，约 3 分钟</p>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1">
          <Bar value={((idx + 1) / quizQuestions.length) * 100} />
        </div>
        <span className="text-[11px] text-muted-foreground">
          {idx + 1}/{quizQuestions.length}
        </span>
      </div>

      <div className="card-surface mt-4 p-4">
        <p className="text-[15px] font-medium leading-relaxed text-foreground">
          {idx + 1}. {q.q}
        </p>
        <div className="mt-4 space-y-2.5">
          {q.options.map((o, i) => (
            <button
              key={o}
              onClick={() => pick(i)}
              className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-[13px] transition-colors ${
                answers[idx] === i
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-border bg-card text-foreground"
              }`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-[11px]">
                {String.fromCharCode(65 + i)}
              </span>
              {o}
            </button>
          ))}
        </div>
      </div>

      {idx > 0 && (
        <button
          onClick={() => setIdx(idx - 1)}
          className="mt-4 w-full rounded-xl border border-border py-2.5 text-sm text-muted-foreground"
        >
          上一题
        </button>
      )}
    </Screen>
  );
}
