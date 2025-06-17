"use client";

import Link from "next/link";
import { OpenHours } from "../OpenHours";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <h2>Ninethree Studio</h2>
      <nav>
        <Link href="/">Index</Link>
        <Link href="/studio">Studio</Link>
      </nav>
      <OpenHours />
    </header>
  );
};
