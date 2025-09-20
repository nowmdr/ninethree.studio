"use client";
import { Project } from "@/types/types";
import styles from "./projectDetail.module.css";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Footer } from "../Footer/Footer";

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
  }, [router]);

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

      // Ждем завершения анимации
      await new Promise((resolve) => setTimeout(resolve, 1100)); // Увеличиваем время

      if (imageRef.current) {
        imageRef.current.style.width = "304px";
        imageRef.current.style.height = "304px";
      }
    }
  };
  const handleBackClick = async () => {
    await revertAnimation();
    router.back();
  };
  return (
    <>
      <nav className={styles.projectDetailNav}>
        <h1 className={styles.projectDetailNavTitle}>{project.title}</h1>
        <p className={styles.projectDetailNavYear}>{project.year}</p>
        <button
          className={styles.projectDetailNavButton}
          onClick={handleBackClick}
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
            objectPosition: "bottom center",
          }}
        />
        <div
          ref={projectDetailContentRef}
          className={styles.projectDetailContent}
        >
          <div className={styles.projectDetailContentInfo}>
            <h2 className={styles.projectDetailContentInfoTitle}>
              Redefining RIMAC. A fusion of design and storytelling.
            </h2>
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
                  <p>Creative direction</p>
                  <p>Visual communication</p>
                  <p>Rebranding</p>
                  <p>Website Development</p>
                </div>
                <div className={styles.projectDetailContentInfoGridItem}>
                  <h3>Recognition</h3>
                  <p>Awwwards, SOTD (2025)</p>
                  <p>Visual Journal (2025)</p>
                  <p>The Essential Design (2024)</p>
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
          <Footer />
          <div className={styles.TextSvg}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 1492 151"
              fill="none"
            >
              <path
                d="M0 151V0H48.7842L155.3 120.842V0H188.32V151H139.535L33.0198 29.7328V151H0Z"
                fill="#0D0D0D"
              />
              <path d="M205.767 151V0H238.786V151H205.767Z" fill="#0D0D0D" />
              <path
                d="M256.129 151V0H304.913L411.428 120.842V0H444.448V151H395.664L289.148 29.7328V151H256.129Z"
                fill="#0D0D0D"
              />
              <path
                d="M461.895 151V0H612.082V25.2729H494.915V63.7131H607.822V87.0745H494.915V125.727H612.082V151H461.895Z"
                fill="#0D0D0D"
              />
              <path
                d="M616.226 28.0337V0H791.977V28.0337H720.825V151H687.592V28.0337H616.226Z"
                fill="#0D0D0D"
              />
              <path
                d="M798.326 151V0H831.346V61.5893H946.17V0H979.19V151H946.17V89.4107H831.346V151H798.326Z"
                fill="#0D0D0D"
              />
              <path
                d="M991.742 151V0H1109.34C1149.81 0 1168.98 15.2911 1168.98 43.962C1168.98 64.3502 1157.91 77.73 1137.24 83.4641C1155.99 84.1013 1168.13 94.9325 1168.13 112.772V151H1134.9V117.657C1134.9 104.065 1128.93 98.5429 1115.09 98.5429H1024.76V151H991.742ZM1024.76 71.7834H1102.09C1122.97 71.7834 1134.69 65.6245 1134.69 48.8467C1134.69 31.8565 1122.97 26.7595 1102.09 26.7595H1024.76V71.7834Z"
                fill="#0D0D0D"
              />
              <path
                d="M1180.36 151V0H1330.55V25.2729H1213.38V63.7131H1326.28V87.0745H1213.38V125.727H1330.55V151H1180.36Z"
                fill="#0D0D0D"
              />
              <path
                d="M1341.81 151V0H1492V25.2729H1374.83V63.7131H1487.74V87.0745H1374.83V125.727H1492V151H1341.81Z"
                fill="#0D0D0D"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};
