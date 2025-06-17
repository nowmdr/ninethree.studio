import Image from "next/image";
import styles from "./page.module.css";
import { ProjectsCarousel } from "@/components/ProjectsCarousel/ProjectsCarousel";

export default function Home() {
  return <ProjectsCarousel />;
}
