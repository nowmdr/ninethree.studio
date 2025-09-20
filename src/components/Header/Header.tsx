"use client";

import Link from "next/link";
import { OpenHours } from "../OpenHours/OpenHours";
import styles from "./header.module.css";
import { useAppContext } from "@/context/AppContext";
import { usePathname } from "next/navigation";
export const Header = () => {
  const { animationOpened, currentProjectIndex, isAnimating } = useAppContext();
  const pathname = usePathname();
  return (
    <header className={styles.header}>
      <h2 className={styles.headerTitle}>Ninethree Studio</h2>
      <nav className={styles.nav}>
        <Link
          className={`${styles.navLink} ${
            pathname === "/" ? styles.navLinkActive : ""
          }`}
          href="/"
        >
          Index
        </Link>
        <Link
          className={`${styles.navLink} ${
            pathname === "/studio/" ? styles.navLinkActive : ""
          }`}
          href="/studio"
        >
          Studio
        </Link>
      </nav>
      {/* <div className={styles.contextInfo}>
        <p>Animation Opened: {String(animationOpened)}</p>
        <p>Current Project Index: {currentProjectIndex}</p>
        <p>Is Animating: {String(isAnimating)}</p>
      </div> */}
      {/* <div className={styles.lineContainer}></div> */}
      <OpenHours />
    </header>
  );
};
