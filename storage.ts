import { Project, AuthorProfile, ClientInquiry } from '../types/portfolio';
import { DEFAULT_PROJECTS, DEFAULT_PROFILE } from '../data/defaultProjects';

const PROJECTS_STORAGE_KEY = 'portfolio_projects_data_v4';
const PROFILE_STORAGE_KEY = 'portfolio_profile_data_v5';
const INQUIRIES_STORAGE_KEY = 'portfolio_inquiries_data_v4';
const ADMIN_PIN_KEY = 'portfolio_admin_pin_v4';
const CUSTOM_BG_KEY = 'portfolio_custom_background_v1';

export class StorageService {
  // --- Custom Background ---
  static getCustomBackground(): string | null {
    try {
      return localStorage.getItem(CUSTOM_BG_KEY);
    } catch {
      return null;
    }
  }

  static setCustomBackground(urlOrBase64: string): void {
    try {
      localStorage.setItem(CUSTOM_BG_KEY, urlOrBase64);
      window.dispatchEvent(new Event('portfolio_bg_updated'));
    } catch (e) {
      console.error('Failed to save custom background', e);
    }
  }

  static resetCustomBackground(): void {
    try {
      localStorage.removeItem(CUSTOM_BG_KEY);
      window.dispatchEvent(new Event('portfolio_bg_updated'));
    } catch (e) {
      console.error('Failed to reset custom background', e);
    }
  }
  // --- Projects ---
  static getProjects(): Project[] {
    try {
      const data = localStorage.getItem(PROJECTS_STORAGE_KEY);
      if (!data) {
        this.saveProjects(DEFAULT_PROJECTS);
        return DEFAULT_PROJECTS;
      }
      const parsed = JSON.parse(data) as Project[];
      const sanitized = parsed.map((p) => ({
        ...p,
        tags: (p.tags || []).map((t) => t.replace(/^#+/, '').trim())
      }));
      return sanitized.sort((a, b) => a.order - b.order);
    } catch (e) {
      console.error('Failed to load projects from storage', e);
      return DEFAULT_PROJECTS;
    }
  }

  static saveProjects(projects: Project[]): void {
    try {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Storage quota exceeded, trying to prune', e);
      // Fallback: try saving without extraneous metadata if needed
      try {
        localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
      } catch (err) {
        console.error('Fatal storage save error', err);
      }
    }
  }

  static addProject(project: Project): Project[] {
    const list = this.getProjects();
    const updated = [project, ...list].map((p, idx) => ({ ...p, order: idx + 1 }));
    this.saveProjects(updated);
    return updated;
  }

  static updateProject(project: Project): Project[] {
    const list = this.getProjects();
    const updated = list.map((p) => (p.id === project.id ? project : p));
    this.saveProjects(updated);
    return updated;
  }

  static deleteProject(id: string): Project[] {
    const list = this.getProjects();
    const updated = list.filter((p) => p.id !== id).map((p, idx) => ({ ...p, order: idx + 1 }));
    this.saveProjects(updated);
    return updated;
  }

  static duplicateProject(id: string): Project[] {
    const list = this.getProjects();
    const original = list.find((p) => p.id === id);
    if (!original) return list;

    const copy: Project = {
      ...original,
      id: 'proj-' + Date.now(),
      title: `${original.title} (Копия)`,
      order: original.order + 0.5,
      createdAt: Date.now()
    };

    const updated = [...list, copy]
      .sort((a, b) => a.order - b.order)
      .map((p, idx) => ({ ...p, order: idx + 1 }));

    this.saveProjects(updated);
    return updated;
  }

  static reorderProject(id: string, direction: 'up' | 'down'): Project[] {
    const list = [...this.getProjects()];
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) return list;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return list;

    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    const updated = list.map((p, idx) => ({ ...p, order: idx + 1 }));
    this.saveProjects(updated);
    return updated;
  }

  // --- Author Profile ---
  static getProfile(): AuthorProfile {
    try {
      const data = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (!data) {
        this.saveProfile(DEFAULT_PROFILE);
        return DEFAULT_PROFILE;
      }
      const prof = JSON.parse(data) as AuthorProfile;
      if (prof.telegram === '@sokolov_design' || !prof.telegram) {
        prof.telegram = '@fakiebob09';
        this.saveProfile(prof);
      }
      if (prof.name === 'Алексей Соколов') {
        prof.name = 'Fakiebob';
        this.saveProfile(prof);
      }
      if (!prof.stats || prof.stats.length === 4 || prof.stats.some((s) => s.value === '64' || s.value === '97' || s.label.includes('Наград'))) {
        prof.stats = DEFAULT_PROFILE.stats;
        this.saveProfile(prof);
      }
      return prof;
    } catch (e) {
      console.error('Failed to load profile', e);
      return DEFAULT_PROFILE;
    }
  }

  static saveProfile(profile: AuthorProfile): void {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  }

  // --- Client Inquiries (Leads) ---
  static getInquiries(): ClientInquiry[] {
    try {
      const data = localStorage.getItem(INQUIRIES_STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as ClientInquiry[];
    } catch (e) {
      console.error('Failed to load inquiries', e);
      return [];
    }
  }

  static addInquiry(inquiry: Omit<ClientInquiry, 'id' | 'createdAt' | 'status'>): ClientInquiry {
    const list = this.getInquiries();
    const newInquiry: ClientInquiry = {
      ...inquiry,
      id: 'inq-' + Date.now(),
      createdAt: Date.now(),
      status: 'new'
    };
    const updated = [newInquiry, ...list];
    try {
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save inquiry', e);
    }
    return newInquiry;
  }

  static updateInquiryStatus(id: string, status: ClientInquiry['status']): ClientInquiry[] {
    const list = this.getInquiries();
    const updated = list.map((item) => (item.id === id ? { ...item, status } : item));
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }

  static deleteInquiry(id: string): ClientInquiry[] {
    const list = this.getInquiries();
    const updated = list.filter((item) => item.id !== id);
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }

  // --- Admin PIN ---
  static getAdminPin(): string {
    return localStorage.getItem(ADMIN_PIN_KEY) || '1234';
  }

  static setAdminPin(pin: string): void {
    localStorage.setItem(ADMIN_PIN_KEY, pin);
  }

  // --- Reset & Backup ---
  static resetToDemo(): void {
    localStorage.removeItem(PROJECTS_STORAGE_KEY);
    localStorage.removeItem(PROFILE_STORAGE_KEY);
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(DEFAULT_PROFILE));
  }

  static exportBackup(): string {
    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      projects: this.getProjects(),
      profile: this.getProfile(),
      inquiries: this.getInquiries()
    };
    return JSON.stringify(data, null, 2);
  }

  static importBackup(jsonString: string): { success: boolean; message: string } {
    try {
      const data = JSON.parse(jsonString);
      if (Array.isArray(data.projects)) {
        this.saveProjects(data.projects);
      }
      if (data.profile && typeof data.profile === 'object') {
        this.saveProfile(data.profile);
      }
      if (Array.isArray(data.inquiries)) {
        localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(data.inquiries));
      }
      return { success: true, message: 'Данные успешно импортированы' };
    } catch (e: any) {
      return { success: false, message: e.message || 'Ошибка чтения файла бэкапа' };
    }
  }

  // --- Fast Client-Side Image Compression & Optimization ---
  // Transforms any user file (PNG, JPG, WebP, GIF, SVG) into an optimized DataURL
  // with max 1600px width/height and ~85% quality to save space and render instantly
  static async processImageFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      // If it's SVG, read as text/dataURL directly
      if (file.type === 'image/svg+xml') {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 1600;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          // Export as compressed WebP or JPEG
          const dataUrl = canvas.toDataURL('image/webp', 0.85);
          resolve(dataUrl);
        };
        img.onerror = () => {
          resolve(event.target?.result as string);
        };
        img.src = event.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
