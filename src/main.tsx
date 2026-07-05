import React from "react";
import ReactDOM from "react-dom/client";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion";
import persistedState from "./persistedState.json";
import "./index.css";

const ease = [0.16, 1, 0.3, 1] as const;
const experienceLoopCount = 2;

type UploadSlot = {
  id: string;
  title: string;
  hint: string;
};

type UploadedMedia = {
  url: string;
  type: string;
  name: string;
  persistent?: boolean;
};

type ExpertiseItem = {
  number: string;
  title: string;
  subtitle?: string;
  description: string;
  role?: string;
  result?: string;
  projectUrl?: string;
  upload?: UploadSlot;
};

type ExperienceItem = {
  period: string;
  org: string;
  role?: string;
  description?: string;
  bullets: string[];
};

type Language = "CN" | "EN";

type LightboxImage = {
  src: string;
  alt: string;
};

const persistedProfileState = persistedState as {
  mediaBySlot?: Record<string, UploadedMedia[]>;
};

function assetUrl(path: string) {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) {
    return path;
  }

  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

const hiddenExpertiseIds = new Set(["sgad", "baidu-paramount", "ad-community", "production-map", "vibe-market", "mooncake"]);

const expertiseItems: ExpertiseItem[] = [
  {
    number: "01",
    title: "建立行业影响力",
    subtitle: "群玉山咨询｜从 0 到 1 搭建公关与内容体系",
    description:
      "为新成立的咨询公司制定品牌公关策略，围绕创始人 IP、行业内容、媒体矩阵和用户社群建立完整传播体系，一年内实现账号从 0 到 10 万+粉丝，并逐步形成行业头部认知。",
    role: "公关策略、创始人 IP、内容体系、媒体关系、社群运营",
    upload: {
      id: "qunyushan",
      title: "群玉山咨询项目素材",
      hint: "预留图片及视频：公关活动、内容截图、社群活动、媒体展示",
    },
  },
  {
    number: "01",
    title: "拓展跨行业品牌影响力",
    subtitle: "SGAD 胜加广告",
    description:
      "围绕新消费、科技与商业领域拓展媒体关系，通过内容合作、行业协会和新媒体栏目，为创意公司建立更丰富的行业触点，提升品牌跨行业曝光与专业权威性。",
    role: "品牌公关、媒体矩阵、行业合作、内容策划",
    upload: {
      id: "sgad",
      title: "SGAD 媒体展示区",
      hint: "预留图片及视频：媒体报道、内容合作案例、栏目截图、行业活动照片",
    },
  },
  {
    number: "02",
    title: "打造新产品推动商业转化",
    subtitle: "把行业关系转化为产品和长期连接",
    description:
      "基于广告行业人群的真实需求，将内容、人脉与活动资源重新组织为可持续运营的行业交流产品「同门会」；把「同门会」的 workshop 形式和资源复用到百度、腾讯等平台，为平台建立更紧密的用户关系和商业合作场景。",
    role: "产品概念、用户需求、内容策划、活动运营、商业合作",
    upload: {
      id: "tongmenhui",
      title: "广告门同门会素材",
      hint: "预留图片及视频：活动现场、产品页面、社群截图、合作资料",
    },
  },
  {
    number: "02",
    title: "把企业议题转化为行业内容产品",
    subtitle: "百度 × 百乐门",
    description:
      "围绕企业希望传递的行业议题，设计更具参与感和传播力的内容及活动形式，让品牌信息不再停留于单向输出，而成为行业人群愿意参与的讨论。",
    role: "创意概念、内容策划、嘉宾与资源协调、传播文案",
    upload: {
      id: "baidu-paramount",
      title: "百度 × 百乐门素材",
      hint: "预留图片及视频：活动照片、传播物料、内容页面",
    },
  },
  {
    number: "02",
    title: "国际内容的本地化转译",
    subtitle: "戛纳创意节与世界零售大会",
    description:
      "从大量国际会议内容中提取对中国营销人与商业从业者真正有价值的信息，将复杂趋势转化为结构清晰、可阅读、可传播的专题内容。",
    role: "内容研究、选题策划、趋势提炼、专题编辑",
    upload: {
      id: "cannes-retail",
      title: "国际内容专题素材",
      hint: "预留图片及视频：专题截图、会议内容、传播页面",
    },
  },
  {
    number: "03",
    title: "帮助初创企业打开新市场",
    subtitle: "打造平台、企业、主播与地方产业的共赢项目",
    description:
      "整合直播平台、当地企业、主播和政府资源，将地方海鲜产业转化为具有传播话题和商业转化能力的直播活动，在为企业积累案例的同时，也为本地产业带来新的曝光与销售场景。",
    role: "市场拓展、商业模式设计、活动策划、资源整合",
    upload: {
      id: "seafood-live",
      title: "海鲜直播节素材",
      hint: "预留图片及视频：直播现场、活动海报、合作案例",
    },
  },
  {
    number: "04",
    title: "拉近品牌与用户的距离",
    subtitle: "Soul 首次线下艺术展｜把线上社交体验带入真实空间",
    description:
      "围绕 Soul 的用户关系与情绪表达，策划并落地品牌首次线下艺术展，将线上社区中的情感连接转化为可进入、可观看、可互动的空间体验，吸引 10,000+ 用户参与。",
    role: "品牌体验策划、展览内容、用户动线、现场执行",
    result: "10,000+线下参与者",
    upload: {
      id: "soul-art",
      title: "Soul 艺术展素材",
      hint: "预留图片及视频：展览空间、用户互动、现场照片",
    },
  },
  {
    number: "05",
    title: "强化媒体影响力与用户黏性",
    subtitle: "把企业周年庆转化成行业共同记忆",
    description:
      "围绕品牌十周年节点，将企业历史、行业关系与未来愿景转化为一场有叙事、有情绪、有参与感的行业聚会，并带来 100+ 新客户转化。",
    role: "主题策划、内容设计、传播文案、现场统筹",
    upload: {
      id: "adquan-party",
      title: "广告门十周年 Party 素材",
      hint: "预留图片及视频：现场照片、主题视觉、传播内容",
    },
  },
  {
    number: "05",
    title: "建立内容之外的长期用户关系",
    subtitle: "广告圈社群",
    description:
      "通过线上内容、线下活动和日常社群运营，将分散的广告行业从业者连接起来，让媒体平台从信息发布者逐步成为行业关系的组织者。",
    role: "社群定位、内容栏目、活动运营、用户维护",
    upload: {
      id: "ad-community",
      title: "广告圈社群素材",
      hint: "预留图片及视频：社群截图、活动照片、内容栏目",
    },
  },
  {
    number: "05",
    title: "将深度专业内容产品化",
    subtitle: "知乎 Live",
    description:
      "将广告营销行业的专业经验转化为结构化、可学习的线上内容，通过选题、嘉宾和内容包装，拓展平台在微信公众号之外的专业影响力。",
    role: "选题策划、嘉宾沟通、内容包装、平台运营",
    upload: {
      id: "zhihu-live",
      title: "知乎 Live 素材",
      hint: "预留图片及视频：Live 页面、嘉宾资料、内容截图",
    },
  },
  {
    number: "05",
    title: "跨界圈层传播及营销",
    subtitle: "广告门 × 丁香医生年度合作",
    description:
      "以广告从业者的健康焦虑为切入点，将严肃的职业健康议题转化为具有游戏感与参与感的沉浸式体验，让品牌议题真正进入从业者的日常生活；后续与平台达成年度深度合作。",
    role: "活动概念、体验设计、品牌合作、传播策划",
    upload: {
      id: "dingxiang",
      title: "逃离广告狂人院素材",
      hint: "预留图片及视频：活动现场、装置体验、传播页面",
    },
  },
  {
    number: "06",
    title: "企业社会责任",
    subtitle: "通过企业自媒体传播内容，为受众带来精神力量",
    description:
      "收集并呈现特殊时期发生在邻居之间的真实故事，将个体之间微小但具体的善意，转化为具有公共价值和情感温度的品牌内容。",
    role: "故事挖掘、采访策划、内容编辑、传播表达",
    projectUrl: "https://weixin.qq.com/sph/AVnWcJqjWn",
    upload: {
      id: "spring-doorplate",
      title: "春天的门牌号素材",
      hint: "预留图片及视频：故事截图、采访素材、传播内容",
    },
  },
  {
    number: "07",
    title: "建立有节奏、有辨识度的内容体系",
    subtitle: "让企业的观点成为长期品牌资产",
    description:
      "通过系列化内容栏目，将人物经验、商业判断和行业观察沉淀为稳定的品牌表达，逐步建立创始人与企业的专业辨识度。",
    role: "策略、创意、内容与落地统筹",
    upload: {
      id: "mountains-talk",
      title: "Mountains' Talk 素材",
      hint: "预留图片及视频：栏目截图、访谈内容、传播页面",
    },
  },
  {
    number: "07",
    title: "用内容建立行业认知地图",
    subtitle: "制作公司江湖",
    description:
      "围绕制作行业中的公司、人物和合作关系，策划具有连续性和行业感的内容系列，让复杂的行业生态变得更容易理解和传播。",
    upload: {
      id: "production-map",
      title: "制作公司江湖素材",
      hint: "预留图片及视频：专题截图、行业关系内容、传播页面",
    },
  },
  {
    number: "07",
    title: "让常规选题拥有观点与传播节奏",
    subtitle: "月饼盘点",
    description:
      "通过鲜明视角、信息组织和具有记忆点的表达，将常见的节日盘点内容转化为具有行业讨论度的传播选题。",
    upload: {
      id: "mooncake",
      title: "月饼盘点素材",
      hint: "预留图片及视频：内容截图、传播数据、专题页面",
    },
  },
  {
    number: "08",
    title: "探索 AI 与内容、产品的协作方式",
    subtitle: "把分散经验变成可以持续调用的资产",
    description:
      "将项目资料、研究信息和个人经验整理为结构化知识库，提高信息检索、内容策划和项目复盘效率；半年自学 AI，并 Vibe coding 了旅行产品网页。",
    role: "信息架构、知识整理、提示词设计、工作流测试",
    projectUrl: "https://yeastlu.github.io/Xiaolongbao/",
    upload: {
      id: "ai-knowledge",
      title: "AI 知识库素材",
      hint: "预留图片及视频：知识库截图、工作流、提示词结构",
    },
  },
  {
    number: "08",
    title: "从一个想法到可交互产品",
    subtitle: "Vibe Coding 菜市场旅行网站",
    description:
      "以外籍游客的上海本地菜市场体验为场景，使用 Vibe Coding 工具完成网站结构、内容、交互和页面搭建，将旅行产品想法快速转化为可以展示和测试的数字原型。",
    role: "产品概念、用户路径、内容架构、Vibe Coding、原型测试",
    upload: {
      id: "vibe-market",
      title: "Vibe Coding 菜市场旅行网站素材",
      hint: "预留图片及视频：网站页面、交互录屏、产品原型",
    },
  },
];

const visibleExpertiseItems = expertiseItems.filter((item) => !hiddenExpertiseIds.has(item.upload?.id ?? ""));

const expertiseEnglishBySlot: Record<string, Partial<ExpertiseItem>> = {
  "qunyushan": {
    title: "Building Industry Influence",
    subtitle: "Qunyu Mountain Consulting | Building PR and content from 0 to 1",
    description:
      "Built the brand PR strategy for a newly founded consulting company, shaping founder IP, industry content, media networks and user communities into a complete communication system. Within one year, the account grew from zero to 100K+ followers and established strong category recognition.",
    role: "PR strategy, founder IP, content system, media relations, community operations",
  },
  "tongmenhui": {
    title: "Turning Relationships into Products",
    subtitle: "Transforming industry connections into long-term business value",
    description:
      "Based on the real needs of advertising professionals, reorganized content, network and event resources into Tongmenhui, a sustainable industry exchange product. Its workshop format and resources were later adapted for platforms including Baidu and Tencent.",
    role: "Product concept, user needs, content planning, event operations, business partnerships",
  },
  "cannes-retail": {
    title: "Localizing Global Content",
    subtitle: "Cannes Lions and World Retail Congress",
    description:
      "Extracted insights from large volumes of international conference content and translated complex global trends into clear, readable and shareable editorial packages for Chinese marketing and business audiences.",
    role: "Content research, topic planning, trend synthesis, editorial production",
  },
  "seafood-live": {
    title: "Opening New Markets for Startups",
    subtitle: "A win-win project connecting platforms, brands, hosts and local industry",
    description:
      "Integrated live-streaming platforms, local businesses, hosts and government resources to turn a local seafood industry into a campaign with cultural attention and commercial conversion potential.",
    role: "Market expansion, business model design, event planning, resource integration",
  },
  "soul-art": {
    title: "Bringing Brands Closer to Users",
    subtitle: "Soul's first offline art exhibition",
    description:
      "Designed and delivered Soul's first offline art exhibition, translating online social relationships and emotional expression into an immersive physical experience that attracted 10,000+ visitors.",
    role: "Brand experience planning, exhibition content, user journey, on-site execution",
  },
  "adquan-party": {
    title: "Strengthening Media Influence",
    subtitle: "Turning an anniversary into a shared industry memory",
    description:
      "For the brand's 10th anniversary, transformed company history, industry relationships and future vision into a narrative-driven gathering with emotion, participation and 100+ new customer conversions.",
    role: "Theme planning, content design, communication copy, event coordination",
  },
  "zhihu-live": {
    title: "Productizing Deep Expertise",
    subtitle: "Zhihu Live",
    description:
      "Turned advertising and marketing expertise into structured online learning content, expanding the platform's professional influence beyond WeChat through topic selection, guest coordination and content packaging.",
    role: "Topic planning, guest communication, content packaging, platform operations",
  },
  "dingxiang": {
    title: "Cross-community Campaigns",
    subtitle: "Adquan x DXY annual collaboration",
    description:
      "Used health anxiety among advertising professionals as the entry point, transforming a serious workplace health topic into an immersive, game-like experience that brought the brand issue into daily life.",
    role: "Event concept, experience design, brand partnership, communication planning",
  },
  "spring-doorplate": {
    title: "Corporate Social Responsibility",
    subtitle: "Using brand media to create emotional resonance",
    description:
      "Collected and presented true neighborhood stories from a special period, turning small but concrete acts of kindness into brand content with public value and emotional warmth.",
    role: "Story mining, interview planning, content editing, communication expression",
  },
  "mountains-talk": {
    title: "Building a Distinct Content System",
    subtitle: "Turning company viewpoints into long-term brand assets",
    description:
      "Developed a serialized content column that turned personal experience, business judgment and industry observation into a stable brand voice, strengthening the professional identity of the founder and company.",
    role: "Strategy, creative direction, content planning, execution coordination",
  },
  "ai-knowledge": {
    title: "Exploring AI Collaboration",
    subtitle: "Turning scattered experience into reusable assets",
    description:
      "Organized project materials, research information and personal experience into structured knowledge systems to improve retrieval, planning and review. Self-studied AI for six months and vibe-coded a travel product website.",
    role: "Information architecture, knowledge organization, prompt design, workflow testing",
  },
};

function getLocalizedExpertiseItem(item: ExpertiseItem, language: Language) {
  if (language === "CN") return item;
  const slotId = item.upload?.id ?? "";
  return { ...item, ...expertiseEnglishBySlot[slotId] };
}

const experienceItemsEn: ExperienceItem[] = [
  {
    period: "2025.03–2025.12",
    org: "Freelance",
    description:
      "Provided brand narrative, content operations, user stories, event integration and KOL activation for travel, culture, rural tourism and consumer brands.",
    bullets: [],
  },
  {
    period: "2024.10–2024.12",
    org: "SDG Changemaker",
    role: "Assistant Researcher | Remote",
    bullets: [
      "Completed two long-form research papers on sustainable materials, community applications and circular economy models.",
    ],
  },
  {
    period: "2022.01–2023.04",
    org: "Qunyu Mountain Consulting",
    role: "PR Director | Shanghai",
    bullets: [
      "Built brand PR and content strategy from 0 to 1, growing the account from zero to 100K+ followers within one year.",
    ],
  },
  {
    period: "2021.01–2022.01",
    org: "SGAD",
    role: "PR Director | Shanghai",
    bullets: [
      "Expanded media networks across consumer, technology and business sectors through content partnerships.",
    ],
  },
  {
    period: "2020.07–2020.10",
    org: "Soul",
    role: "Brand Planning Manager | Shanghai",
    bullets: [
      "Planned and delivered the brand's first offline art exhibition, turning online social emotion into a physical experience.",
    ],
  },
  {
    period: "2017.10–2020.07",
    org: "Adquan",
    role: "Senior Planning Manager | Shanghai",
    bullets: [
      "Planned and coordinated 5+ major industry events, including themes, content structure, guest communication and copywriting.",
    ],
  },
  {
    period: "2015.02–2017.09",
    org: "Video++",
    role: "Business Manager, Live-streaming Division | Shanghai",
    bullets: [
      "Developed live-streaming marketing content and industry cases to build market awareness for the business.",
    ],
  },
];

const experienceItems: ExperienceItem[] = [
  {
    period: "2025.03–2025.12",
    org: "自由职业者",
    description:
      "为旅行、文化、农文旅与消费品牌提供品牌叙事、内容运营、用户故事、活动整合及 KOL 投放服务。",
    bullets: [
      "平行光旅行平台｜内容运营与品牌叙事：从 0 到 1 梳理旅行平台的品牌表达，策划并创作适配公众号、小红书和视频号的系列内容，一个月内帮助平台获得 2,000+早期用户。",
      "西藏非遗调研｜品牌营销创意研究：深入调研邦典梭织技艺及其文化背景，将传统非遗的材料、工艺和生活含义转化为现代品牌能够理解和使用的故事语言，产出可用于护肤品牌叙事与传播的营销内容。",
      "农文旅整合项目｜用户故事挖掘与活动运营：策划“果树认领”活动，通过采访政府工作人员、村委和农户，建立可持续使用的本地故事素材库；统筹活动落地，实现 200+参与及 10万+传播曝光。",
      "联合利华和路雪｜小红书 KOL 投放与内容策划：围绕品牌产品及社交媒体传播目标，规划四类 KOL 的内容方向、发布节奏与合作数量，统筹 100+ KOL 投放，为品牌相关话题创造 1000万+曝光。",
    ],
  },
  {
    period: "2024.10–2024.12",
    org: "SDG Changemaker",
    role: "助理研究员｜远程",
    bullets: [
      "围绕可持续材料的多场景应用与社区循环经济完成两篇万字研究论文。",
      "为跨国可持续商业组织撰写文献综述，为可持续材料的社区应用及商业化项目提供研究支持。",
    ],
  },
  {
    period: "2022.01–2023.04",
    org: "群玉山咨询",
    role: "公关总监｜上海",
    bullets: [
      "为新成立的咨询公司制定从 0 到 1 的品牌公关与内容策略，一年内实现账号粉丝从 0 增长至 10万+。",
      "建立覆盖 20+行业核心自媒体及 10+官方媒体的传播矩阵，持续扩大品牌在营销咨询行业的影响力。",
      "从深度内容、人格表达和行业观点三个维度打造创始人 IP。",
      "搭建 B 端与 C 端内容及社群体系，社群活动参与率达到 90%以上，帮助企业建立行业头部认知。",
    ],
  },
  {
    period: "2021.01–2022.01",
    org: "SGAD 胜加广告",
    role: "公关总监｜上海",
    bullets: [
      "拓展新消费、科技及商业领域媒体矩阵，通过内容合作帮助企业触达不同行业的潜在客户。",
      "加强与行业协会和专业机构的合作，推出新媒体内容系列，提升品牌的跨行业曝光与专业权威性。",
    ],
  },
  {
    period: "2020.07–2020.10",
    org: "Soul",
    role: "品牌策划经理｜上海",
    bullets: [
      "策划并落地品牌首次线下艺术展，将线上社交关系与用户情绪转化为空间体验，吸引 10,000+用户参与。",
      "负责展览内容、用户体验、传播物料及现场执行统筹。",
    ],
  },
  {
    period: "2017.10–2020.07",
    org: "广告门",
    role: "高级策划经理｜上海",
    bullets: [
      "策划并统筹超过 5 场大型行业活动，负责活动主题、内容架构、嘉宾沟通及传播文案。",
      "拓展并维护 100+品牌与行业客户，两年内推动单一客户合作体量由 0 增长至 100万元。",
      "运营知乎与微信公众号，累计策划并发布数百篇行业内容。",
      "知乎账号粉丝从 1,000 增长至 30,000，微信公众号从 0 增长至 10,000+。",
    ],
  },
  {
    period: "2015.02–2017.09",
    org: "极链科技",
    role: "商务经理，直播事业部｜上海",
    bullets: [
      "策划直播营销内容与行业案例，帮助企业建立直播业务的市场认知。",
      "拓展直播平台及互联网视频平台客户，推动 AI SaaS 产品的市场合作与商业化落地。",
      "整合平台、企业、主播和地方产业资源，参与海鲜直播节等创新直播项目的策划与执行。",
    ],
  },
];

function getExperienceYear(period: string) {
  return period.slice(0, 4);
}

function getExperienceNarrative(item: ExperienceItem) {
  if (item.description) {
    return item.description;
  }

  const [title, detail] = item.bullets[0]?.split("：") ?? [];
  return detail ?? title ?? "";
}

function getExperienceHighlights(item: ExperienceItem) {
  return item.bullets.slice(0, 3).map((bullet) => bullet.split("：")[0]);
}

function WordsPullUp({ text, className = "" }: { text: string; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const words = text.split(" ");

  return (
    <div ref={ref} className={className} aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block pr-[0.06em]"
            initial={{ y: 32 }}
            animate={inView ? { y: 0 } : { y: 32 }}
            transition={{ duration: 0.8, delay: index * 0.08, ease }}
          >
            {word}
            {index < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

function AnimatedLine({
  line,
  index,
  total,
  progress,
}: {
  line: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const lineProgress = index / total;
  const opacity = useTransform(
    progress,
    [Math.max(0, lineProgress - 0.12), Math.min(1, lineProgress + 0.08)],
    [0.18, 1],
  );
  const y = useTransform(
    progress,
    [Math.max(0, lineProgress - 0.12), Math.min(1, lineProgress + 0.08)],
    [10, 0],
  );

  return (
    <motion.span className="story-reveal-line" style={{ opacity, y }}>
      {line}
    </motion.span>
  );
}

function ScrollRevealLines({ lines }: { lines: string[] }) {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.82", "end 0.28"] });

  return (
    <p ref={ref} className="story-serif-light story-reveal-copy mx-auto mt-10 max-w-4xl text-[11px] leading-7 text-[#DEDBC8] sm:text-[13px] sm:leading-8 md:text-[15px] md:leading-9">
      {lines.map((line, index) => (
        <AnimatedLine key={line} line={line} index={index} total={lines.length} progress={scrollYProgress} />
      ))}
    </p>
  );
}

function Hero({ language }: { language: Language }) {
  const isEnglish = language === "EN";
  const navItems = isEnglish
    ? ["Story", "Expertise", "Experience", "Education", "Contact"]
    : ["Story", "Expertise", "Experience", "Education", "Contact"];

  return (
    <section className="relative min-h-screen bg-black p-4 md:p-6">
      <div className="relative min-h-[calc(100vh-2rem)] overflow-hidden rounded-2xl bg-[#101010] md:min-h-[calc(100vh-3rem)] md:rounded-[2rem]">
        <video
          className="hero-cinema-image absolute inset-0 h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.72] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/85" />
        <div className="absolute inset-0 bg-klein/25 mix-blend-multiply" />

        <nav className="absolute left-2 top-0 z-20 hidden rounded-b-3xl bg-black px-8 py-2 md:block">
          <div className="flex items-center gap-10 text-sm text-primary/80 lg:gap-14">
            {navItems.map((item, index) => (
              <a key={item} href={["#story", "#expertise", "#experience", "#education", "#contact"][index]}>
                {item}
              </a>
            ))}
          </div>
        </nav>

        <div className="relative z-10 flex min-h-[calc(100vh-2rem)] flex-col justify-end px-5 pb-8 pt-24 sm:px-8 md:min-h-[calc(100vh-3rem)] md:px-10 md:pb-10">
          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <WordsPullUp
                text={isEnglish ? "Cheng Lu" : "程璐"}
                className={
                  isEnglish
                    ? "hero-name-en text-[#E1E0CC]"
                    : "font-song-bold text-[22vw] leading-[0.92] tracking-[0.045em] text-[#E1E0CC] sm:text-[18vw] md:text-[12.5vw] lg:text-[10.5vw]"
                }
              />
              <p className="story-serif-light mt-4 text-xl tracking-[0.16em] text-primary sm:text-2xl md:text-4xl">
                {isEnglish ? "Insight · Warmth · Action" : "洞察·温度·行动"}
              </p>
              <p className="mt-4 text-sm uppercase tracking-[0.22em] text-primary/60 md:text-base">
                {isEnglish ? "Marketing | Brand PR | Content Strategy | AI Co-creation" : "市场营销｜品牌公关｜内容策略｜AI 共创"}
              </p>
              <div className="font-yahei-light mt-5 max-w-2xl space-y-3 text-[10px] leading-[1.825] text-primary/70 sm:text-xs md:text-[11px] lg:text-xs">
                <p>
                  {isEnglish
                    ? "With 8+ years of experience in marketing, PR and integrated communications, I find the value most worth noticing inside complex information and real user contexts, then translate it into content and experiences with warmth, resonance and real execution."
                    : "拥有 8 年以上市场公关与整合传播经验，擅长从复杂的信息和真实的用户语境中，找到品牌最值得被看见的价值，并转化为有温度、有共鸣、能够被记住并落地的内容与体验。"}
                </p>
                <p className="text-primary/60">
                  {isEnglish
                    ? "My work spans brand narrative, PR strategy, content creation, events and community operations. I also explore AI workflows, knowledge bases, vibe coding and interactive applications, asking how AI can not only improve efficiency but also help non-technical people build a more natural relationship with it."
                    : "横跨品牌叙事、公关策略、内容创作、活动与社群运营。持续探索 AI 工作流、知识库、Vibe Coding 与互动应用，思考如何让 AI 不只提升效率，也能够帮助人（非技术背景）与 AI 建立更自然的连接。"}
                </p>
              </div>
            </div>
            <div className="space-y-5 md:col-span-5 md:pb-6">
              <div className="flex flex-wrap gap-3">
                <a className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-medium text-black transition hover:gap-3" href="#expertise">
                  {isEnglish ? "View Projects" : "查看项目"} <ArrowRight size={18} />
                </a>
                <a className="inline-flex items-center gap-2 rounded-full border border-primary/25 px-4 py-2 font-medium text-primary transition hover:bg-primary hover:text-black" href="#contact">
                  {isEnglish ? "Get in touch" : "即刻联系"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Story({ language }: { language: Language }) {
  const isEnglish = language === "EN";
  const bodyLines = isEnglish
    ? [
        "INFJ is one entrance into understanding me, but not a label that limits me.",
        "Rather than judging quickly, I prefer to enter a real context first.",
        "I try to understand why people choose as they do, how a place takes shape,",
        "and what problem a product is truly solving before deciding how to express it.",
        "I love travel, daily life and fresh things. Exploration is not simply chasing trends.",
        "I believe only when I get close enough to something do I earn the right to like or dislike it.",
        "Whether facing a brand, a technology, a culture or a specific group of users,",
        "I first understand it, then find the right language for it.",
      ]
    : [
        "INFJ 是了解我的一个入口，但不是限制我的标签。",
        "相比快速下判断，我更愿意先进入真实环境，理解人为什么这样选择。",
        "一个地方如何形成，一个产品真正解决了什么问题，",
        "再决定如何表达它。",
        "我热爱旅行、生活和新鲜事物。对我来说，探索不是简单地追逐潮流。",
        "我认为：只有足够靠近一件事，才有资格决定喜欢或讨厌。",
        "无论面对一个品牌、一项技术、一种文化，还是一群具体的用户，",
        "我都会先理解它，再为它找到合适的语言。",
      ];

  return (
    <section id="story" className="bg-black px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl px-6 text-center sm:px-10">
        <p className="mb-8 text-[10px] uppercase tracking-[0.24em] text-primary sm:text-xs">Brand narrative</p>
        <h2 className="font-song-bold mx-auto max-w-4xl text-[1.85rem] leading-[1.08] tracking-[0.03em] text-[#E1E0CC] sm:text-[2.6rem] md:text-[3.3rem] lg:text-[4rem]">
          <span className="block">{isEnglish ? "A cultural translator working" : "一个在感性与理性之间"}</span>
          <span className="block">{isEnglish ? "between feeling and reason." : "工作的文化转译者。"}</span>
        </h2>
        <p className="story-serif-light mx-auto mt-10 max-w-3xl text-sm leading-7 text-primary/72 md:text-base md:leading-8">
          {isEnglish
            ? "I stay sensitive to people, emotions and cultural context, using research, structure and business goals"
            : "我对人、情绪和文化语境保持敏感，用调研、结构和商业目标，"}
          <span className="story-serif-light block">
            {isEnglish ? "to turn ambiguous feelings into strategies that can land." : "把模糊的感受转化为可以落地的策略。"}
          </span>
        </p>
        <ScrollRevealLines lines={bodyLines} />
      </div>
    </section>
  );
}

function ContactButton({ label = "Contact Me" }: { label?: string }) {
  return (
    <a
      href="mailto:lilac9406@gmail.com"
      className="inline-flex rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 outline-offset-[-3px] outline-white transition hover:scale-[1.02] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{
        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
      }}
    >
      {label}
    </a>
  );
}

function getExpertiseCover(item: ExpertiseItem, index: number) {
  const slot = item.upload ?? {
    id: `expertise-${index}`,
    title: `${item.title} 素材`,
    hint: "预留项目图片或视频。",
  };

  return {
    slot,
    media: persistedProfileState.mediaBySlot?.[slot.id]?.[0]
      ? {
          ...persistedProfileState.mediaBySlot[slot.id][0],
          url: assetUrl(persistedProfileState.mediaBySlot[slot.id][0].url),
        }
      : undefined,
  };
}

function ExpertiseSuccessStory({
  item,
  index,
  language,
  onOpenImage,
}: {
  item: ExpertiseItem;
  index: number;
  language: Language;
  onOpenImage: (image: LightboxImage) => void;
}) {
  const { slot, media } = getExpertiseCover(item, index);
  const showVideoButton = item.number === "09" && item.projectUrl;
  const isEnglish = language === "EN";
  const content = (
    <>
      <div className="monolog-success-sequence">{item.number}</div>

      <div className="monolog-success-content">
        <div className="monolog-success-title">
          <h3>{item.title}</h3>
          {item.subtitle ? <p className="monolog-success-subtitle">{item.subtitle}</p> : null}
          <p>{item.description}</p>
        </div>

        <div className="monolog-success-result">
          <strong>ROLE</strong>
          <span>{item.role ?? "策略、创意、内容与落地统筹"}</span>
        </div>

        {item.projectUrl && !showVideoButton ? (
          <a className="monolog-project-button" href={item.projectUrl} target="_blank" rel="noreferrer">
            {isEnglish ? "View Project" : "查看项目"} <ArrowRight size={18} />
          </a>
        ) : null}
      </div>

      <div className="monolog-success-media">
        <div className="monolog-success-cover" aria-label={slot.title}>
          {media ? (
            media.type.startsWith("video") ? (
              <video src={media.url} autoPlay loop muted playsInline preload="none" />
            ) : (
              <button
                type="button"
                className="monolog-image-link"
                aria-label={`查看${slot.title}`}
                onClick={() => onOpenImage({ src: media.url, alt: media.name })}
              >
                <img src={media.url} alt={media.name} loading="lazy" decoding="async" />
              </button>
            )
          ) : (
            <div className="monolog-success-placeholder">
              <span>{item.number}</span>
              <strong>{slot.title}</strong>
            </div>
          )}
          <div className="monolog-success-overlay" />
        </div>
        {showVideoButton ? (
          <a className="monolog-video-button" href={item.projectUrl} target="_blank" rel="noreferrer">
            {isEnglish ? "Watch Video" : "观看视频"} <ArrowRight size={18} />
          </a>
        ) : null}
      </div>
    </>
  );

  return (
    <motion.article
      className="monolog-success-item"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.035, 0.2), ease }}
    >
      <div className="monolog-success-link">{content}</div>
    </motion.article>
  );
}

function Expertise({ language, onOpenImage }: { language: Language; onOpenImage: (image: LightboxImage) => void }) {
  return (
    <section id="expertise" className="monolog-success-section relative z-10">
      <div className="monolog-success-shell">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="monolog-success-header"
        >
          <h2>EXPERTISE</h2>
        </motion.div>

        <div className="monolog-success-contain">
          <div className="monolog-success-list">
            {visibleExpertiseItems.map((item, index) => {
              const displayItem = {
                ...getLocalizedExpertiseItem(item, language),
                number: String(index + 1).padStart(2, "0"),
              };
              return (
                <ExpertiseSuccessStory
                  key={`${item.upload?.id ?? item.title}-${index}`}
                  item={displayItem}
                  index={index}
                  language={language}
                  onOpenImage={onOpenImage}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience({ language }: { language: Language }) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const groupRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [loopWidth, setLoopWidth] = React.useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const trackX = useTransform(scrollYProgress, [0, 1], [0, -loopWidth]);
  const items = language === "EN" ? experienceItemsEn : experienceItems;

  React.useEffect(() => {
    const updateLoopWidth = () => {
      setLoopWidth(groupRef.current?.offsetWidth ?? 0);
    };

    updateLoopWidth();
    window.addEventListener("resize", updateLoopWidth);
    return () => window.removeEventListener("resize", updateLoopWidth);
  }, []);

  const renderExperienceCards = (suffix: string, attachGroupRef = false) => (
    <div ref={attachGroupRef ? groupRef : undefined} className="isadeburgh-year-group">
      {items.map((item, index) => (
        <motion.article
          key={`${item.period}-${item.org}-${suffix}`}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.68, delay: index * 0.04, ease }}
          className="isadeburgh-year-card"
        >
          <h3>{getExperienceYear(item.period)}</h3>
          <h4>{item.org}</h4>
          <p>{getExperienceNarrative(item)}</p>
        </motion.article>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="isadeburgh-year-section relative z-30"
      style={{ height: loopWidth ? `calc(100vh + ${loopWidth}px)` : undefined }}
    >
      <div className="isadeburgh-year-pin">
        <motion.div ref={trackRef} style={{ x: trackX }} className="isadeburgh-year-wrapper">
          {Array.from({ length: experienceLoopCount }, (_, index) => renderExperienceCards(`loop-${index}`, index === 0))}
        </motion.div>
      </div>
    </section>
  );
}

function Education({ language }: { language: Language }) {
  const isEnglish = language === "EN";
  return (
    <section id="education" className="bg-black px-4 py-12 sm:px-6 md:py-16">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-14">
          <h2 className="text-[16vw] font-black uppercase leading-none text-[#E1E0CC] sm:text-[11vw] md:text-[8rem]">
            EDUCATION
          </h2>
          <div className="story-serif-light mt-8 max-w-3xl space-y-2 text-sm leading-7 text-primary/72 md:text-base md:leading-8">
            {isEnglish ? (
              <>
                <p>"At thirty, I wanted to become a student again, so I went." Age never means the deadline for learning.</p>
                <p>Career growth does not have to be a straight upward line. It can also be an intentional turn, a renewed exploration of the unknown.</p>
              </>
            ) : (
              <>
                <p>“三十岁想重新成为学生，于是我就去了。”年龄从来不意味着学习的截止日期。</p>
                <p>职业成长不一定是一条不断向上的直线，它也可以是一次主动转弯、一次重新探索未知。</p>
              </>
            )}
          </div>
        </div>

        <div className="space-y-10">
          <article className="border-b border-dotted border-primary/20 pb-10">
            <p className="mb-3 text-2xl font-black leading-none text-[#E1E0CC] md:text-3xl">01</p>
            <h3 className="font-song-bold text-xl leading-tight text-[#E1E0CC] md:text-2xl">
              {isEnglish ? "Lancaster University" : "兰卡斯特大学"}
            </h3>
            <p className="mt-3 text-sm font-semibold text-primary/80">
              {isEnglish ? "MSc Entrepreneurship and Innovation | UK | 2023.09-2024.11" : "创业与创新硕士｜英国｜2023.09–2024.11"}
            </p>
            <p className="mt-4 max-w-3xl text-xs leading-6 text-primary/62 md:text-sm">
              {isEnglish
                ? "Research focus included entrepreneurial opportunity recognition, business model innovation, sustainable business, user research and new product development."
                : "研究方向包括创业机会识别、商业模式创新、可持续商业、用户研究与新产品开发。"}
            </p>
          </article>
          <article>
            <p className="mb-3 text-2xl font-black leading-none text-[#E1E0CC] md:text-3xl">02</p>
            <h3 className="font-song-bold text-xl leading-tight text-[#E1E0CC] md:text-2xl">
              {isEnglish ? "Nanchang Hangkong University College of Science and Technology" : "南昌航空大学科技学院"}
            </h3>
            <p className="mt-3 text-sm font-semibold text-primary/80">
              {isEnglish ? "BA English | 2010.09-2014.07" : "英语专业学士｜2010.09–2014.07"}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function Contact({ language, onOpenImage }: { language: Language; onOpenImage: (image: LightboxImage) => void }) {
  const isEnglish = language === "EN";
  const contactPortraitUrl = assetUrl("/uploads/profile-media/contact-portrait.jpg");
  const wechatQrUrl = assetUrl("/uploads/profile-media/wechat-qr.jpg");
  const resumeUrl = assetUrl(isEnglish ? "/uploads/profile-media/resume-chenglu-en.pdf" : "/uploads/profile-media/resume-chenglu-cn.pdf");
  const resumeFileName = isEnglish ? "CV_Cheng_Lu_2026.pdf" : "程璐-个人简历.pdf";

  return (
    <section id="contact" className="bg-black px-4 py-12 md:px-6 md:py-16">
      <div className="px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-5 text-[10px] uppercase tracking-[0.24em] text-primary/50">Let’s talk</p>
          <div className="grid grid-cols-[minmax(0,1fr)_136px] items-start gap-5 sm:grid-cols-[minmax(0,1fr)_176px] md:grid-cols-[minmax(0,1fr)_220px] lg:grid-cols-[minmax(0,1fr)_260px]">
            <h2 className="contact-heading max-w-4xl text-[#E1E0CC]">
              <span className="contact-heading-intro">{isEnglish ? "Let's talk," : "让我们聊聊，"}</span>
              <span>{isEnglish ? "how technology is understood," : "技术如何被理解，"}</span>
              <span>{isEnglish ? "how brands are remembered," : "品牌如何被记住，"}</span>
              <span>{isEnglish ? "and how experiences truly happen." : "体验如何真正发生。"}</span>
            </h2>
            <button
              type="button"
              className="block w-full border-0 bg-transparent p-0 text-left"
              aria-label="查看程璐照片"
              onClick={() => onOpenImage({ src: contactPortraitUrl, alt: "程璐照片" })}
            >
              <img
                className="aspect-[4/5] w-full rounded-[1.25rem] object-cover object-[55%_68%] shadow-2xl shadow-black/40 md:mt-1 md:rounded-[1.5rem]"
                src={contactPortraitUrl}
                alt="程璐照片"
                loading="lazy"
                decoding="async"
              />
            </button>
          </div>
          <p className="mt-8 max-w-3xl text-base leading-8 text-primary/65">
            {isEnglish
              ? "Whether it is AI product marketing, brand PR, content strategy, or a new project that needs to be built from 0 to 1, I would be happy to connect."
              : "无论是 AI 产品市场、品牌公关、内容策略，还是一个需要从 0 到 1 搭建的新项目，欢迎与我联系。"}
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <a className="rounded-[1.65rem] bg-[#212121] p-6 text-primary transition hover:bg-primary hover:text-black" href="mailto:lilac9406@gmail.com">
              <Mail className="mb-5" />
              <p className="text-sm uppercase tracking-[0.2em] opacity-60">Email</p>
              <p className="mt-2 text-2xl">lilac9406@gmail.com</p>
            </a>
            <div className="rounded-[1.65rem] bg-[#212121] p-6 text-primary">
              <Phone className="mb-5" />
              <p className="text-sm uppercase tracking-[0.2em] opacity-60">Tel</p>
              <p className="mt-2 text-2xl">156 0172 8406</p>
            </div>
            <div className="rounded-[1.65rem] bg-[#212121] p-6 text-primary transition hover:bg-primary hover:text-black">
              <p className="text-sm uppercase tracking-[0.2em] opacity-60">{isEnglish ? "Xiaohongshu" : "小红书"}</p>
              <p className="mt-2 text-2xl">璐子野 lzy</p>
              <a
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/35 px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-black"
                href="https://xhslink.com/m/1ZXPrgopyXB"
                target="_blank"
                rel="noreferrer"
              >
                {isEnglish ? "View" : "点击查看"} <ArrowRight size={16} />
              </a>
            </div>
            <div className="rounded-[1.65rem] bg-[#212121] p-6 text-primary">
              <p className="text-sm uppercase tracking-[0.2em] opacity-60">{isEnglish ? "WeChat" : "微信"}</p>
              <p className="mt-2 text-2xl">璐璐</p>
              <button
                type="button"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/35 px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-black"
                onClick={() => onOpenImage({ src: wechatQrUrl, alt: "微信二维码" })}
              >
                {isEnglish ? "View" : "点击查看"} <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <a
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] md:px-9 md:py-3.5"
            href={resumeUrl}
            download={resumeFileName}
          >
            {isEnglish ? "Download CV" : "下载简历"} <ArrowRight size={18} />
          </a>
          <footer className="mt-16 border-t border-primary/15 pt-8 text-sm text-primary/55">
            <p className="text-[#E1E0CC]">Cheng Lu</p>
            <p className="mt-2">Brand Communications · Content Strategy · AI Co-creation</p>
            <p className="mt-2">Based in Shanghai. Open to meaningful ideas and collaborations.</p>
          </footer>
        </div>
      </div>
    </section>
  );
}

function ImageLightbox({ image, onClose }: { image: LightboxImage | null; onClose: () => void }) {
  React.useEffect(() => {
    if (!image) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/88 px-4 py-8 backdrop-blur-md" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0 cursor-zoom-out" aria-label="关闭图片弹窗" onClick={onClose} />
      <div className="relative z-10 max-h-full max-w-6xl">
        <button
          type="button"
          className="absolute right-0 top-0 z-20 -translate-y-12 rounded-full border border-primary/35 bg-black/70 px-4 py-2 text-sm text-primary backdrop-blur-md transition hover:bg-primary hover:text-black"
          onClick={onClose}
        >
          关闭
        </button>
        <img className="max-h-[82vh] max-w-full rounded-xl object-contain shadow-2xl shadow-black/60" src={image.src} alt={image.alt} decoding="async" />
      </div>
    </div>
  );
}

function SiteTools({ language, onToggleLanguage }: { language: Language; onToggleLanguage: () => void }) {
  React.useEffect(() => {
    document.documentElement.lang = language === "CN" ? "zh-CN" : "en";
  }, [language]);

  return (
    <button
      type="button"
      className="fixed right-4 top-4 z-[100] rounded-full border border-primary/25 bg-black/55 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-primary backdrop-blur-xl transition hover:border-primary hover:bg-primary hover:text-black"
      onClick={onToggleLanguage}
    >
      Language · {language}
    </button>
  );
}

function App() {
  const [language, setLanguage] = React.useState<Language>("CN");
  const [lightboxImage, setLightboxImage] = React.useState<LightboxImage | null>(null);
  const toggleLanguage = () => setLanguage((current) => (current === "CN" ? "EN" : "CN"));
  const closeLightbox = React.useCallback(() => setLightboxImage(null), []);

  return (
    <main className="bg-black">
      <SiteTools language={language} onToggleLanguage={toggleLanguage} />
      <Hero language={language} />
      <Story language={language} />
      <Expertise language={language} onOpenImage={setLightboxImage} />
      <Experience language={language} />
      <Education language={language} />
      <Contact language={language} onOpenImage={setLightboxImage} />
      <ImageLightbox image={lightboxImage} onClose={closeLightbox} />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
