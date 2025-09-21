"use client";
import styles from "./body.module.css";
import { useAppContext } from "@/context/AppContext";
import {
  SlussenMedium,
  SlussenMonoMedium,
  MonumentExtended,
} from "@/fonts/fonts";
export const Body = ({ children }: { children: React.ReactNode }) => {
  const { isScrollLocked } = useAppContext();
  return (
    <body
      className={`${styles.body} ${SlussenMedium.variable} ${
        SlussenMonoMedium.variable
      } ${MonumentExtended.variable} ${
        isScrollLocked ? styles.scrollLocked : ""
      }`}
    >
      {children}
    </body>
  );
};
