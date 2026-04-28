import type { Education, SkillCategory, Experience, Project, Achievement } from '../types';

export const profile = {
  name: 'Harsha Prada Chandrakumar',
  fileNumber: 'HPC-2025-042',
  clearanceLevel: 'PUBLIC',
  title: 'AI Engineer & Full-Stack Developer',
  roles: ['AI Engineer', 'Full-Stack Developer', 'Problem Solver'],
  contact: {
    phone: '+91 9626666297',
    email: 'harshapradac@gmail.com',
  },
  social: {
    github: 'https://github.com/HarshaPradaC',
    linkedin: 'https://www.linkedin.com/in/harsha-prada-chandrakumar-94109528b',
    leetcode: 'https://leetcode.com/u/Harsha_Prada_Chandrakumar/',
    codechef: 'https://www.codechef.com/users/harshacrux',
  },
  resumeUrl: 'https://drive.google.com/file/d/1fL8rWIep_4KQzIeyB_v9kgjcN9tI5aYP/view?usp=sharing',
  about: `I’m Harsha Prada Chandrakumar, an AI Engineer and Full-Stack Developer currently pursuing a B.Tech in Artificial Intelligence and Data Science at Kumaraguru College of Technology. I build intelligent, user-centric applications by combining strong foundations in web development, AI/ML, and data-driven systems.

My work spans across fintech platforms, AI-powered resume systems, and medical image segmentation—each project driven by a focus on solving real-world problems with scalable and thoughtful solutions. As an active member of the IEEE Computer Society and a regular hackathon participant, I thrive in fast-paced, collaborative environments.

I’m particularly interested in exploring how Generative AI can enable smarter, context-aware systems across applications and agents.`,
};

export const education: Education[] = [
  {
    institution: 'Kumaraguru College of Technology',
    degree: 'B.Tech in Artificial Intelligence and Data Science',
    score: '9.32 GPA',
    period: 'Sept 2023 — May 2027',
  },
  {
    institution: 'Bharini Vidhyalaya Senior Secondary School',
    degree: 'Higher Secondary Education (CBSE)',
    score: '97.4%',
    period: 'May 2023',
  },
  {
    institution: 'Bharini Vidhyalaya Senior Secondary School',
    degree: 'Senior Secondary Education (CBSE)',
    score: '94.8%',
    period: 'May 2021',
  },
];

export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    icon: '{ }',
    items: ['Python', 'SQL', 'JavaScript', 'C++'],
  },
  {
    category: 'Full-Stack',
    icon: '< />',
    items: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'Django'],
  },
  {
    category: 'Databases',
    icon: '[ ]',
    items: ['MongoDB', 'SQLite', 'MySQL', 'Firebase', 'PostgreSQL'],
  },
  {
    category: 'Dev Tools',
    icon: '> _',
    items: ['Git', 'GitHub', 'Docker', 'Netlify', 'Vercel', 'Termius', 'Sentry'],
  },
  {
    category: 'ML / Deep Learning',
    icon: '::',
    items: ['Regression', 'Classification', 'Clustering', 'CNNs', 'LSTMs', 'YOLO'],
  },
  {
    category: 'AI / ML Tools',
    icon: '##',
    items: ['TensorFlow', 'Scikit-learn', 'OpenCV', 'NumPy', 'Pandas'],
  },
  {
    category: 'Generative AI',
    icon: '**',
    items: ['Prompt Engineering', 'Diffusion Models', 'LLMs'],
  },
  {
    category: 'Problem Solving',
    icon: '??',
    items: ['Data Structures & Algorithms', 'CodeChef', 'LeetCode'],
  },
];

export const experience: Experience[] = [
  {
    organization: 'Samsung Prism Research',
    location: 'Coimbatore, IN',
    role: 'AI Research Engineer Intern',
    period: 'Feb 2025 — Present',
    status: 'ACTIVE',
    operations: [
      {
        name: 'Cross-Agent Contextual Intelligence',
        codename: 'PRISM',
        description: 'Multi-agent conversational system for context-aware collaboration',
        bullets: [
          'Built autonomous agents using LangChain, LangGraph, CrewAI, AstraDB',
          'Integrated RAG pipeline with real-time Wiki search for knowledge grounding',
          'Explored LLM orchestration, multi-agent coordination, memory architectures',
        ],
      },
    ],
  },
  {
    organization: 'iQube Innovation Centre',
    location: 'Coimbatore, IN',
    role: 'Web Developer — Level 2 Technical Member',
    period: 'Oct 2024 — Present',
    status: 'ACTIVE',
    operations: [
      {
        name: 'Kash — Blockchain-Backed FinTech Platform',
        codename: 'KASH',
        description: 'Django/PostgreSQL fintech system with blockchain transaction logging',
        bullets: [
          'Designed scalable backend for 3,000+ users with blockchain transaction logging',
          'Built REST APIs and Dockerized services (75% audit effort reduction)',
          'Designed scalable backend workflows and monitoring dashboards',
        ],
      },
      {
        name: 'Yugam — Large-Scale Event Platform',
        codename: 'YUGAM',
        description: 'Django-based event system with Razorpay integration',
        bullets: [
          'Built event system for 10,000+ users across 100+ events with Razorpay integration',
          '40% backend throughput optimization using PostgreSQL tuning and Redis caching',
          'Implemented dashboards, data pipelines, WhatsApp API bot integrations',
        ],
      },
    ],
  },
  {
    organization: 'IEEE Computer Society, KCT',
    location: 'Coimbatore, IN',
    role: 'Student Member & Researcher',
    period: 'Feb 2024 — Present',
    status: 'ACTIVE',
    operations: [
      {
        name: 'Research & Publications',
        codename: 'IEEE-RES',
        description: 'Published research at IEEE-IIITDM conferences',
        bullets: [
          'Published: "Performance Analysis of Open-Source Diffusion Models for Artistic Image Generation"',
          'Published: "Multilingual Sentiment Analysis Framework for Video News Verification Using AI"',
          'Organized hackathons, ideathons, sustainathons, and AI workshops',
        ],
      },
    ],
  },
];

export const projects: Project[] = [
  {
    patentNo: 'HP-001',
    title: 'ResumeXpert — AI Resume Builder',
    hours: '~40 hours',
    techStack: ['Firebase', 'Node.js', 'Express.js', 'MongoDB', 'Gemini API', 'HTML/CSS/JS'],
    abstract: 'Smart resume builder with AI-powered content generation, dynamic sections, user authentication, and PDF export capabilities.',
    bullets: [
      'Firebase Auth for user management',
      'Gemini API for intelligent resume content generation',
      'MongoDB for persistent storage with PDF export',
    ],
    link: 'https://github.com/HarshaPradaC',
  },
  {
    patentNo: 'HP-002',
    title: 'Code Quality Review Agent',
    hours: '~24 hours',
    techStack: ['Python', 'Node.js', 'ESLint', 'Pylint', 'Radon', 'Gemini API'],
    abstract: 'Editor- and CI-ready code review automation with structured JSON reports and AI-powered suggestions.',
    bullets: [
      'Integrated ESLint, Pylint, and Radon for multi-language analysis',
      'Structured JSON output for CI pipeline integration',
      'AI-driven suggestions via Gemini API',
    ],
    link: 'https://github.com/HarshaPradaC',
  },
  {
    patentNo: 'HP-003',
    title: 'Liver Segmentation — AI for Medical Imaging',
    hours: '~24+ hours',
    techStack: ['Python', 'PyTorch', 'U-Net', 'OpenCV', 'NumPy', 'Medical Decathlon Dataset'],
    abstract: 'U-Net based deep learning pipeline for CT scan liver segmentation, built for early cancer diagnosis enhancement.',
    bullets: [
      'U-Net architecture on Medical Decathlon CT scans',
      'Built for CodHer Hackathon — finalist',
      'Focus on early diagnosis enhancement',
    ],
    link: 'https://github.com/HarshaPradaC',
  },
  {
    patentNo: 'HP-004',
    title: 'Open Day Project — College Portal',
    hours: '~12 hours',
    techStack: ['HTML', 'CSS', 'JavaScript', 'OpenStreetMap'],
    abstract: 'Responsive college portal with OpenStreetMap integration for events, departments, and campus navigation.',
    bullets: [
      'OpenStreetMap integration for campus navigation',
      'Events and department showcases',
      'Real-time web app for Open Day Hackathon',
    ],
    link: 'https://hpcopendayweb.netlify.app/',
  },
  {
    patentNo: 'HP-005',
    title: 'PosturePerfect — IoT Posture Monitor',
    hours: '~24 hours',
    techStack: ['MPU6050', 'Flex Sensor', 'RFID', 'IoT', 'Arduino'],
    abstract: 'Wearable IoT solution for real-time posture tracking and correction using sensor fusion and alerting.',
    bullets: [
      'MPU6050 + Flex Sensor for posture detection',
      'Real-time alerting system',
      'Won Best Innovation Team at Designathon',
    ],
  },
];

export const achievements: Achievement[] = [
  {
    type: 'hackathon',
    title: '2nd Place — CPP Coding Contest',
    detail: '111 Countries, 3000 Universities',
    date: 'Nov 2025',
    badge: 'SILVER',
  },
  {
    type: 'hackathon',
    title: '4th Place — IEEE Xtreme 17.0',
    detail: '120+ Countries, Top 8000 Teams',
    date: 'Oct 2024',
    badge: 'ELITE',
  },
  {
    type: 'hackathon',
    title: 'Finalist — Vision X Hackathon',
    detail: 'Source Code Analysis Project, Selected for Internship',
    date: 'Nov 2025',
    badge: 'FINALIST',
  },
  {
    type: 'hackathon',
    title: 'Finalist — ACM CodHer Hackathon',
    detail: 'Liver Segmentation Project',
    date: 'Dec 2024',
    badge: 'FINALIST',
  },
  {
    type: 'hackathon',
    title: 'Best Innovation Team — Designathon',
    detail: 'PosturePerfect Wearable',
    date: 'Nov 2024',
    badge: 'INNOVATION',
  },
  {
    type: 'publication',
    title: 'Performance Analysis of Open-Source Diffusion Models',
    detail: 'IEEE-IIITDM — Artistic Image Generation',
    badge: 'PUBLISHED',
  },
  {
    type: 'publication',
    title: 'Multilingual Sentiment Analysis Framework',
    detail: 'IEEE-IIITDM — Video News Verification Using AI',
    badge: 'PUBLISHED',
  },
  {
    type: 'certification',
    title: 'Advanced MERN Stack Development',
    detail: 'Infosys Springboard',
    badge: 'CERTIFIED',
  },
  {
    type: 'certification',
    title: 'AI & ML with Computer Vision',
    detail: 'CodHer Hackathon Certification',
    badge: 'CERTIFIED',
  },
  {
    type: 'certification',
    title: 'AICTE Virtual Internship — AI/ML',
    detail: 'Alteryx',
    badge: 'CERTIFIED',
  },
  {
    type: 'certification',
    title: 'Python Development',
    detail: 'Udemy',
    badge: 'CERTIFIED',
  },
];

export const contactFormUrl = 'https://script.google.com/macros/s/AKfycbzFPVGxI-75Ilkm2z_EMuI9ubPlp8-7dQmMzzdPiIunLPPzj3bcY1ohMdT_DfZ3zPwhTA/exec';

export const navigation = [
  { id: 'hero', label: 'COVER', fileNo: '00' },
  { id: 'about', label: 'PROFILE', fileNo: '01' },
  { id: 'skills', label: 'MANIFEST', fileNo: '02' },
  { id: 'experience', label: 'OPERATIONS', fileNo: '03' },
  { id: 'projects', label: 'PROJECTS', fileNo: '04' },
  { id: 'achievements', label: 'COMMENDATIONS', fileNo: '05' },
  { id: 'contact', label: 'CHANNEL', fileNo: '06' },
];
