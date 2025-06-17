"use client";

import { useState, useEffect, useRef } from "react";
import { projects } from "@/data/projects";
import Image from "next/image";
import styles from "./projectsCarousel.module.css";

export const ProjectsCarousel = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastScrollDelta, setLastScrollDelta] = useState(0);
  const [transformPosition, setTransformPosition] = useState(80);
  const carouselRef = useRef(null);

  // Переменная для троттлинга (текущее время последнего обновления)
  const lastUpdateTimeRef = useRef(0);
  const throttleDelay = 400; // Ограничиваем обновление каждые 200 мс

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault(); // Блокируем стандартное поведение скролла
      const now = Date.now(); // Текущее время
      const delta = event.deltaY;

      // Проверяем, прошло ли достаточно времени с последнего обновления
      if (now - lastUpdateTimeRef.current >= throttleDelay) {
        // Обновляем время последнего вызова
        lastUpdateTimeRef.current = now;

        // Сохраняем дельту для отладки
        setLastScrollDelta(delta);

        // Обновляем общую позицию скролла
        setScrollPosition((prevPosition) => prevPosition + delta);

        // Обновляем transformPosition в зависимости от дельты
        setTransformPosition(
          (prevTransformPosition) =>
            prevTransformPosition + (delta > 0 ? 254 : -254)
        );

        console.log("Дельта:", delta, "Текущее положение:", transformPosition);
      }
    };

    // Добавляем обработчик события
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [transformPosition]); // Зависимость: transformPosition

  // Эффект для применения изменения transformPosition к карусели
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${-transformPosition}px)`;
      console.log("Карусель перемещена на:", transformPosition, "px");
    }
  }, [transformPosition]);

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.debugInfo}>
        Общий скролл: {scrollPosition}
        <br />
        Последняя дельта: {lastScrollDelta}
      </div>
      <ul className={styles.projectsList} ref={carouselRef}>
        {projects.map((project) => (
          <li key={project.id} className={styles.projectItem}>
            <div>
              <Image
                src={project.images.main}
                alt={project.title}
                width={254}
                height={254}
                className={styles.projectImage}
              />
              <h3>{project.title}</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
