export type Language = "zh" | "en";

export const content = {
  zh: {
    nav: ["精选项目", "AI 实践", "职业经历", "联系我"],
    skip: "跳转至正文",
    menu: "菜单",
    close: "关闭",
    enlarge: "查看大图",
    eyebrow: "程璐 CHENG LU · 个人作品集",
    headline: ["让好想法，", "走进真实世界。"],
    intro: "我连接品牌、人与文化，也用 AI 把想法变成可以体验的产品。",
    bio: "10 年以上品牌传播与内容经验，从品牌叙事、达人营销到线下体验，把对人的理解，转化为清晰的表达与扎实的执行。",
    tags: ["品牌与增长", "AI 与产品", "旅行与文化"],
    explore: "探索我的工作",
    resume: "下载简历",
    portrait: "程璐在户外的个人照片",
    portraitNote: "保持好奇，也走进现场。",
    location: "中国 · 上海 / 面向更大的世界",
    stats: [
      ["10+ 年", "品牌传播与跨领域实践"],
      ["0 → 10 万+", "群玉山账号一年粉丝增长"],
      ["1,000 万+", "和路雪项目品牌话题曝光"],
    ],
    focusLabel: "01 / 近期关注",
    focusTitle: ["让品牌跨过边界，", "也走近人。"],
    focusYear: "2026 · 品牌出海",
    focusIntro:
      "今年，我主要参与品牌出海工作，把海外达人传播与线下活动、展厅落地连接起来，让品牌从屏幕上的内容，走进真实的体验。",
    focusSteps: [
      [
        "海外达人投放",
        "围绕传播目标匹配达人，推进 Instagram、TikTok、YouTube 等平台的内容合作与投放执行。",
      ],
      ["线下活动执行", "从活动筹备到现场协同，推动策划内容与具体体验落地。"],
      ["展厅落地执行", "参与展厅项目的落地，把品牌表达落实到空间与现场细节。"],
    ],
    focusCaption: "品牌活动现场 · 项目示意",
    focusAlt: "品牌活动现场，来宾在汽车展示空间合影",
    workLabel: "02 / 精选项目",
    workTitle: "好内容，有真实的回响。",
    workIntro:
      "从一句品牌主张，到一次被记住的体验。以下是我参与策划、推进与落地的工作。",
    projectDetail: "项目思路与我的工作",
    projects: [
      {
        id: "mountains",
        category: "品牌策略 / 内容增长",
        client: "群玉山咨询",
        title: "从零开始，让一个新品牌被记住。",
        image: "mountains",
        alt: "群玉山咨询品牌官网与山峦视觉",
        metric: "0 → 10 万+",
        metricLabel: "一年内账号粉丝增长",
        description:
          "从 0 到 1 搭建品牌公关与内容体系，将创始人观点、行业内容和社群关系组织成持续的品牌表达。",
        detail:
          "制定公关策略，打造创始人 IP，并建立覆盖 20+ 核心自媒体与 10+ 官方媒体的传播矩阵。统筹设计、供应商、客户与媒体，让策略从内容延伸到活动现场。",
      },
      {
        id: "walls",
        category: "达人营销 / 内容优化",
        client: "和路雪",
        title: "从产品卖点，找到用户愿意看的那一刻。",
        image: "",
        alt: "",
        metric: "1,000 万+",
        metricLabel: "项目品牌话题曝光",
        description:
          "策划覆盖 4 类、100+ 达人的 KOL 矩阵与发布节奏，根据内容表现调整传播重点和达人筛选。",
        detail:
          "把内容重点从“芝士流心”调整为视觉表现力更强的“芝士拉丝”，将产品特征转化为更适合社交平台传播的内容。曝光为项目品牌话题数据。",
      },
      {
        id: "travel",
        category: "旅行体验 / AI 辅助原型",
        client: "铁瓷儿旅行",
        title: "让一座城市，成为可以参与的体验。",
        image: "travel",
        alt: "外国游客参与上海本地美食文化体验",
        metric: "从路线到产品",
        metricLabel: "研究 · 体验设计 · 内容表达",
        description:
          "面向外国游客，打磨上海菜市场、美食与陶瓷等本地体验，把地方文化转化为可理解的旅行产品。",
        detail:
          "定性研究入境游市场与可行方向；梳理适合人群、体验流程、路线亮点与信任信息，用 AI 搭建产品详情页原型，并在小红书、Reddit、Instagram、YouTube 开展内容传播。",
      },
      {
        id: "tibet",
        category: "文化研究 / 品牌叙事",
        client: "自然堂 · 西藏文化调研",
        title: "走进地方文化，找到有根的品牌故事。",
        image: "tibet",
        alt: "西藏实地文化调研时与当地人的合影",
        metric: "一手文化研究",
        metricLabel: "非遗语境与品牌叙事",
        description:
          "挖掘喜马拉雅非遗“邦典”织造技艺的文化内涵，连接地域文化与品牌“喜马拉雅源头”的定位。",
        detail:
          "从材料、工艺与当地生活语境中提炼故事线索，将文化调研转化为消费者可以理解的品牌价值，为传播内容提供研究与叙事依据。",
      },
      {
        id: "adquan",
        category: "整合营销 / 行业连接",
        client: "广告门",
        title: "把行业关系，变成共同参与的现场。",
        image: "adquan",
        alt: "广告门大型行业活动现场",
        metric: "5+ 场",
        metricLabel: "大型行业活动策划与统筹",
        description:
          "统筹大型行业活动与跨品牌合作，连接内容、嘉宾、客户与现场体验。",
        detail:
          "参与广告门 × 丁香医生、广告门 × 百度等项目，负责活动主题、内容结构、合作沟通与传播。任职期间，两年内将单一客户合作体量从 0 提升至 100 万元。",
      },
      {
        id: "soul",
        category: "品牌体验 / 线下展览",
        client: "Soul",
        title: "把线上情绪，变成可以走进去的空间。",
        image: "soul",
        alt: "Soul 线下艺术展的沉浸式光影装置",
        metric: "10,000+",
        metricLabel: "线下展览参与者",
        description:
          "策划并落地 Soul 首次线下艺术展，将线上社交关系与情绪表达转化为真实空间体验。",
        detail:
          "参与展览内容、用户体验、传播物料与现场执行统筹，让抽象的品牌感受成为可以观看、互动和分享的现场。",
      },
    ],
    aiLabel: "03 / AI 实践",
    aiTitle: ["理解问题，", "也动手做出答案。"],
    aiIntro:
      "对我来说，AI 是把研究与想法推进到原型的协作工具。比起罗列工具，我更关心：为谁解决什么问题，怎样把它做得更清楚、更好用。",
    aiSteps: [
      [
        "理解需求",
        "结合市场与定性研究，明确用户在信息理解和选择过程中的障碍。",
      ],
      [
        "组织产品",
        "梳理使用场景、内容结构与体验流程，把想法拆成可以实现的部分。",
      ],
      [
        "做出原型",
        "用 AI 辅助搭建页面与互动应用，在具体界面中检查表达、流程与使用体验。",
      ],
    ],
    notebook: "实践笔记 / 从用户问题出发",
    question: "“这段旅行，适合我吗？”",
    notebookIntro: "以入境游产品详情页为例，把一个选择问题拆成清晰的信息结构。",
    flow: [
      ["用户", "第一次来到上海的外国游客"],
      ["需求", "理解本地体验，判断是否适合自己"],
      ["表达", "适合人群 → 体验流程 → 信任信息"],
      ["产出", "AI 辅助搭建的产品详情页原型"],
    ],
    aiNote: "相关实践：旅行产品页面、个人网站、互动应用、项目知识库。",
    aiLink: "查看旅行体验案例",
    experienceLabel: "04 / 职业经历",
    experienceTitle: "每一段经历，都拓宽一点视野。",
    experienceIntro: "在品牌、科技与旅行之间，积累从理解需求到推动落地的能力。",
    experience: [
      [
        "2026.01 — 2026.08",
        "铁瓷儿旅行",
        "市场经理 · 远程",
        "海外达人传播与投放；入境游市场研究、体验产品打磨、AI 产品详情页与社交媒体内容。",
      ],
      [
        "2025.01 — 2025.12",
        "自由职业",
        "内容策划 · 上海",
        "服务自然堂、和路雪及文旅项目，涵盖品牌叙事、达人投放与活动执行。平行光品牌冷启动一个月获得 2,000+ 早期用户；横沙岛项目获得 200+ 人参与、10 万+ 曝光。",
      ],
      [
        "2024.10 — 2024.12",
        "SDG Changemaker",
        "助理研究员 · 远程",
        "围绕可持续材料、社区应用与循环经济完成英文研究，为跨国可持续商业项目提供研究支持。",
      ],
      [
        "2022.01 — 2023.04",
        "群玉山咨询",
        "公关总监 · 上海",
        "从 0 到 1 建立公关、内容与创始人 IP 体系，统筹媒体、社群及品牌活动。",
      ],
      [
        "2020.12 — 2022.01",
        "SGAD 胜加广告",
        "公关总监 · 上海",
        "拓展新消费与科技媒体合作，维护行业协会关系，策划内容系列、申报行业奖项，并参与企业团建旅行服务。",
      ],
      [
        "2017.10 — 2020.10",
        "广告门",
        "高级策划经理 · 上海",
        "策划整合营销及行业活动。知乎粉丝从 1,000 增长至 30,000，公众号从 0 增长至 10,000+。",
      ],
      [
        "2015.02 — 2017.09",
        "极链科技",
        "商务经理 · 直播事业部 · 上海",
        "拓展直播及互联网视频平台客户，推动 AI SaaS 产品商业化，策划直播创意内容与服务案例。",
      ],
    ],
    educationLabel: "教育与研究",
    education: [
      [
        "2023.09 — 2024.11",
        "兰卡斯特大学",
        "创业与创新硕士",
        "定性研究旅游消费中的社交需求。",
      ],
      ["2010.09 — 2014.07", "南昌航空大学科技学院", "英语专业学士", ""],
    ],
    aboutTitle: "先靠近，再理解。",
    about:
      "我喜欢旅行、地方风味和真实的人。走进菜市场、展厅或一个陌生的社区，常常能发现案头研究之外的线索。这份好奇，也一直影响着我的工作方式。",
    contactLabel: "05 / 保持联系",
    contactTitle: ["下一次连接，", "从一句你好开始。"],
    contactIntro: "关于品牌、新产品，或值得被更多人体验的地方，欢迎聊聊。",
    wechat: "微信联系",
    wechatAlt: "程璐的微信联系二维码",
    email: "发送邮件",
    footer: "保持好奇，把想法落地。",
    top: "回到顶部",
    meta: "程璐 Cheng Lu｜品牌传播、AI 实践与文化体验",
    description:
      "程璐的个人作品集。10 年以上品牌传播与内容经验，涵盖品牌出海、海外达人营销、线下活动与展厅执行、AI 产品原型与旅行体验。",
  },
  en: {
    nav: ["Selected work", "AI practice", "Experience", "Let’s talk"],
    skip: "Skip to content",
    menu: "Menu",
    close: "Close",
    enlarge: "View full image",
    eyebrow: "CHENG LU · INDEPENDENT MIND, HANDS-ON SPIRIT",
    headline: ["Good ideas.", "Real-world connections."],
    intro:
      "I connect brands, people and cultures — and use AI to turn ideas into things people can experience.",
    bio: "Over a decade in brand communications and content. From brand narratives and creator campaigns to experiences on the ground, I bring human insight, clear thinking and hands-on delivery.",
    tags: ["Brand & growth", "AI & product", "Travel & culture"],
    explore: "Explore my work",
    resume: "Résumé (中文 PDF)",
    portrait: "Cheng Lu outdoors",
    portraitNote: "Stay curious. Be there in person.",
    location: "SHANGHAI, CHINA / OPEN TO THE WORLD",
    stats: [
      ["10+ years", "Across brands, content & experiences"],
      ["0 → 100K+", "Followers in one year at Qunyu Mountain"],
      ["10M+", "Brand-topic views for a Wall’s campaign"],
    ],
    focusLabel: "01 / IN FOCUS",
    focusTitle: ["Across borders.", "Closer to people."],
    focusYear: "2026 · BRANDS GOING GLOBAL",
    focusIntro:
      "This year, my work has focused on helping brands reach international audiences — connecting overseas creator campaigns with the delivery of events and showroom experiences.",
    focusSteps: [
      [
        "Overseas creator campaigns",
        "Matching creators to communication goals and coordinating content partnerships and campaign delivery across Instagram, TikTok and YouTube.",
      ],
      [
        "Events on the ground",
        "Supporting preparation and on-site coordination to bring planned experiences to life.",
      ],
      [
        "Showroom delivery",
        "Supporting showroom execution, with attention to how the brand comes across in the space and its details.",
      ],
    ],
    focusCaption: "A moment at a brand activation · Illustrative project photo",
    focusAlt: "Guests posing together at an automotive brand activation",
    workLabel: "02 / SELECTED WORK",
    workTitle: "Work that finds its audience.",
    workIntro:
      "From a brand’s first story to a shared experience. A selection of projects I have helped shape and deliver.",
    projectDetail: "The thinking & my contribution",
    projects: [
      {
        id: "mountains",
        category: "BRAND STRATEGY / CONTENT GROWTH",
        client: "Qunyu Mountain Consulting",
        title: "Giving a new brand a voice worth remembering.",
        image: "mountains",
        alt: "Qunyu Mountain Consulting website and mountain imagery",
        metric: "0 → 100K+",
        metricLabel: "Account followers within one year",
        description:
          "Built a brand PR and content programme from the ground up, connecting founder perspectives, industry content and community relationships.",
        detail:
          "Developed the PR strategy and founder profile, building a network of 20+ specialist media accounts and 10+ official media outlets. Coordinated designers, vendors, clients and media to carry the brand through both content and events.",
      },
      {
        id: "walls",
        category: "CREATOR MARKETING / CONTENT OPTIMISATION",
        client: "Wall’s",
        title: "Finding the moment people want to watch.",
        image: "",
        alt: "",
        metric: "10M+",
        metricLabel: "Campaign brand-topic views",
        description:
          "Planned a mix of 100+ creators across four categories, refining creator selection and publishing schedules around content performance.",
        detail:
          "Shifted the creative focus from a “molten cheese centre” to a more visually engaging “cheese pull”, translating a product feature into a social-first creative direction. Views refer to the project’s brand topic.",
      },
      {
        id: "travel",
        category: "TRAVEL EXPERIENCE / AI PROTOTYPING",
        client: "Tieci Travel",
        title: "Making a city something you can take part in.",
        image: "travel",
        alt: "International visitors exploring local food culture in Shanghai",
        metric: "From route to product",
        metricLabel: "Research · Experience design · Content",
        description:
          "Shaped local Shanghai experiences for international visitors, translating food markets, cuisine and ceramics into accessible travel offerings.",
        detail:
          "Conducted qualitative research into the inbound travel market. Structured audience fit, itineraries, experience highlights and trust signals into AI-assisted product-page prototypes, with content across Xiaohongshu, Reddit, Instagram and YouTube.",
      },
      {
        id: "tibet",
        category: "CULTURAL RESEARCH / BRAND NARRATIVE",
        client: "Chando · Cultural research in Tibet",
        title: "Finding a brand story rooted in a real place.",
        image: "tibet",
        alt: "A group photograph during cultural fieldwork in Tibet",
        metric: "First-hand research",
        metricLabel: "Living heritage & brand storytelling",
        description:
          "Explored the cultural context of traditional Pangden weaving, connecting Himalayan craft with the brand’s Himalayan origins.",
        detail:
          "Studied materials, craft and everyday life to identify narrative threads. Translated cultural research into accessible brand value, providing a grounded basis for campaign storytelling.",
      },
      {
        id: "adquan",
        category: "INTEGRATED CAMPAIGNS / INDUSTRY COMMUNITY",
        client: "Adquan",
        title: "Turning industry connections into shared moments.",
        image: "adquan",
        alt: "A large-scale Adquan industry event",
        metric: "5+ events",
        metricLabel: "Major industry events planned & coordinated",
        description:
          "Brought together content, speakers, clients and live experiences through major industry events and cross-brand partnerships.",
        detail:
          "Worked on collaborations including Adquan × DXY and Adquan × Baidu, covering themes, content structure, partnerships and communications. Grew one client relationship from zero to RMB 1 million in business over two years.",
      },
      {
        id: "soul",
        category: "BRAND EXPERIENCE / EXHIBITION",
        client: "Soul",
        title: "Giving online emotions a physical space.",
        image: "soul",
        alt: "An immersive light installation at the Soul art exhibition",
        metric: "10,000+",
        metricLabel: "In-person exhibition participants",
        description:
          "Planned and delivered Soul’s first offline art exhibition, translating digital connections and emotional expression into a shared physical experience.",
        detail:
          "Worked across exhibition content, visitor experience, communication materials and on-site coordination, making an abstract brand feeling something people could explore, interact with and share.",
      },
    ],
    aiLabel: "03 / AI IN PRACTICE",
    aiTitle: ["Understand the problem.", "Then build something."],
    aiIntro:
      "I use AI to move research and ideas into tangible prototypes. My starting point is the person using the product: what do they need, and how can the experience be clearer and more useful?",
    aiSteps: [
      [
        "Understand",
        "Use market and qualitative research to identify what prevents people from understanding an offer or making a choice.",
      ],
      [
        "Structure",
        "Define the use case, information architecture and experience flow, breaking an idea into practical parts.",
      ],
      [
        "Prototype",
        "Build pages and interactive applications with AI, then review the content and journey in a working interface.",
      ],
    ],
    notebook: "FIELD NOTES / START WITH A HUMAN QUESTION",
    question: "“Is this experience right for me?”",
    notebookIntro:
      "A travel product page: turning a decision into a clear information structure.",
    flow: [
      ["WHO", "An international visitor discovering Shanghai"],
      ["NEED", "Understand a local experience and decide if it fits"],
      ["STRUCTURE", "Who it’s for → What happens → Reasons to trust"],
      ["OUTPUT", "An AI-assisted product-page prototype"],
    ],
    aiNote:
      "Explorations include travel pages, this portfolio, interactive applications and project knowledge systems.",
    aiLink: "Explore the travel case",
    experienceLabel: "04 / EXPERIENCE",
    experienceTitle: "A career built on curiosity.",
    experienceIntro:
      "A growing perspective across brands, technology and travel — from understanding a need to making things happen.",
    experience: [
      [
        "2026.01 — 2026.08",
        "Tieci Travel",
        "Marketing Manager · Remote",
        "Overseas creator campaigns; inbound travel research, experience design, AI-assisted product pages and social content.",
      ],
      [
        "2025.01 — 2025.12",
        "Independent",
        "Content & Campaign Planning · Shanghai",
        "Brand storytelling, creator campaigns and event delivery for Chando, Wall’s and travel projects. Helped Parallel Light gain 2,000+ early users in one month; the Hengsha Island project attracted 200+ participants and 100K+ views.",
      ],
      [
        "2024.10 — 2024.12",
        "SDG Changemaker",
        "Assistant Researcher · Remote",
        "English-language research on sustainable materials, community applications and circular economy models for international sustainable-business projects.",
      ],
      [
        "2022.01 — 2023.04",
        "Qunyu Mountain Consulting",
        "PR Director · Shanghai",
        "Established PR, content and founder-brand programmes from scratch, coordinating media, communities and brand events.",
      ],
      [
        "2020.12 — 2022.01",
        "SGAD",
        "PR Director · Shanghai",
        "Expanded consumer and technology media partnerships, developed content series and industry relationships, supported award submissions and corporate travel experiences.",
      ],
      [
        "2017.10 — 2020.10",
        "Adquan",
        "Senior Planning Manager · Shanghai",
        "Integrated campaigns and industry events. Grew Zhihu followers from 1,000 to 30,000 and a WeChat account from zero to 10,000+.",
      ],
      [
        "2015.02 — 2017.09",
        "Video++",
        "Business Manager, Live-streaming Division · Shanghai",
        "Developed platform partnerships and supported AI SaaS commercialisation, alongside creative live-streaming campaigns and client case studies.",
      ],
    ],
    educationLabel: "EDUCATION & RESEARCH",
    education: [
      [
        "2023.09 — 2024.11",
        "Lancaster University",
        "MSc Entrepreneurship and Innovation",
        "Qualitative research into social needs in travel consumption.",
      ],
      [
        "2010.09 — 2014.07",
        "Nanchang Hangkong University · College of Science and Technology",
        "BA English",
        "",
      ],
    ],
    aboutTitle: "Get closer. Understand more.",
    about:
      "I’m drawn to travel, local food and real people. A market, a showroom or an unfamiliar neighbourhood often reveals something a desk cannot. That curiosity shapes how I work.",
    contactLabel: "05 / GET IN TOUCH",
    contactTitle: ["Every connection", "starts with a hello."],
    contactIntro:
      "A brand, a new product, or a place more people should experience — let’s talk.",
    wechat: "Connect on WeChat",
    wechatAlt: "Cheng Lu’s WeChat contact QR code",
    email: "Send an email",
    footer: "Stay curious. Make it real.",
    top: "Back to top",
    meta: "Cheng Lu | Brands, AI & Cultural Experiences",
    description:
      "Cheng Lu’s portfolio. Over a decade in brand communications and content, with work spanning global creator campaigns, events, showrooms, AI prototyping and travel experiences.",
  },
};
