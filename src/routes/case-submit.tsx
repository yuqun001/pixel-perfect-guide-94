import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Upload } from "lucide-react";
import { PageHeader, Screen } from "@/components/dj/Shell";
import { bases, baseDetail } from "@/lib/dj-data";

export const Route = createFileRoute("/case-submit")({
  head: () => ({
    meta: [
      { title: "病例提交通道 | 冻见 · 冷冻消融专区" },
      { name: "description", content: "上传冷冻消融病例视频，提交所属基地与班次信息，参与病例评审与学术展示。" },
      { property: "og:title", content: "病例提交通道" },
      { property: "og:description", content: "提交规范化冷冻消融病例视频，参与评审与学术展示。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CaseSubmit,
});

function CaseSubmit() {
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [base, setBase] = useState(bases[0].hospital);
  const [klass, setKlass] = useState(baseDetail.classes[0].name);
  const [file, setFile] = useState<string | null>(null);

  if (done) {
    return (
      <Screen>
        <div className="-mx-4 -mt-4 mb-4">
          <PageHeader title="提交成功" />
        </div>
        <div className="card-surface mt-10 flex flex-col items-center p-8 text-center">
          <CheckCircle2 className="h-16 w-16 text-success" />
          <p className="mt-4 text-[16px] font-semibold text-foreground">病例提交成功</p>
          <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
            您的病例已进入评审队列，导师团队将在 3 个工作日内完成初审，结果将通过消息通知发送。
          </p>
          <Link
            to="/"
            className="bg-brand mt-6 w-full rounded-xl py-3 text-sm font-medium text-primary-foreground"
          >
            返回冻见首页
          </Link>
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <div className="-mx-4 -mt-4 mb-4">
        <PageHeader title="病例提交通道" />
      </div>

      <div className="card-surface space-y-4 p-4">
        <label className="block">
          <span className="mb-1.5 block text-[12px] text-muted-foreground">提交人姓名</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="请输入姓名"
            className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-[13px] outline-none focus:border-primary"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12px] text-muted-foreground">所属基地</span>
          <select
            value={base}
            onChange={(e) => setBase(e.target.value)}
            className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-[13px] outline-none focus:border-primary"
          >
            {bases.map((b) => (
              <option key={b.id}>{b.hospital}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[12px] text-muted-foreground">所属班次</span>
          <select
            value={klass}
            onChange={(e) => setKlass(e.target.value)}
            className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-[13px] outline-none focus:border-primary"
          >
            {baseDetail.classes.map((c) => (
              <option key={c.name}>{c.name}</option>
            ))}
          </select>
        </label>

        <div>
          <span className="mb-1.5 block text-[12px] text-muted-foreground">上传病例视频</span>
          <label className="flex cursor-pointer flex-col items-center rounded-xl border border-dashed border-primary/40 bg-primary-soft/40 px-4 py-7 text-center">
            <Upload className="h-6 w-6 text-primary" />
            <span className="mt-2 text-[13px] font-medium text-primary">
              {file ?? "点击上传病例视频"}
            </span>
            <span className="mt-1 text-[11px] text-muted-foreground">
              支持 MP4 / MOV，单个文件不超过 2GB，请隐去患者身份信息
            </span>
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0]?.name ?? null)}
            />
          </label>
        </div>
      </div>

      <button
        onClick={() => setDone(true)}
        className="bg-brand mt-6 w-full rounded-xl py-3 text-sm font-medium text-primary-foreground"
      >
        提交病例
      </button>
    </Screen>
  );
}
