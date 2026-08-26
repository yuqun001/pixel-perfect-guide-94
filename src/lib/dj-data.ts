// Mock data for 冻见 · 冷冻消融专区 prototype (front-end only demo data)

export type CourseType = "必修" | "选修" | "推荐";

export interface Course {
  id: string;
  title: string;
  teacher: string;
  hospital: string;
  type: CourseType;
  rating: number;
  learners: string;
  lessons: number;
  progress: number;
  intro: string;
  stage: StageKey;
  chapters: { title: string; duration: string }[];
}

export type StageKey = "base" | "battle" | "master";

export interface Stage {
  key: StageKey;
  name: string;
  subtitle: string;
  status: "done" | "current" | "locked";
  progress: number;
  courseCount: number;
}

export const stages: Stage[] = [
  {
    key: "base",
    name: "砺刃基础营",
    subtitle: "冷冻消融原理与设备操作规范",
    status: "done",
    progress: 100,
    courseCount: 6,
  },
  {
    key: "battle",
    name: "破局实战营",
    subtitle: "复杂靶区策略与并发症处理",
    status: "current",
    progress: 45,
    courseCount: 8,
  },
  {
    key: "master",
    name: "登峰大师营",
    subtitle: "联合治疗与临床研究设计",
    status: "locked",
    progress: 0,
    courseCount: 5,
  },
];

export const courses: Course[] = [
  {
    id: "c1",
    title: "冷冻消融基础原理与冰球形成机制",
    teacher: "李建国",
    hospital: "复旦大学附属中山医院",
    type: "必修",
    rating: 4.9,
    learners: "3,240",
    lessons: 6,
    progress: 100,
    stage: "base",
    intro:
      "系统讲解氩氦刀低温消融的物理机制、冰球生长规律与组织坏死边界判断，帮助初学者建立规范的冷冻消融认知框架。",
    chapters: [
      { title: "第1节 低温消融的生物学效应", duration: "12:30" },
      { title: "第2节 冰球形成与温度梯度", duration: "15:08" },
      { title: "第3节 设备构成与探针选择", duration: "18:44" },
      { title: "第4节 消融边界与安全距离", duration: "14:20" },
      { title: "第5节 影像引导基础", duration: "16:52" },
      { title: "第6节 术后随访要点", duration: "11:05" },
    ],
  },
  {
    id: "c2",
    title: "肺部磨玻璃结节（GGO）冷冻消融路径规划",
    teacher: "张伟",
    hospital: "中国人民解放军总医院",
    type: "必修",
    rating: 4.8,
    learners: "2,876",
    lessons: 8,
    progress: 45,
    stage: "battle",
    intro:
      "结合 CT 引导下穿刺路径设计，讲解 GGO 病灶的术前评估、探针布局、进针角度控制及气胸、出血等并发症的预防与处置。",
    chapters: [
      { title: "第1节 GGO 病灶影像学分型", duration: "13:41" },
      { title: "第2节 术前评估与适应证把握", duration: "17:20" },
      { title: "第3节 穿刺路径规划实操", duration: "21:14" },
      { title: "第4节 多探针布局策略", duration: "19:02" },
      { title: "第5节 术中气胸的识别与处理", duration: "15:33" },
      { title: "第6节 咯血与出血管理", duration: "12:48" },
      { title: "第7节 疗效评估标准", duration: "14:16" },
      { title: "第8节 典型病例复盘", duration: "22:07" },
    ],
  },
  {
    id: "c3",
    title: "肝脏邻近大血管病灶的热沉效应对策",
    teacher: "王丽华",
    hospital: "浙江大学医学院附属第一医院",
    type: "选修",
    rating: 4.7,
    learners: "1,932",
    lessons: 5,
    progress: 0,
    stage: "battle",
    intro:
      "针对邻近门静脉、肝静脉病灶的冷冻消融，讲解热沉效应的应对方案、辅助措施与消融参数调整策略。",
    chapters: [
      { title: "第1节 热沉效应机制", duration: "11:22" },
      { title: "第2节 探针数量与冻融循环设计", duration: "16:40" },
      { title: "第3节 辅助隔离技术", duration: "13:55" },
      { title: "第4节 术中影像监测", duration: "12:10" },
      { title: "第5节 疗效与复发分析", duration: "15:30" },
    ],
  },
  {
    id: "c4",
    title: "肾癌保肾冷冻消融的适应证与随访",
    teacher: "陈志强",
    hospital: "北京大学第一医院",
    type: "推荐",
    rating: 4.8,
    learners: "1,508",
    lessons: 5,
    progress: 0,
    stage: "master",
    intro:
      "面向 T1a 期肾肿瘤的冷冻消融治疗，覆盖患者筛选、集合系统保护、术后肾功能评估与长期随访方案。",
    chapters: [
      { title: "第1节 T1a 期肾癌治疗选择", duration: "14:02" },
      { title: "第2节 集合系统与输尿管保护", duration: "18:11" },
      { title: "第3节 水分离技术", duration: "13:26" },
      { title: "第4节 术后并发症管理", duration: "12:39" },
      { title: "第5节 五年随访数据解读", duration: "20:45" },
    ],
  },
  {
    id: "c5",
    title: "冷冻消融联合免疫治疗的临床研究设计",
    teacher: "刘晓东",
    hospital: "中山大学肿瘤防治中心",
    type: "选修",
    rating: 4.9,
    learners: "986",
    lessons: 4,
    progress: 0,
    stage: "master",
    intro:
      "解析冷冻消融的原位免疫激活机制，并示范联合治疗临床研究的方案设计、终点选择与数据管理。",
    chapters: [
      { title: "第1节 冷冻免疫效应", duration: "16:18" },
      { title: "第2节 联合方案设计", duration: "19:30" },
      { title: "第3节 研究终点与统计", duration: "17:44" },
      { title: "第4节 伦理与数据合规", duration: "12:52" },
    ],
  },
  {
    id: "c6",
    title: "设备操作规范与术前准备清单",
    teacher: "赵敏",
    hospital: "华中科技大学同济医学院附属协和医院",
    type: "必修",
    rating: 4.6,
    learners: "2,410",
    lessons: 4,
    progress: 100,
    stage: "base",
    intro: "标准化演示氩氦冷冻消融设备的连接、自检、参数设置与术前物品准备流程。",
    chapters: [
      { title: "第1节 设备自检流程", duration: "10:12" },
      { title: "第2节 探针连接与测试", duration: "12:35" },
      { title: "第3节 参数设置规范", duration: "14:08" },
      { title: "第4节 术前核查清单", duration: "09:44" },
    ],
  },
];

export const quizQuestions = [
  {
    q: "冷冻消融形成的冰球边缘，通常认为可靠致死温度区域位于：",
    options: ["冰球边缘外 5mm", "冰球边缘内 3-5mm", "冰球边缘处", "冰球中心 1cm 内"],
    answer: 1,
  },
  {
    q: "标准冷冻消融治疗通常采用的循环模式为：",
    options: ["单次冻结即可", "冻—融—冻双循环", "连续冻结 30 分钟", "融—冻—融循环"],
    answer: 1,
  },
  {
    q: "肺部冷冻消融最常见的术中并发症是：",
    options: ["气胸", "肺栓塞", "支气管胸膜瘘", "心律失常"],
    answer: 0,
  },
  {
    q: "邻近大血管病灶消融效果受限，主要原因是：",
    options: ["血管壁反射", "热沉效应", "探针角度受限", "麻醉深度不足"],
    answer: 1,
  },
  {
    q: "肾脏冷冻消融中用于保护集合系统的常用技术是：",
    options: ["球囊阻断", "水分离技术", "血管栓塞", "低温灌注"],
    answer: 1,
  },
];

export const quizLevels = [
  {
    range: "0-40 分",
    min: 0,
    max: 40,
    level: "入门段位 · 初识冷冻",
    pack: "砺刃基础营 · 全科目课程包",
    desc: "建议从冷冻消融基础原理与设备操作规范开始，打牢理论基础。",
  },
  {
    range: "41-65 分",
    min: 41,
    max: 65,
    level: "进阶段位 · 规范操作",
    pack: "砺刃基础营 · 强化包 + 实战预备课",
    desc: "已掌握基本概念，建议补齐影像引导与路径规划相关内容。",
  },
  {
    range: "66-85 分",
    min: 66,
    max: 85,
    level: "熟练段位 · 独立开台",
    pack: "破局实战营 · 复杂病例课程包",
    desc: "具备独立操作能力，建议进入复杂靶区与并发症处理专题学习。",
  },
  {
    range: "86-100 分",
    min: 86,
    max: 100,
    level: "精通段位 · 带教水平",
    pack: "登峰大师营 · 联合治疗与研究设计",
    desc: "理论体系完善，建议进阶学术研究设计与区域带教能力培养。",
  },
];

export const medals = {
  stage: [
    { name: "砺刃新星", rule: "完成砺刃基础营全部必修课", earned: true, icon: "★" },
    { name: "破局勇士", rule: "完成破局实战营并通过测验", earned: false, icon: "⚔" },
    { name: "登峰学者", rule: "完成登峰大师营全部课程", earned: false, icon: "▲" },
    { name: "三阶圆满", rule: "三阶段学习路径全部完成", earned: false, icon: "◎" },
  ],
  special: [
    { name: "冷冻术者", rule: "累计上传 3 例规范病例视频", earned: true, icon: "❄" },
    { name: "求知先锋", rule: "累计学习 20 小时", earned: true, icon: "✦" },
    { name: "病例达人", rule: "学习圈内发布 10 篇病例精讲", earned: false, icon: "▤" },
    { name: "学术之星", rule: "参与 1 项多中心研究并结题", earned: false, icon: "✧" },
  ],
};

export interface Base {
  id: string;
  hospital: string;
  intro: string;
  trained: number;
  next: string;
  region: string;
  specialty: string;
}

export const bases: Base[] = [
  {
    id: "b1",
    hospital: "复旦大学附属中山医院 · 介入治疗中心",
    intro: "国内最早开展冷冻消融临床应用的中心之一，以肝脏与肺部病灶治疗见长。",
    trained: 486,
    next: "上海站 8.20",
    region: "华东",
    specialty: "肺部 / 肝脏",
  },
  {
    id: "b2",
    hospital: "中国人民解放军总医院 · 呼吸介入科",
    intro: "聚焦肺部磨玻璃结节精准消融，形成标准化路径规划带教体系。",
    trained: 372,
    next: "北京站 9.05",
    region: "华北",
    specialty: "肺部",
  },
  {
    id: "b3",
    hospital: "中山大学肿瘤防治中心 · 微创介入科",
    intro: "在冷冻消融联合免疫治疗领域拥有丰富的临床研究与转化经验。",
    trained: 298,
    next: "广州站 9.18",
    region: "华南",
    specialty: "联合治疗",
  },
  {
    id: "b4",
    hospital: "四川大学华西医院 · 肿瘤微创中心",
    intro: "覆盖西南地区的区域培训中心，年开台量与带教场次居region前列。",
    trained: 254,
    next: "成都站 10.12",
    region: "西南",
    specialty: "肾癌 / 骨转移",
  },
];

export const baseDetail = {
  features: [
    "术前影像评估与三维路径规划实操",
    "多探针冰球叠加布局训练",
    "并发症模拟处置与团队协作演练",
    "术后疗效评估与随访体系搭建",
  ],
  mentors: [
    { name: "李建国", title: "主任医师 · 介入治疗中心主任", tags: ["肝脏消融", "影像引导"] },
    { name: "王丽华", title: "副主任医师 · 带教组长", tags: ["肺部结节", "并发症处理"] },
    { name: "周үн磊", title: "主治医师 · 实训导师", tags: ["设备操作", "路径规划"] },
  ],
  replays: [
    { title: "肝右叶邻近膈顶病灶冷冻消融实录", duration: "42:15", views: "1.2k" },
    { title: "双探针联合处理肺门旁病灶", duration: "36:08", views: "986" },
    { title: "T1a 期肾癌保肾消融全程演示", duration: "51:30", views: "1.5k" },
  ],
  classes: [
    {
      name: "第 18 期 冷冻消融规范化实训班",
      address: "上海市徐汇区枫林路 180 号",
      time: "2026-08-20 至 08-22",
      seats: 6,
    },
    {
      name: "第 19 期 复杂病例进阶研修班",
      address: "上海市徐汇区枫林路 180 号",
      time: "2026-09-24 至 09-26",
      seats: 12,
    },
  ],
};

export const circles = [
  {
    id: "lung",
    name: "肺部冷冻圈",
    owner: "301医院 · 张伟主任医师",
    members: 2860,
    weekly: 128,
    emoji: "肺",
  },
  {
    id: "liver",
    name: "肝脏冷冻圈",
    owner: "中山医院 · 李建国主任医师",
    members: 2145,
    weekly: 96,
    emoji: "肝",
  },
  {
    id: "kidney",
    name: "肾癌冷冻圈",
    owner: "北大医院 · 陈志强主任医师",
    members: 1372,
    weekly: 64,
    emoji: "肾",
  },
];

export const circleContent = {
  cases: [
    { title: "GGO 消融：8mm 纯磨玻璃结节单探针方案复盘", author: "张伟", hot: "2.3k" },
    { title: "肺门旁病灶联合治疗：冷冻+放疗序贯策略", author: "王丽华", hot: "1.8k" },
    { title: "膈顶下病灶人工气胸辅助穿刺经验", author: "赵敏", hot: "1.1k" },
  ],
  topics: [
    { tag: "#并发症处理", title: "术中出现中量气胸，何时需要置管引流？", replies: 42 },
    { tag: "#参数设置", title: "冻融循环时间如何依据病灶大小调整？", replies: 35 },
    { tag: "#随访标准", title: "术后 1 个月 CT 出现环形磨玻璃影是否正常？", replies: 58 },
  ],
  resources: [
    { title: "《冷冻消融规范化操作手册》2026 版", meta: "PDF · 8.6MB" },
    { title: "术前评估表 / 知情同意书模板", meta: "文档包 · 5 份" },
    { title: "线下实训匹配：上海站 8.20 剩余 6 席", meta: "线下培训" },
  ],
  sevenSteps: [
    "通用基础",
    "专项核心",
    "前沿拓展",
    "线下转化",
    "案例精修",
    "能力评估",
    "持续更新",
  ],
};

export const hotCases = [
  { title: "8mm 纯磨玻璃结节冷冻消融全程解析", hot: "2.3k" },
  { title: "肝右叶邻近膈顶病灶的路径突破", hot: "1.9k" },
  { title: "T1a 肾癌水分离保肾消融实录", hot: "1.4k" },
];
