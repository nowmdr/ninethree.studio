import { Project } from "@/types/types";

// Определяем базовый путь в зависимости от окружения
const getBasePath = () => {
  if (typeof window !== "undefined") {
    // В браузере
    return window.location.hostname === "localhost" ? "" : "./";
  }
  // На сервере (SSR) - для GitHub Pages используем относительные пути
  return process.env.GITHUB_ACTIONS === "true" ? "./" : "";
};

const basePath = getBasePath();

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Project Name Home",
    slug: "project-name",
    description: "Project description",
    year: "2023",
    images: {
      main: `${basePath}images/projects/project-1/main.webp`,
      gallery: [
        `${basePath}images/projects/project-1/main.webp`,
        `${basePath}images/projects/project-1/main.webp`,
      ],
    },
  },
  {
    id: "project-2",
    title: "Project Name 2",
    slug: "project-name-2",
    description: "Project description",
    year: "2022",
    images: {
      main: `${basePath}images/projects/project-1/main.webp`,
      gallery: [
        `${basePath}images/projects/project-1/main.webp`,
        `${basePath}images/projects/project-1/main.webp`,
      ],
    },
  },
  {
    id: "project-3",
    title: "Project Name 3",
    slug: "project-name-3",
    description: "Project description",
    year: "2024",
    images: {
      main: `${basePath}images/projects/project-1/main.webp`,
      gallery: [
        `${basePath}images/projects/project-1/main.webp`,
        `${basePath}images/projects/project-1/main.webp`,
      ],
    },
  },
  {
    id: "project-4",
    title: "Project Name 4",
    slug: "project-name-4",
    description: "Project description",
    year: "2021",
    images: {
      main: `${basePath}images/projects/project-1/main.webp`,
      gallery: [
        `${basePath}images/projects/project-1/main.webp`,
        `${basePath}images/projects/project-1/main.webp`,
      ],
    },
  },
  {
    id: "project-5",
    title: "Project Name 5",
    slug: "project-name-5",
    description: "Project description",
    year: "2025",
    images: {
      main: `${basePath}images/projects/project-1/main.webp`,
      gallery: [
        `${basePath}images/projects/project-1/main.webp`,
        `${basePath}images/projects/project-1/main.webp`,
      ],
    },
  },
  {
    id: "project-6",
    title: "Project Name 6",
    slug: "project-name-6",
    description: "Project description",
    year: "2020",
    images: {
      main: `${basePath}images/projects/project-1/main.webp`,
      gallery: [
        `${basePath}images/projects/project-1/main.webp`,
        `${basePath}images/projects/project-1/main.webp`,
      ],
    },
  },
  {
    id: "project-7",
    title: "Project Name 7",
    slug: "project-name-7",
    description: "Project description",
    year: "2023",
    images: {
      main: `${basePath}images/projects/project-1/main.webp`,
      gallery: [
        `${basePath}images/projects/project-1/main.webp`,
        `${basePath}images/projects/project-1/main.webp`,
      ],
    },
  },
  {
    id: "project-8",
    title: "Project Name 8",
    slug: "project-name-8",
    description: "Project description",
    year: "2022",
    images: {
      main: `${basePath}images/projects/project-1/main.webp`,
      gallery: [
        `${basePath}images/projects/project-1/main.webp`,
        `${basePath}images/projects/project-1/main.webp`,
      ],
    },
  },
  {
    id: "project-9",
    title: "Project Name 9",
    slug: "project-name-9",
    description: "Project description",
    year: "2024",
    images: {
      main: `${basePath}images/projects/project-1/main.webp`,
      gallery: [
        `${basePath}images/projects/project-1/main.webp`,
        `${basePath}images/projects/project-1/main.webp`,
      ],
    },
  },
  {
    id: "project-10",
    title: "Project Name 10",
    slug: "project-name-10",
    description: "Project description",
    year: "2021",
    images: {
      main: `${basePath}images/projects/project-1/main.webp`,
      gallery: [
        `${basePath}images/projects/project-1/main.webp`,
        `${basePath}images/projects/project-1/main.webp`,
      ],
    },
  },
];
