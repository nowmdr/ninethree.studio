"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import styles from "./projectsCarousel.module.css";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import { Project } from "@/types/types";
import { useAppContext } from "@/context/AppContext";

export const ProjectsCarousel = () => {
  const router = useRouter();
  const {
    currentProjectIndex,
    setCurrentProjectIndex,
    isAnimating,
    setIsAnimating,
  } = useAppContext();
  const { animationOpened, setAnimationOpened } = useAppContext();
  const [projectsOrder, setProjectsOrder] = useState(() => {
    return [...projects, ...projects];
  });
  const [globalIndex, setGlobalIndex] = useState(() => {
    return currentProjectIndex;
  });
  const [duplicateCardIndex, setDuplicateCardIndex] = useState(0);

  const wheelDeltaRef = useRef(0);
  const carouselRef = useRef<HTMLUListElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const test = useRef(false);
  const [isCardActive, setIsCardActive] = useState(true);
  let scrollTimeout: NodeJS.Timeout;

  const SLIDES_COUNT = projects.length;
  const TOTAL_SLIDES = projectsOrder.length;
  const CARD_WIDTH = 254;
  const CARD_WIDTH_ACTIVE = 304;
  const GAP = 10;
  const RESET_THRESHOLD = 3;
  const transitionDuration = 0.4;
  const transitionTimeout = transitionDuration * 1000;
  const throttleDelay = transitionTimeout * 0.5;
  const isAnimatingRef = useRef(false);
  const isAnimationIsFirstTimeRef = useRef(true);

  const calculateTransformPosition = (index: number) => {
    if (!carouselContainerRef.current) return 0;
    const diff = CARD_WIDTH_ACTIVE - CARD_WIDTH;
    const containerWidth = carouselContainerRef.current.offsetWidth;
    const leftCornerPosition = index * (CARD_WIDTH + GAP);
    const containerFreeSpace = (containerWidth - CARD_WIDTH) / 2 - diff * 1.5;
    return leftCornerPosition - containerFreeSpace;
  };
  const moveCarousel = (position: number) => {
    if (!carouselRef.current) return;

    if (isAnimatingRef.current || isAnimationIsFirstTimeRef.current) {
      carouselRef.current.style.transform = `translateX(${-position}px)`;
      isAnimatingRef.current = false;
      isAnimationIsFirstTimeRef.current = false;
    } else {
      carouselRef.current.style.transition = `transform ${transitionDuration}s ease-in-out`;
      carouselRef.current.style.transform = `translateX(${-position}px)`;
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.transition = `unset`;
        }
      }, transitionTimeout);
    }
    setCurrentProjectIndex(globalIndex);
  };

  const checkDelta = () => {
    if (wheelDeltaRef.current === 0) return;
    test.current = true;
    setIsAnimating(false);

    setGlobalIndex((prevIndex) => {
      let newIndex = prevIndex + (wheelDeltaRef.current > 0 ? 1 : -1);
      if (newIndex === RESET_THRESHOLD) {
        isAnimatingRef.current = true;
        moveCarousel(calculateTransformPosition(prevIndex + SLIDES_COUNT));
        newIndex = newIndex + SLIDES_COUNT;
      }
      if (newIndex === TOTAL_SLIDES - RESET_THRESHOLD) {
        isAnimatingRef.current = true;
        moveCarousel(calculateTransformPosition(prevIndex - SLIDES_COUNT));
        newIndex = newIndex - SLIDES_COUNT;
      }
      return newIndex;
    });
  };
  const getCurrentIndex = () => {
    const zeroBasedIndex =
      ((globalIndex % SLIDES_COUNT) + SLIDES_COUNT) % SLIDES_COUNT;
    return zeroBasedIndex + 1;
  };
  const getCurrentProjectName = () => {
    return projects[getCurrentIndex() - 1].title;
  };

  const handleCardClick = (project: Project) => {
    if (isAnimating) return;
    test.current = true;
    setIsAnimating(true);

    // setAnimationOpened(true);
    setTimeout(() => {
      // setIsAnimating(false);
      router.push(`/projects/${project.slug}`);
    }, 300);
  };
  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();

    const delta = event.deltaY;
    wheelDeltaRef.current = delta;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      wheelDeltaRef.current = 0;
    }, transitionTimeout);

    if (test.current) return;

    checkDelta();
  };
  const getDuplicateCardIndex = (cardGlobalIndex: number) => {
    // If the card is in the first half (original projects), duplicate is in second half
    if (cardGlobalIndex < SLIDES_COUNT) {
      return cardGlobalIndex + SLIDES_COUNT;
    }
    // If the card is in the second half (duplicates), original is in first half
    else {
      return cardGlobalIndex - SLIDES_COUNT;
    }
  };

  useEffect(() => {
    moveCarousel(calculateTransformPosition(globalIndex));
    setDuplicateCardIndex(getDuplicateCardIndex(globalIndex));
  }, [globalIndex]);

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className={styles.carouselContainer} ref={carouselContainerRef}>
      <nav
        className={`${styles.carouselNav} ${
          isAnimating ? styles.carouselNavActive : ""
        }`}
      >
        <p
          className={`${styles.carouselNavText} ${
            styles.carouselNavTextProjectName
          } ${isAnimating ? styles.carouselNavTextProjectNameActive : ""}`}
        >
          {getCurrentProjectName()}
        </p>
        <p
          className={`${styles.carouselNavText} ${
            styles.carouselNavTextProjectCounter
          } ${isAnimating ? styles.carouselNavTextProjectCounterActive : ""}`}
        >
          {getCurrentIndex()}/{SLIDES_COUNT}
        </p>
      </nav>
      <ul
        onTransitionEnd={(e) => {
          if (e.propertyName === "transform") {
            test.current = false;
          }
        }}
        className={styles.projectsList}
        ref={carouselRef}
        style={{
          gap: `${GAP}px`,
          height: `304px`,
        }}
      >
        {projectsOrder.map((project, idx) => (
          <ProjectCard
            key={project.id + "-" + idx}
            project={project}
            index={idx}
            globalIndex={globalIndex}
            duplicateCardIndex={duplicateCardIndex}
            isCardActive={isCardActive}
            onCardClick={handleCardClick}
          />
        ))}
      </ul>
    </div>
  );
};
