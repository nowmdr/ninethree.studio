"use client";
import { Project } from "@/types/types";
import styles from "./projectDetail.module.css";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface ProjectDetailProps {
  project: Project;
}

export const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const { animationOpened, setAnimationOpened } = useAppContext();
  const [animated, setAnimated] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const projectDetailRef = useRef<HTMLDivElement>(null);
  const projectDetailContentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const popping = useRef(false);

  useEffect(() => {
    setAnimationOpened(false);
    revealImage();
  }, []);

  useEffect(() => {
    // Добавим фейковый шаг в историю
    history.pushState({ modal: true }, "");

    const handler = (e: PopStateEvent) => {
      if (!popping.current) {
        e.preventDefault?.(); // На всякий случай
        popping.current = true;
        revertAnimation().then(() => {
          popping.current = false;
          // Делаем реальный шаг назад
          history.back();
        });
      }
    };

    window.addEventListener("popstate", handler);

    return () => {
      window.removeEventListener("popstate", handler);
      // По желанию: history.back() если надо скинуть лишний push
    };
  }, []);

  const revealImage = () => {
    // anim.current = false;
    if (imageRef.current) {
      imageRef.current.style.width = "100%";
      imageRef.current.style.height = "980px";
    }
    if (projectDetailRef.current && projectDetailContentRef.current) {
      projectDetailRef.current.style.overflow = "visible";
      projectDetailRef.current.style.marginTop = "50vh";
      projectDetailContentRef.current.style.display = "flex";
    }
  };
  const revertAnimation = async () => {
    if (imageRef.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (projectDetailRef.current && projectDetailContentRef.current) {
        projectDetailRef.current.style.overflow = "hidden";
        projectDetailRef.current.style.marginTop = "calc(100vh - 304px - 20px)";
        projectDetailContentRef.current.style.display = "none";
      }
      setTimeout(() => {
        if (imageRef.current) {
          imageRef.current.style.width = "304px";
          imageRef.current.style.height = "304px";
        }
      }, 400);
      await new Promise((resolve) => setTimeout(resolve, 700));
    }
  };
  return (
    <>
      <nav className={styles.projectDetailNav}>
        <h1 className={styles.projectDetailNavTitle}>{project.title}</h1>
        <p className={styles.projectDetailNavYear}>{project.year}</p>
        <button
          className={styles.projectDetailNavButton}
          onClick={() => router.back()}
        >
          back
        </button>
      </nav>
      <div ref={projectDetailRef} className={styles.projectDetail}>
        <img
          className={styles.projectDetailImage}
          src={project.images.main}
          alt={project.title}
          width={304}
          height={304}
          ref={imageRef}
          loading="eager"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          ref={projectDetailContentRef}
          className={styles.projectDetailContent}
        >
          <div className={styles.projectDetailContentInfo}>
            <h2>Redefining RIMAC. A fusion of design and storytelling.</h2>
            <div className={styles.projectDetailContentInfoText}>
              <p>
                Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Curabitur tempus urna at turpis
                condimentum lobortis. Ut commodo efficitur neque. Ut diam quam,
                semper iaculis condimentum ac, vestibulum eu nisl. Curabitur
                tempus urna.
              </p>
              <div className={styles.projectDetailContentInfoGrid}>
                <div className={styles.projectDetailContentInfoGridItem}>
                  <h3>Overview</h3>
                  <p>
                    Creative direction, visual communication, rebranding,
                    website
                  </p>
                </div>
                <div className={styles.projectDetailContentInfoGridItem}>
                  <h3>Recognition</h3>
                  <p>
                    Awwwards, SOTD (2025), Visual Journal (2025), The Essential
                    Design (2024)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.projectDetailContentGallery}>
            <img
              className={styles.projectDetailContentGalleryImage}
              src={project.images.gallery[0]}
              alt={project.title}
              width={1000}
              height={1000}
              loading="lazy"
              style={{ width: "100%", height: "auto" }}
            />
            <img
              className={styles.projectDetailContentGalleryImage}
              src={project.images.gallery[1]}
              alt={project.title}
              width={304}
              height={304}
              loading="lazy"
              style={{ width: "100%", height: "auto" }}
            />
            <img
              className={styles.projectDetailContentGalleryImage}
              src={project.images.gallery[0]}
              alt={project.title}
              width={304}
              height={304}
              loading="lazy"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
