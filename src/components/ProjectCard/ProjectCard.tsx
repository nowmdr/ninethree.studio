import { ProjectCardProps } from "@/types/types";
import styles from "./projectCard.module.css";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

export const ProjectCard = ({
  project,
  index,
  globalIndex,
  isCardActive,
  onCardClick,
  duplicateCardIndex,
}: ProjectCardProps) => {
  const { animationOpened, setAnimationOpened, isAnimating, setIsAnimating } =
    useAppContext();
  const getCardClassName = () => {
    const distance = index - globalIndex;
    let baseClasses = "";

    // Active card
    if (distance === 0) {
      baseClasses = `${styles.projectItemActive} ${styles.projectItem}`;
    }
    // Left side cards (negative distance)
    else if (distance < 0) {
      const leftDistance = Math.abs(distance);
      if (leftDistance === 1) {
        baseClasses = `${styles.projectItem} ${styles.subActiveCardLeft} ${styles.subActiveCard1}`;
      } else if (leftDistance === 2) {
        baseClasses = `${styles.projectItem} ${styles.subActiveCardLeft} ${styles.subActiveCard2}`;
      } else if (leftDistance === 3) {
        baseClasses = `${styles.projectItem} ${styles.subActiveCardLeft} ${styles.subActiveCard3}`;
      } else {
        baseClasses = styles.projectItem;
      }
    }
    // Right side cards (positive distance)
    else if (distance > 0) {
      if (distance === 1) {
        baseClasses = `${styles.projectItem} ${styles.subActiveCardRight} ${styles.subActiveCard1}`;
      } else if (distance === 2) {
        baseClasses = `${styles.projectItem} ${styles.subActiveCardRight} ${styles.subActiveCard2}`;
      } else if (distance === 3) {
        baseClasses = `${styles.projectItem} ${styles.subActiveCardRight} ${styles.subActiveCard3}`;
      } else {
        baseClasses = styles.projectItem;
      }
    }
    // Default class for cards outside the 3-card range
    else {
      baseClasses = styles.projectItem;
    }

    // Добавляем анимационный класс, если анимация активна
    // и карточка находится в диапазоне 1-3 позиций от активной
    if (isAnimating && Math.abs(distance) >= 1 && Math.abs(distance) <= 3) {
      if (animationOpened) {
        // Анимация к центру
        baseClasses += ` ${styles.animateToCenter}`;
      } else {
        // Анимация возврата на место
        baseClasses += ` ${styles.animateFromCenter}`;
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      }
    }

    return baseClasses;
  };

  const handleClick = () => {
    // Only allow click on active card
    if (isCardActive && index === globalIndex && onCardClick) {
      setAnimationOpened(true);
      onCardClick(project);
    }
  };

  return (
    <li
      className={getCardClassName()}
      onClick={handleClick}
      style={{
        cursor: isCardActive && index === globalIndex ? "pointer" : "default",
      }}
    >
      <Image
        src={project.images.main}
        alt={project.title}
        className={styles.projectImage}
        priority={index === globalIndex}
        width={
          index === globalIndex || index === duplicateCardIndex ? 304 : 254
        }
        height={
          index === globalIndex || index === duplicateCardIndex ? 304 : 254
        }
      />

      {/* <h3>{project.title}</h3>
      <p>Index: {index} </p>
      <p>Global Index: {globalIndex}</p> */}
    </li>
  );
};
