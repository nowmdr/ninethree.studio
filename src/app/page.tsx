"use client";
import styles from "./page.module.css";
import { ProjectsCarousel } from "@/components/ProjectsCarousel/ProjectsCarousel";
import { useAppContext } from "@/context/AppContext";

export default function Home() {
  const { animationOpened, currentProjectIndex, setAnimationOpened } =
    useAppContext();

  return (
    <>
      <ProjectsCarousel />
    </>
  );
}
