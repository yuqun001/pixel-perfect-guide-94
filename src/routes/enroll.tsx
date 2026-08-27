import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { PageHeader, Screen, SectionTitle } from "@/components/dj/Shell";

export const Route = createFileRoute("/enroll")({
  head: () => ({
    meta: [
      { title: "实训班报名 | 冻见 · 冷冻消融专区" },
      { name: "description", content: "填写基本信息与报名问卷，预约冷冻消融线下规范化实训班。" },
      { property: "og:title", content: "实训班报名" },
      { property: "og:description", content: "提交报名信息与问卷，预约线下冷冻消融实训班。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Enroll,
});

const questions = [
  { q: "您目前的冷冻消融开台经验：", options: ["未开展", "1-10 例", "11-50 例", "50 例以上"] },
  { q: "您希望重点提升的方向：", options: ["路径规划", "并发症处理", "联合治疗", "疗效评估"] },
  { q: "您所在科室：", options: ["肿瘤介入科", "呼吸内科", "泌尿外科", "肝胆外科"] },
];

function Enroll() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", note: "" });
  const [picks, setPicks] = useState<Record<number, number>>({});

  if (submitted) {
    return (
      <Screen>
        <div className="-mx-4 -mt-4 mb-4">
          <PageHeader title="报名成功" />
        </div>
        <div className="card-surface mt-10 flex flex-col items-center p-8 text-center">
          <CheckCircle2 className="h-16 w-16 text-success" />
          <p className="mt-4 text-[16px] font-semibold text-foreground">报名提交成功</p>
          <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
            基地教学秘书将在 1-2 个工作日内与您电话确认名额与行程安排，请保持手机畅通。
          </p>
          <Link
            to="/bases"
            className="bg-brand mt-6 w-full rounded-xl py-3 text-sm font-medium text-primary-foreground"
          >
            返回培训基地
          </Link>
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <div className="-mx-4 -mt-4 mb-4">
        <PageHeader title="实训班报名" />
      </div>

      <SectionTitle title="基本信息" />
      <div className="card-surface space-y-3 p-4">
        <Field label="姓名">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="请输入真实姓名"
            className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-[13px] outline-none focus:border-primary"
          />
        </Field>
        <Field label="手机号">
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            inputMode="tel"
            placeholder="用于接收开班通知"
            className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-[13px] outline-none focus:border-primary"
          />
        </Field>
      </div>

      <SectionTitle title="报名问卷" />
      <div className="space-y-3">
        {questions.map((q, qi) => (
          <div key={q.q} className="card-surface p-4">
            <p className="text-[13px] font-medium text-foreground">
              {qi + 1}. {q.q}
            </p>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              {q.options.map((o, oi) => (
                <button
                  key={o}
                  onClick={() => setPicks({ ...picks, [qi]: oi })}
                  className={`rounded-lg border px-2 py-2 text-[12px] ${
                    picks[qi] === oi
                      ? "border-primary bg-primary-soft text-primary"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div className="card-surface p-4">
          <p className="text-[13px] font-medium text-foreground">4. 您希望在实训中解决的具体问题</p>
          <textarea
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            rows={4}
            placeholder="请简要描述，便于导师提前准备带教内容"
            className="mt-2.5 w-full resize-none rounded-lg border border-input bg-card px-3 py-2.5 text-[13px] outline-none focus:border-primary"
          />
        </div>
      </div>

      <button
        onClick={() => setSubmitted(true)}
        className="bg-brand mt-6 w-full rounded-xl py-3 text-sm font-medium text-primary-foreground"
      >
        提交报名
      </button>
    </Screen>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
