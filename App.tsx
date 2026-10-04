/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Project, AuthorProfile, ClientInquiry, ProjectTemplate } from './types/portfolio';
import { StorageService } from './services/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioGrid } from './components/PortfolioGrid';
import { ProjectModal } from './components/ProjectModal';
import { ProjectEditorModal } from './components/ProjectEditorModal';
import { AdminModal } from './components/AdminModal';
import { AboutAndServices } from './components/AboutAndServices';
import { InquiryModal } from './components/InquiryModal';
import { Footer } from './components/Footer';
import { LivingBackground } from './components/LivingBackground';
import { motion, useScroll } from 'motion/react';
import { Send, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [projects, setProjects] = useState<Project[]>(() => StorageService.getProjects());
  const [profile, setProfile] = useState<AuthorProfile>(() => StorageService.getProfile());
  const [inquiries, setInquiries] = useState<ClientInquiry[]>(() => StorageService.getInquiries());
  const { scrollYProgress } = useScroll();

  // Session-based admin state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('portfolio_is_admin') === 'true';
  });

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryProjectName, setInquiryProjectName] = useState<string | undefined>(undefined);

  // Sync admin state with sessionStorage
  const handleSetIsAdmin = (val: boolean) => {
    setIsAdmin(val);
    sessionStorage.setItem('portfolio_is_admin', val ? 'true' : 'false');
  };

  // Reload data from storage
  const reloadData = () => {
    setProjects(StorageService.getProjects());
    setProfile(StorageService.getProfile());
    setInquiries(StorageService.getInquiries());
  };

  // Project Actions
  const handleSaveProject = (projectData: Project) => {
    if (projectToEdit) {
      const updated = StorageService.updateProject(projectData);
      setProjects(updated);
    } else {
      const updated = StorageService.addProject(projectData);
      setProjects(updated);
    }
    setIsEditorOpen(false);
    setProjectToEdit(null);
  };

  const handleDeleteProject = (id: string) => {
    const updated = StorageService.deleteProject(id);
    setProjects(updated);
    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }
  };

  const handleDuplicateProject = (id: string) => {
    const updated = StorageService.duplicateProject(id);
    setProjects(updated);
  };

  const handleReorderProject = (id: string, direction: 'up' | 'down') => {
    const updated = StorageService.reorderProject(id, direction);
    setProjects(updated);
  };

  const handleTogglePublished = (project: Project) => {
    const updatedProject = { ...project, isPublished: !project.isPublished };
    const updated = StorageService.updateProject(updatedProject);
    setProjects(updated);
  };

  const handleToggleFeatured = (project: Project) => {
    const updatedProject = { ...project, featured: !project.featured };
    const updated = StorageService.updateProject(updatedProject);
    setProjects(updated);
  };

  const handleAddNewProject = () => {
    setProjectToEdit(null);
    setIsEditorOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setProjectToEdit(project);
    setIsEditorOpen(true);
  };

  const handleApplyTemplate = (tpl: ProjectTemplate) => {
    const newProj: Project = {
      id: 'proj-' + Date.now(),
      title: tpl.title,
      subtitle: tpl.subtitle,
      category: tpl.category,
      year: new Date().getFullYear().toString(),
      client: tpl.client,
      role: tpl.role,
      coverImage: tpl.coverImage,
      gallery: [],
      description: tpl.description,
      services: tpl.services,
      tags: tpl.tags,
      featured: false,
      isPublished: true,
      order: 1,
      stats: tpl.stats,
      createdAt: Date.now()
    };
    setProjectToEdit(newProj);
    setIsEditorOpen(true);
  };

  // Profile Action
  const handleUpdateProfile = (newProfile: AuthorProfile) => {
    StorageService.saveProfile(newProfile);
    setProfile(newProfile);
  };

  // Inquiry Actions
  const handleSubmitInquiry = (data: Omit<ClientInquiry, 'id' | 'createdAt' | 'status'>) => {
    StorageService.addInquiry(data);
    setInquiries(StorageService.getInquiries());
  };

  const handleUpdateInquiryStatus = (id: string, status: ClientInquiry['status']) => {
    const updated = StorageService.updateInquiryStatus(id, status);
    setInquiries(updated);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = StorageService.deleteInquiry(id);
    setInquiries(updated);
  };

  const handleResetToDemo = () => {
    StorageService.resetToDemo();
    reloadData();
    alert('Портфолио успешно сброшено к исходным демонстрационным проектам.');
  };

  return (
    <div className="min-h-screen bg-transparent text-[#f5eee8] flex flex-col selection:bg-[#c14a38] selection:text-white font-sans relative">
      {/* Living Background */}
      <LivingBackground />

      {/* Top Bar following 3-zone contract with motion */}
      <Navbar
        profile={profile}
        isAdmin={isAdmin}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenInquiry={() => {
          setInquiryProjectName(undefined);
          setIsInquiryModalOpen(true);
        }}
      />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <Hero
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
          onOpenInquiry={() => {
            setInquiryProjectName(undefined);
            setIsInquiryModalOpen(true);
          }}
          isAdmin={isAdmin}
          onOpenAdmin={() => setIsAdminModalOpen(true)}
        />

        {/* Portfolio Bento Grid */}
        <PortfolioGrid
          projects={projects}
          isAdmin={isAdmin}
          onSelectProject={(project) => setSelectedProject(project)}
          onEditProject={handleEditProject}
          onAddNewProject={handleAddNewProject}
          onTogglePublished={handleTogglePublished}
          onToggleFeatured={handleToggleFeatured}
        />

        {/* Services, Philosophy & Verified Proof */}
        <AboutAndServices
          profile={profile}
          onOpenInquiry={() => {
            setInquiryProjectName(undefined);
            setIsInquiryModalOpen(true);
          }}
        />

        {/* Formal Contact Card before Footer */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-900"
        >
          <div className="p-6 sm:p-10 md:p-12 bg-zinc-950/80 border border-zinc-800 rounded-none flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-2.5 max-w-xl">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                СВЯЗЬ И СОТРУДНИЧЕСТВО
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase tracking-tight">
                Готовы обсудить проект?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                Напишите напрямую в Telegram или заполните краткий бриф — отвечу в течение дня, обсудим формат работы, задачи и сроки.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://t.me/fakiebob09"
                target="_blank"
                rel="noreferrer"
                className="min-h-[46px] px-6 py-3 text-xs font-bold font-mono uppercase tracking-wider text-white bg-[#e11d48] hover:bg-[#be123c] border border-black shadow-[3px_3px_0px_#000000] transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <Send className="w-4 h-4" />
                <span>Написать в Telegram</span>
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setInquiryProjectName(undefined);
                  setIsInquiryModalOpen(true);
                }}
                className="min-h-[46px] px-6 py-3 text-xs font-bold font-mono uppercase tracking-wider text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 transition-colors flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <span>Заполнить бриф</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        isAdmin={isAdmin}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onReplayIntro={() => setShowIntro(true)}
      />

      {/* Fullscreen Case Study & Lightbox Modal with Rich Descriptions */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenInquiryForProject={(projectName) => {
          setInquiryProjectName(projectName);
          setIsInquiryModalOpen(true);
        }}
        isAdmin={isAdmin}
        onEditProject={handleEditProject}
      />

      {/* 1-Click Project Editor & Upload Modal */}
      {isEditorOpen && (
        <ProjectEditorModal
          projectToEdit={projectToEdit}
          onSave={handleSaveProject}
          onClose={() => {
            setIsEditorOpen(false);
            setProjectToEdit(null);
          }}
        />
      )}

      {/* Admin Panel Modal / Command Center */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        projects={projects}
        profile={profile}
        inquiries={inquiries}
        isAdmin={isAdmin}
        setIsAdmin={handleSetIsAdmin}
        onAddNewProject={() => {
          setIsAdminModalOpen(false);
          handleAddNewProject();
        }}
        onApplyTemplate={(tpl) => {
          setIsAdminModalOpen(false);
          handleApplyTemplate(tpl);
        }}
        onEditProject={(project) => {
          setIsAdminModalOpen(false);
          handleEditProject(project);
        }}
        onDeleteProject={handleDeleteProject}
        onDuplicateProject={handleDuplicateProject}
        onReorderProject={handleReorderProject}
        onTogglePublished={handleTogglePublished}
        onToggleFeatured={handleToggleFeatured}
        onUpdateProfile={handleUpdateProfile}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
        onDeleteInquiry={handleDeleteInquiry}
        onResetToDemo={handleResetToDemo}
        onDataImported={reloadData}
      />

      {/* Quick Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        projectName={inquiryProjectName}
        onClose={() => {
          setIsInquiryModalOpen(false);
          setInquiryProjectName(undefined);
        }}
        onSubmitInquiry={handleSubmitInquiry}
      />
    </div>
  );
}
