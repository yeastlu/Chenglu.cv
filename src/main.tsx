import React from "react";
import ReactDOM from "react-dom/client";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { motion, useInView, useMotionValueEvent, useScroll, useTransform, MotionValue } from "framer-motion";
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

type CareerLineItem = {
  eyebrow: string;
  title: string;
  description: string;
  cases?: string[];
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

function getSitePreloadUrls() {
  const urls = new Set<string>();

  Object.values(persistedProfileState.mediaBySlot ?? {}).forEach((mediaItems) => {
    mediaItems.forEach((media) => {
      if (media.type.startsWith("image")) {
        urls.add(assetUrl(media.url));
      }
    });
  });

  urls.add(assetUrl("/uploads/profile-media/contact-portrait.jpg"));
  urls.add(assetUrl("/uploads/profile-media/wechat-qr.jpg"));

  return [...urls];
}

function preloadImage(url: string) {
  return new Promise<void>((resolve) => {
    if (!document.querySelector(`link[rel="preload"][as="image"][href="${url}"]`)) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = url;
      document.head.appendChild(link);
    }

    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = url;
  });
}

function warmSiteImages() {
  return Promise.allSettled(getSitePreloadUrls().map(preloadImage));
}

const hiddenExpertiseIds = new Set(["cannes-retail", "ad-community", "zhihu-live", "spring-doorplate", "mountains-talk", "production-map", "mooncake", "ai-knowledge"]);

const expertiseItems: ExpertiseItem[] = [
  {
    number: "03",
    title: "铁瓷儿旅行",
    subtitle: "入境游本地沉浸式体验产品｜AI 辅助产品详情页",
    description:
      "围绕外国游客在理解上海、本地生活与中国饮食文化时的决策断点，打磨菜市场 + 美食、陶瓷 + 美食等本地沉浸式体验路线；结合 AI 工具搭建产品详情页，将路线亮点、适合人群、体验流程和信任信息转化为用户可理解、可比较、可下单的产品表达，并在小红书、Instagram、YouTube 等平台进行内容传播。",
    role: "旅行产品打磨、用户体验、AI 原型、产品详情页、社交媒体传播",
    projectUrl: "https://yeastlu.github.io/Xiaolongbao/",
    upload: {
      id: "tieci-travel",
      title: "铁瓷儿旅行素材",
      hint: "预留图片及视频：菜市场体验、陶瓷体验、美食路线、产品详情页、社媒内容截图",
    },
  },
  {
    number: "01",
    title: "从 0 到 1 建立品牌心智",
    subtitle: "群玉山咨询｜让新品牌拥有清晰的行业叙事",
    description:
      "为新成立的咨询公司制定品牌公关策略，围绕创始人 IP、行业内容、媒体矩阵和用户社群建立完整传播体系，一年内实现账号从 0 到 10 万+粉丝，并逐步形成行业头部认知。",
    role: "品牌心智、PR 策略、内容体系、媒体关系、社群运营",
    upload: {
      id: "qunyushan",
      title: "群玉山咨询项目素材",
      hint: "预留图片及视频：公关活动、内容截图、社群活动、媒体展示",
    },
  },
  {
    number: "01",
    title: "拓展跨行业传播生态",
    subtitle: "SGAD 胜加广告",
    description:
      "围绕新消费、科技与商业领域拓展媒体关系，通过内容合作、行业协会和新媒体栏目，为创意公司建立更丰富的行业触点，提升品牌跨行业曝光与专业权威性。",
    role: "品牌公关、媒体矩阵、行业合作、生态触点",
    projectUrl: "https://www.digitaling.com/company/11997",
    upload: {
      id: "sgad",
      title: "SGAD 媒体展示区",
      hint: "预留图片及视频：媒体报道、内容合作案例、栏目截图、行业活动照片",
    },
  },
  {
    number: "03",
    title: "企业团建旅行服务",
    subtitle: "SGAD 胜加广告｜海南三亚行",
    description:
      "在胜加期间参与企业团建旅行服务，将公司内部团队建设需求转化为目的地行程与体验设计：围绕海南三亚的海岛环境、团队关系和活动节奏，协同供应商与内部团队完成旅行服务落地。",
    role: "企业团建、目的地行程、体验节奏、供应商协同",
    upload: {
      id: "sgad-sanya-trip",
      title: "胜加海南三亚行素材",
      hint: "预留图片及视频：团建行程、现场照片、目的地素材、活动记录",
    },
  },
  {
    number: "02",
    title: "把行业关系产品化",
    subtitle: "同门会｜从内容影响力到长期行业连接",
    description:
      "基于广告行业人群的真实需求，将内容、人脉与活动资源重新组织为可持续运营的行业交流产品「同门会」；并把 workshop 机制复用到百度、腾讯等平台项目中，为平台建立更紧密的用户关系和商业合作场景。",
    role: "产品概念、合作机制、内容策划、活动运营、商业合作",
    upload: {
      id: "tongmenhui",
      title: "广告门同门会素材",
      hint: "预留图片及视频：活动现场、产品页面、社群截图、合作资料",
    },
  },
  {
    number: "03",
    title: "西藏品牌活动行",
    subtitle: "拉萨 · 山南 · 林芝｜品牌文化调研与路线体验",
    description:
      "围绕西藏拉萨、山南、林芝的地域文化与非遗语境，进行实地文化调研与品牌活动路线体验，将地方文化、自然场景和品牌价值连接起来，为后续内容表达与活动策划提供一手素材。",
    role: "文化调研、路线体验、品牌活动策划、内容素材挖掘",
    upload: {
      id: "tibet-brand-trip",
      title: "西藏品牌活动行素材",
      hint: "预留图片及视频：拉萨、山南、林芝路线照片、非遗调研、活动现场",
    },
  },
  {
    number: "02",
    title: "把企业议题转化为联合内容 campaign",
    subtitle: "百度 × 百乐门",
    description:
      "围绕企业希望传递的行业议题，设计更具参与感和传播力的内容及活动形式，让品牌信息不再停留于单向输出，而成为行业人群愿意参与的讨论。",
    role: "联合营销、创意概念、内容策划、资源协调、传播文案",
    upload: {
      id: "baidu-paramount",
      title: "百度 × 百乐门素材",
      hint: "预留图片及视频：活动照片、传播物料、内容页面",
    },
  },
  {
    number: "02",
    title: "全球内容的本地化转译",
    subtitle: "戛纳创意节与世界零售大会",
    description:
      "从大量国际会议内容中提取对中国营销人与商业从业者真正有价值的信息，将复杂趋势转化为结构清晰、可阅读、可传播的专题内容。对我来说，本地化不是翻译，而是重新理解语境、受众和他们真正关心的问题。",
    role: "跨文化研究、选题策划、趋势提炼、本地化表达",
    upload: {
      id: "cannes-retail",
      title: "国际内容专题素材",
      hint: "预留图片及视频：专题截图、会议内容、传播页面",
    },
  },
  {
    number: "03",
    title: "为初创业务打开新市场",
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
    title: "把市场节点变成品牌 campaign",
    subtitle: "把企业周年庆转化成行业共同记忆",
    description:
      "围绕品牌十周年节点，将企业历史、行业关系与未来愿景转化为一场有叙事、有情绪、有参与感的行业聚会，并带来 100+ 新客户转化。曾策划两届广告圈年度闭门聚会，主题分别为「重生」与「逆流而上」，顺应年度行业主要讨论，单场邀请 80-100 位广告公司负责人参与。",
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
    title: "跨品牌联合营销",
    subtitle: "广告门 × 丁香医生｜逃离广告狂人院",
    description:
      "以广告从业者的健康焦虑为切入点，将营养健康、颈椎腰椎等严肃职业健康议题转化为具有游戏感与参与感的沉浸式体验，让品牌议题真正进入从业者的日常生活；后续与平台达成年度深度合作。",
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
    title: "AI 与内容、产品协作",
    subtitle: "把分散经验变成可以持续调用的资产",
    description:
      "将项目资料、研究信息和个人经验整理为结构化知识库，提高信息检索、内容策划和项目复盘效率；持续使用 AI 工具完成研究、分析、内容生成和产品原型探索，并 Vibe coding 了旅行产品网页。",
    role: "AI 工作流、信息架构、知识整理、提示词设计、原型测试",
    projectUrl: "https://yeastlu.github.io/Xiaolongbao/",
    upload: {
      id: "ai-knowledge",
      title: "AI 知识库素材",
      hint: "预留图片及视频：知识库截图、工作流、提示词结构",
    },
  },
  {
    number: "08",
    title: "上海本地外国人 City Walk",
    subtitle: "城市漫游 + 学做中国小吃｜入境游定制体验",
    description:
      "面向外国游客设计上海本地美食文化体验，将菜市场、街区漫游和学做中国小吃结合成定制 tour；同时使用 Vibe Coding 工具搭建旅行产品网页，把服务想法转化为可展示、可测试的数字原型。",
    role: "旅行产品策划、城市漫游、餐桌体验、内容架构、Vibe Coding",
    projectUrl: "http://xhslink.cn/o/34tAfhKDAso",
    upload: {
      id: "vibe-market",
      title: "上海本地 City Walk 素材",
      hint: "预留图片及视频：城市漫游、菜市场、小吃体验、网站页面、交互录屏",
    },
  },
];

const visibleExpertiseItems = expertiseItems.filter((item) => !hiddenExpertiseIds.has(item.upload?.id ?? ""));

const expertiseEnglishBySlot: Record<string, Partial<ExpertiseItem>> = {
  "tieci-travel": {
    title: "Tieci Travel",
    subtitle: "Inbound local immersive experiences | AI-assisted product detail pages",
    description:
      "Refined local immersive travel experiences for international visitors, including market + food and ceramics + food routes. Used AI tools to build product detail pages that translate route highlights, suitable audiences, experience flow and trust cues into an understandable, comparable and bookable product expression, with content distributed on Xiaohongshu, Instagram and YouTube.",
    role: "Travel product refinement, user experience, AI prototype, product pages, social media communication",
  },
  "qunyushan": {
    title: "Building Brand Memory From 0 to 1",
    subtitle: "Qunyu Mountain Consulting | Giving a new brand a clear industry narrative",
    description:
      "Built the PR strategy for a newly founded consulting company, shaping founder IP, industry content, media networks and user communities into one coherent communication system. The account grew from zero to 100K+ followers within one year.",
    role: "Brand narrative, PR strategy, content system, media relations, community operations",
  },
  "sgad": {
    title: "Expanding Cross-industry Ecosystems",
    subtitle: "SGAD",
    description:
      "Expanded media relationships across consumer, technology and business sectors through content partnerships, industry associations and new media columns, creating broader industry touchpoints for a creative company.",
    role: "Brand PR, media network, industry partnership, ecosystem touchpoints",
  },
  "sgad-sanya-trip": {
    title: "Corporate Team-building Travel Service",
    subtitle: "SGAD | Sanya, Hainan",
    description:
      "Participated in a corporate team-building travel service during my time at SGAD, translating internal team needs into destination itinerary and experience design around Sanya's island setting, team relationships and activity rhythm.",
    role: "Corporate team-building, destination itinerary, experience rhythm, vendor coordination",
  },
  "tongmenhui": {
    title: "Productizing Industry Relationships",
    subtitle: "Tongmenhui | From content influence to long-term industry connection",
    description:
      "Based on the real needs of advertising professionals, reorganized content, network and event resources into Tongmenhui, a sustainable industry exchange product. Its workshop format and resources were later adapted for platforms including Baidu and Tencent.",
    role: "Product concept, partnership mechanism, content planning, event operations, business partnerships",
  },
  "baidu-paramount": {
    title: "Turning Brand Topics into Joint Campaigns",
    subtitle: "Baidu x Paramount",
    description:
      "Designed participatory content and event formats around a brand's industry topic, turning one-way communication into discussions that industry audiences wanted to join.",
    role: "Joint marketing, creative concept, content planning, resource coordination, copywriting",
  },
  "tibet-brand-trip": {
    title: "Tibet Brand Trip",
    subtitle: "Lhasa · Shannan · Nyingchi | Cultural research and route experience",
    description:
      "Researched local culture and intangible heritage across Lhasa, Shannan and Nyingchi, connecting place, landscape and brand value to support later content expression and brand activity planning.",
    role: "Cultural research, route experience, brand activity planning, content material mining",
  },
  "cannes-retail": {
    title: "Localizing Global Content",
    subtitle: "Cannes Lions and World Retail Congress",
    description:
      "Extracted insights from large volumes of international conference content and translated complex global trends into clear, readable and shareable editorial packages for Chinese marketing and business audiences. For me, localization is not translation; it is re-understanding the context and the user's real question.",
    role: "Cross-cultural research, topic planning, trend synthesis, localized expression",
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
    title: "Turning Market Moments into Campaigns",
    subtitle: "Turning an anniversary into a shared industry memory",
    description:
      "For the brand's 10th anniversary, transformed company history, industry relationships and future vision into a narrative-driven gathering with emotion, participation and 100+ new customer conversions. Also planned two invitation-only annual industry gatherings for 80-100 agency leaders.",
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
    title: "Cross-brand Campaigns",
    subtitle: "Adquan x DXY | Escape the Ad Madhouse",
    description:
      "Used health anxiety among advertising professionals as the entry point, translating nutrition, neck and spine care topics into an immersive, game-like experience that brought the brand issue into daily life.",
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
    title: "AI Collaboration for Content and Product",
    subtitle: "Turning scattered experience into reusable assets",
    description:
      "Organized project materials, research information and personal experience into structured knowledge systems to improve retrieval, planning and review. I use AI tools for research, analysis, content generation and product prototyping, and vibe-coded a travel product website.",
    role: "AI workflow, information architecture, knowledge organization, prompt design, prototype testing",
  },
  "vibe-market": {
    title: "Shanghai Local City Walk for International Visitors",
    subtitle: "City walk + Chinese snack-making | Customized inbound travel experience",
    description:
      "Designed a Shanghai local food culture experience for international visitors, combining market walks, neighborhood exploration and Chinese snack-making into a customized tour. Also built a vibe-coded website prototype for the service.",
    role: "Travel product planning, city walk, table experience, content architecture, vibe coding",
  },
};

const careerLineItemsCn: CareerLineItem[] = [
  {
    eyebrow: "01 / Brand PR",
    title: "品牌公关",
    description:
      "围绕企业品牌心智、行业影响力和外部传播生态展开，擅长从 0 到 1 建立品牌叙事、创始人 IP、媒体矩阵与社群关系。",
    cases: ["群玉山咨询：从 0 到 1 搭建公关与内容体系，1 年内实现 10 万+粉丝增长", "SGAD 胜加广告：拓展新消费、科技、商业媒体与行业协会资源，提升跨行业曝光"],
  },
  {
    eyebrow: "02 / Marketing Communication",
    title: "营销传播",
    description:
      "围绕 campaign、活动体验、跨品牌合作、内容运营与商业转化展开，把抽象议题转化为可参与、可传播、可沉淀的营销动作。",
    cases: ["广告门：大型行业活动、广告门 × 丁香医生、广告圈年度闭门聚会", "Soul：品牌首次线下艺术展，10,000+ 用户参与", "极链科技：直播营销内容与 AI SaaS 产品商业化合作"],
  },
  {
    eyebrow: "03 / Travel Service",
    title: "旅行服务",
    description:
      "围绕目的地、地方文化和真实体验展开，将城市、风味、非遗与品牌活动组织成可被参与、可被理解、可被持续使用的旅行服务产品。",
    cases: ["铁瓷儿旅行：打磨入境游本地沉浸式体验产品，并结合 AI 搭建产品详情页", "胜加：企业团建旅行服务，海南三亚行", "自由职业：西藏拉萨、山南、林芝品牌活动行", "上海本地外国人 City Walk：城市漫游 + 学做中国小吃定制 tour"],
  },
];

const careerLineItemsEn: CareerLineItem[] = [
  {
    eyebrow: "01 / Brand PR",
    title: "Brand PR",
    description:
      "Building brand memory, industry influence and communication ecosystems through narrative strategy, founder IP, media relations and community operations.",
    cases: ["Qunyu Mountain Consulting: built PR and content systems from 0 to 1, growing to 100K+ followers within one year", "SGAD: expanded media and industry association resources across consumer, technology and business sectors"],
  },
  {
    eyebrow: "02 / Marketing Communication",
    title: "Marketing Communication",
    description:
      "Turning brand topics into campaigns, events, cross-brand collaborations, content operations and business outcomes that people can participate in and remember.",
    cases: ["Adquan: major industry events, Adquan x DXY, invitation-only annual industry gatherings", "Soul: the brand's first offline art exhibition with 10,000+ participants", "Video++: live-streaming marketing content and AI SaaS commercialization partnerships"],
  },
  {
    eyebrow: "03 / Travel Service",
    title: "Travel Service",
    description:
      "Designing travel services around destination, local culture and lived experience, turning cities, food, craft and brand trips into participatory and understandable products.",
    cases: ["Tieci Travel: refined inbound local immersive experiences and built AI-assisted product detail pages", "SGAD: corporate team-building trip in Sanya, Hainan", "Freelance: Tibet brand trip across Lhasa, Shannan and Nyingchi", "Shanghai local City Walk for international visitors: market walk plus Chinese snack-making tour"],
  },
];

function getLocalizedExpertiseItem(item: ExpertiseItem, language: Language) {
  if (language === "CN") return item;
  const slotId = item.upload?.id ?? "";
  return { ...item, ...expertiseEnglishBySlot[slotId] };
}

const experienceItemsEn: ExperienceItem[] = [
  {
    period: "2026.01–2026.08",
    org: "Tieci Travel",
    role: "Marketing Manager | Remote",
    description:
      "Refined inbound local immersive travel products, built AI-assisted product detail pages, and operated social content across Xiaohongshu, Instagram and YouTube.",
    bullets: [
      "Refined local immersive travel routes such as market + food and ceramics + food experiences, translating local culture into clear product flows, trust cues and bookable offerings.",
      "Used AI tools to build product detail pages and quickly validate how route highlights, user scenarios and experience steps should be presented.",
      "Operated social media communication across Xiaohongshu, Instagram and YouTube to build early awareness for inbound travel experiences.",
    ],
  },
  {
    period: "2025.03–2025.12",
    org: "Freelance",
    description:
      "Provided brand narrative, localized cultural research, user stories, event integration, KOL activation and travel service planning for culture, rural tourism and consumer brands.",
    bullets: [],
  },
  {
    period: "2024.10–2024.12",
    org: "SDG Changemaker",
    role: "Assistant Researcher | Remote",
    bullets: [
      "Completed two long-form English research papers on sustainable materials, community applications and circular economy models for an international sustainable business organization.",
    ],
  },
  {
    period: "2022.01–2023.04",
    org: "Qunyu Mountain Consulting",
    role: "PR Director | Shanghai",
    bullets: [
      "Built brand PR, content strategy, founder IP and community systems from 0 to 1, growing the account from zero to 100K+ followers within one year.",
    ],
  },
  {
    period: "2021.01–2022.01",
    org: "SGAD",
    role: "PR Director | Shanghai",
    bullets: [
      "Expanded media networks across consumer, technology and business sectors through content partnerships, and participated in the Sanya corporate team-building travel service.",
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
      "Planned 5+ major industry campaigns and cross-brand events, including themes, content structure, partner communication, guest invitation and copywriting.",
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
    period: "2026.01–2026.08",
    org: "铁瓷儿旅行",
    role: "市场经理｜远程",
    description:
      "打磨入境游本地沉浸式体验产品，结合 AI 搭建产品详情页，并负责小红书、Instagram、YouTube 等平台的内容运营与传播。",
    bullets: [
      "入境游体验产品打磨：围绕外国游客理解上海、本地生活与中国饮食文化的真实问题，设计并优化菜市场 + 美食、陶瓷 + 美食等本地沉浸式体验路线。",
      "用户决策链路表达：将路线亮点、适合人群、体验流程、注意事项与信任信息整理为更清晰的产品详情页，帮助用户更容易理解、比较和做出预订决策。",
      "AI 辅助原型验证：结合 AI 工具快速搭建产品详情页，验证路线叙事、内容结构和视觉呈现方式，提高产品想法从概念到可展示页面的推进效率。",
      "社交媒体内容传播：负责小红书、Instagram、YouTube 等平台内容运营，以真实体验、地方文化和美食场景建立产品认知。",
    ],
  },
  {
    period: "2025.03–2025.12",
    org: "自由职业者",
    description:
      "为旅行、文化、农文旅与消费品牌提供品牌叙事、本地化文化研究、用户故事、活动整合及 KOL 投放服务。",
    bullets: [
      "平行光旅行平台｜内容运营与品牌叙事：从 0 到 1 梳理旅行平台的品牌表达，策划并创作适配公众号、小红书和视频号的系列内容，一个月内帮助平台获得 2,000+早期用户。",
      "西藏非遗调研｜品牌营销创意研究：深入调研邦典梭织技艺及其文化背景，将传统非遗的材料、工艺和生活含义转化为现代品牌能够理解和使用的故事语言，为护肤品牌广告片提供非遗文化研究与叙事依据。",
      "农文旅整合项目｜用户故事挖掘与活动运营：策划“果树认领”活动，通过采访政府工作人员、村委和农户，建立可持续使用的本地故事素材库；统筹活动落地，实现 200+参与及 10万+传播曝光。",
      "联合利华和路雪｜小红书 KOL 投放与内容策划：围绕品牌产品及社交媒体传播目标，规划四类 KOL 的内容方向、发布节奏与合作数量，统筹 100+ KOL 投放，为品牌相关话题创造 1000万+曝光。",
      "西藏品牌活动行｜拉萨、山南、林芝：围绕地域文化、非遗语境与自然场景进行品牌活动路线体验和内容素材挖掘，为后续活动策划与品牌表达提供一手观察。",
      "跳海 × 铁瓷江西小吃快闪｜个人美食 IP 联合活动：以“和铁瓷吃的每一顿好吃的，让人快乐”为品牌表达，在跳海大沽路策划江西小吃快闪，把地方风味带入城市社交空间，获得 5,000+曝光。",
      "上海本地美食文化 tour｜入境游产品策划：面向外国游客设计城市漫游 + 学做中国小吃的定制体验，把本地生活、菜市场和餐桌文化转化为可参与的旅行产品。",
    ],
  },
  {
    period: "2024.10–2024.12",
    org: "SDG Changemaker",
    role: "助理研究员｜远程",
    bullets: [
      "围绕可持续材料的多场景应用与社区循环经济完成两篇英文万字研究论文。",
      "为跨国可持续商业组织撰写文献综述，为可持续材料的社区应用及商业化项目提供研究支持，训练从企业管理与创业视角理解新产品机会。",
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
      "独立统筹设计、客户、供应商、采购、嘉宾与媒体等多方资源，确保公关活动从策划到上线不走形。",
    ],
  },
  {
    period: "2021.01–2022.01",
    org: "SGAD 胜加广告",
    role: "公关总监｜上海",
    bullets: [
      "拓展新消费、科技及商业领域媒体矩阵，通过内容合作帮助企业触达不同行业的潜在客户。",
      "加强与行业协会和专业机构的合作，推出新媒体内容系列，提升品牌的跨行业曝光与专业权威性。",
      "围绕不同垂直行业设计内容合作切入点，为品牌建立更完整的外部传播生态。",
      "参与企业团建旅行服务「海南三亚行」，协同内部团队与外部供应商完成目的地行程、活动节奏和现场体验落地。",
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
      "策划广告门 × 丁香医生「逃离广告狂人院」跨品牌活动，将广告人的营养健康、颈椎腰椎等职业健康议题转化为沉浸式体验，并推动年度深度合作。",
      "策划两届广告圈年度闭门聚会，主题分别为「重生」与「逆流而上」，顺应年度行业主要讨论，单场邀请 80-100 位广告公司负责人参与。",
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
    ? ["Story", "Career Lines", "Selected Work", "Experience", "Education", "Contact"]
    : ["Story", "三条线", "代表项目", "Experience", "Education", "Contact"];
  const navTargets = ["#story", "#career-lines", "#expertise", "#experience", "#education", "#contact"];

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
              <a key={item} href={navTargets[index]}>
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
                {isEnglish ? "Brand PR | Marketing Communication | Travel Service | Cultural Translation" : "品牌公关｜营销传播｜旅行服务｜文化转译"}
              </p>
              <div className="font-yahei-light mt-5 max-w-2xl space-y-3 text-[10px] leading-[1.825] text-primary/70 sm:text-xs md:text-[11px] lg:text-xs">
                <p>
                  {isEnglish
                    ? "With 8+ years of experience in brand PR, marketing communications and experience planning, my career can be read through three lines: brand PR, marketing communication and travel service."
                    : "拥有 8 年以上品牌公关、营销传播与体验策划经验，我的职业经历可以梳理为三条线：品牌公关线、营销传播线、旅行服务线。"}
                </p>
                <p className="text-primary/60">
                  {isEnglish
                    ? "I translate abstract brand and cultural ideas into content, events and services that can be felt, remembered and executed. My work moves between narrative strategy, cross-brand campaigns, local culture and real user experience."
                    : "我擅长把抽象的品牌、文化与地方生活概念，转化为能够被感受、被记住、被执行的内容、活动与服务体验。工作横跨品牌叙事、跨品牌 campaign、地方文化与真实用户体验。"}
                </p>
              </div>
            </div>
            <div className="space-y-5 md:col-span-5 md:pb-6">
              <div className="flex flex-wrap gap-3">
                <a className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-medium text-black transition hover:gap-3" href="#expertise">
                  {isEnglish ? "View Work" : "查看代表项目"} <ArrowRight size={18} />
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
        "I move between brand systems and real life.",
        "A media strategy, a campaign, a meal, a street walk, a brand trip,",
        "all start from the same question:",
        "what is truly worth being seen here?",
        "I prefer to enter the context first, observe people and places closely,",
        "then turn the useful part into language, content and experience.",
        "My work is not only about exposure.",
        "It is about making a brand, a place, or a story easier to feel and remember.",
      ]
    : [
        "我在品牌系统和真实生活之间工作。",
        "一次媒体传播、一场 campaign、一顿饭、一段街区漫游、一次品牌活动行，",
        "都从同一个问题开始：",
        "这里真正值得被看见的是什么？",
        "我习惯先进入语境，靠近人、地点和日常生活，",
        "再把其中有价值的部分转化为语言、内容和体验。",
        "我的工作不只是制造曝光，",
        "而是让一个品牌、一个地方、一个故事，更容易被感受和记住。",
      ];

  return (
    <section id="story" className="bg-black px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl px-6 text-center sm:px-10">
        <p className="mb-8 text-[10px] uppercase tracking-[0.24em] text-primary sm:text-xs">Brand narrative</p>
        <h2 className="font-song-bold mx-auto max-w-4xl text-[1.85rem] leading-[1.08] tracking-[0.03em] text-[#E1E0CC] sm:text-[2.6rem] md:text-[3.3rem] lg:text-[4rem]">
          <span className="block">{isEnglish ? "A cultural translator working" : "一个在品牌、传播与体验之间"}</span>
          <span className="block">{isEnglish ? "between brands, communication and experience." : "工作的文化转译者。"}</span>
        </h2>
        <p className="story-serif-light mx-auto mt-10 max-w-3xl text-sm leading-7 text-primary/72 md:text-base md:leading-8">
          {isEnglish
            ? "I stay sensitive to people, emotions and cultural context, using research, structure and business goals"
            : "我对人、情绪和文化语境保持敏感，用调研、结构和商业目标，"}
          <span className="story-serif-light block">
            {isEnglish ? "to turn ambiguous feelings into strategies and experiences that can land." : "把模糊的感受转化为可以落地的策略与体验。"}
          </span>
        </p>
        <ScrollRevealLines lines={bodyLines} />
      </div>
    </section>
  );
}

function CareerLines({ language }: { language: Language }) {
  const isEnglish = language === "EN";
  const items = isEnglish ? careerLineItemsEn : careerLineItemsCn;
  const sectionRef = React.useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextIndex = Math.min(items.length - 1, Math.floor(progress * items.length));
    setActiveIndex(nextIndex);
  });

  const activeItem = items[activeIndex];

  return (
    <section ref={sectionRef} id="career-lines" className="career-lines-section">
      <div className="career-lines-sticky">
        <div className="career-lines-layout">
          <div className="career-lines-sidebar">
            <p className="career-lines-kicker">{isEnglish ? "Career lines" : "职业三条线"}</p>
            <h2>{isEnglish ? "Three ways to read my work." : "用三条线，重新理解我的工作经历。"}</h2>
            <p className="career-lines-scroll-note">{isEnglish ? "Scroll to explore" : "向下滚动，逐条展开"}</p>
          </div>

          <div className="career-lines-stage">
            <div className="career-lines-tabs" role="tablist" aria-label={isEnglish ? "Career lines" : "职业三条线"}>
              {items.map((item, index) => (
                <button
                  key={item.eyebrow}
                  type="button"
                  className={index === activeIndex ? "is-active" : ""}
                  onClick={() => setActiveIndex(index)}
                  role="tab"
                  aria-selected={index === activeIndex}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <i aria-hidden="true" />
                </button>
              ))}
            </div>

            <motion.div
              key={activeItem.eyebrow}
              className="career-lines-content"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease }}
            >
              <p className="career-lines-index">{activeItem.eyebrow}</p>
              <h3>{activeItem.title}</h3>
              <p className="career-lines-description">{activeItem.description}</p>
              {activeItem.cases ? (
                <div className="career-lines-cases">
                  <p>{isEnglish ? "Selected evidence" : "代表经验"}</p>
                  <ul>
                    {activeItem.cases.map((caseItem) => <li key={caseItem}>{caseItem}</li>)}
                  </ul>
                </div>
              ) : null}
            </motion.div>
          </div>
        </div>
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
  const showVideoButton = false;
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
  const isEnglish = language === "EN";
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
          <h2>{isEnglish ? "WORK" : "WORK"}</h2>
          <p className="monolog-success-intro">
            {isEnglish
              ? "Selected projects across three career lines: brand PR, marketing communication and travel service."
              : "围绕三条职业主线展开的代表项目：品牌公关、营销传播、旅行服务。"}
          </p>
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
                ? "Research focus included entrepreneurial opportunity recognition, business model innovation, sustainable business, user research and new product development. This shifted my perspective from communications execution toward product, market and business-building from 0 to 1."
                : "研究方向包括创业机会识别、商业模式创新、可持续商业、用户研究与新产品开发。这段经历让我从单一传播执行，转向用产品、市场与企业管理视角理解从 0 到 1。"}
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
              ? "Whether it is brand PR, marketing communication, travel service design, or a new project that needs to be built from 0 to 1, I would be happy to connect."
              : "无论是品牌公关、营销传播、旅行服务设计，还是一个需要从 0 到 1 搭建的新项目，欢迎与我联系。"}
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
            <p className="mt-2">Brand PR · Marketing Communication · Travel Service · Cultural Translation</p>
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

function SiteLoader() {
  const [progress, setProgress] = React.useState(0);
  const [isComplete, setIsComplete] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minimumDuration = prefersReducedMotion ? 420 : 1500;
    const maximumDuration = prefersReducedMotion ? 1000 : 3600;
    const startedAt = performance.now();
    let frame = 0;
    let completeTimer = 0;
    let hideTimer = 0;
    let hasFinished = false;
    let imagesAreWarm = false;

    warmSiteImages().finally(() => {
      imagesAreWarm = true;
    });

    const animate = (now: number) => {
      const elapsedMs = now - startedAt;
      const elapsed = Math.min(elapsedMs / maximumDuration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      const canFinish = elapsedMs >= minimumDuration && (imagesAreWarm || elapsedMs >= maximumDuration);

      if (!canFinish) {
        setProgress(Math.min(96, Math.round(eased * 96)));
        frame = window.requestAnimationFrame(animate);
        return;
      }

      if (hasFinished) return;
      hasFinished = true;
      setProgress(100);
      completeTimer = window.setTimeout(() => setIsComplete(true), prefersReducedMotion ? 80 : 320);
      hideTimer = window.setTimeout(() => setIsVisible(false), prefersReducedMotion ? 240 : 980);
    };

    document.body.classList.add("is-site-loading");
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(completeTimer);
      window.clearTimeout(hideTimer);
      document.body.classList.remove("is-site-loading");
    };
  }, []);

  React.useEffect(() => {
    if (!isVisible) {
      document.body.classList.remove("is-site-loading");
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`site-loader ${isComplete ? "is-complete" : ""}`} aria-live="polite" aria-label="Loading">
      <div className="site-loader-counter">{progress}%</div>
      <div className="site-loader-meta">
        <span>Cheng Lu</span>
        <span>Portfolio</span>
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
      <SiteLoader />
      <SiteTools language={language} onToggleLanguage={toggleLanguage} />
      <Hero language={language} />
      <Story language={language} />
      <CareerLines language={language} />
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
