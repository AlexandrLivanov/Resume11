"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExternalLink, Image as ImageIcon, X } from "lucide-react";

interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  fullDescription: string;
  role: string;
  image: string;
  links: Record<string, string>;
}

interface Category {
  id: string;
  label: string;
}

export function ProjectGallery({
  projects,
  categories,
}: {
  projects: Project[];
  categories: readonly Category[];
}) {
  const [activeCategory, setActiveCategory] = useState("event");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Category Tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? "bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white shadow-lg"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, index) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="card-hover gradient-border group cursor-pointer overflow-hidden rounded-xl"
          >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    const placeholder = document.createElement("div");
                    placeholder.className =
                      "flex h-full w-full items-center justify-center";
                    placeholder.innerHTML =
                      '<svg class="h-12 w-12 text-muted-foreground/30" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"/></svg>';
                    parent.appendChild(placeholder);
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="mb-1 font-semibold group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
          <ImageIcon className="h-12 w-12 opacity-30" />
          <p>Нет проектов в этой категории</p>
        </div>
      )}

      {/* Project Popup */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        {selectedProject && (
          <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedProject.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Роль: {selectedProject.role}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-6">
              {/* Full Image */}
              <div className="overflow-hidden rounded-xl bg-muted">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                  }}
                />
              </div>

              {/* Full Description */}
              <p className="leading-relaxed text-muted-foreground">
                {selectedProject.fullDescription}
              </p>

              {/* Links */}
              {Object.keys(selectedProject.links).length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {Object.entries(selectedProject.links).map(
                    ([key, href]) => (
                      <a
                        key={key}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white transition-all hover:scale-105"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {key === "demo" ? "Смотреть" : key}
                      </a>
                    )
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
