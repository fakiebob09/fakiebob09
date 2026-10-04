export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Веб-дизайн' | 'Брендинг' | 'Мобильные приложения' | '3D & Графика' | 'Разработка' | string;
  year: string;
  client: string;
  role: string;
  coverImage: string;
  gallery: string[];
  description: string;
  services: string[];
  tags: string[];
  liveUrl?: string;
  featured: boolean;
  isPublished: boolean;
  order: number;
  stats?: { label: string; value: string }[];
  createdAt: number;
}

export interface ClientInquiry {
  id: string;
  name: string;
  contact: string; // telegram, email, or phone
  contactMethod: 'telegram' | 'email' | 'phone';
  projectType: string;
  budget?: string;
  message: string;
  createdAt: number;
  status: 'new' | 'in_progress' | 'replied' | 'archived';
  projectName?: string;
}

export interface AuthorProfile {
  name: string;
  role: string;
  bio: string;
  location: string;
  statusText: string;
  avatarUrl: string;
  telegram: string;
  email: string;
  phone?: string;
  behance?: string;
  github?: string;
  stats: { label: string; value: string }[];
}

export interface ProjectTemplate {
  name: string;
  category: string;
  title: string;
  subtitle: string;
  client: string;
  role: string;
  coverImage: string;
  description: string;
  services: string[];
  tags: string[];
  stats: { label: string; value: string }[];
}
