export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  year: string;
  images: {
    main: string;
    gallery: string[];
  };
}
export interface ProjectCardProps {
  project: Project;
  index: number;
  globalIndex: number;
  isCardActive: boolean;
  onCardClick?: (project: Project) => void;
  duplicateCardIndex?: number;
}
