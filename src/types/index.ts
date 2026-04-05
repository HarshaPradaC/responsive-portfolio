export interface Education {
  institution: string;
  degree: string;
  score: string;
  period: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  items: string[];
}

export interface OperationDetail {
  name: string;
  codename: string;
  description: string;
  bullets: string[];
}

export interface Experience {
  organization: string;
  location: string;
  role: string;
  period: string;
  status: 'ACTIVE' | 'COMPLETED';
  operations: OperationDetail[];
}

export interface Project {
  patentNo: string;
  title: string;
  hours: string;
  techStack: string[];
  abstract: string;
  bullets: string[];
  link?: string;
}

export interface Achievement {
  type: 'hackathon' | 'publication' | 'certification';
  title: string;
  detail: string;
  date?: string;
  badge?: string;
}
