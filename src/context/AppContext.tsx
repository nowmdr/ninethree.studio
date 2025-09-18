"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { projects } from "@/data/projects";

// Определяем интерфейс для нашего состояния
interface AppState {
  currentProjectIndex: number;
  setCurrentProjectIndex: (index: number) => void;

  animationOpened: boolean;
  setAnimationOpened: (opened: boolean) => void;

  isAnimating: boolean;
  setIsAnimating: (animating: boolean) => void;

  isScrollLocked: boolean;
  setIsScrollLocked: (locked: boolean) => void;
}

// Создаем контекст с типом AppState
const AppContext = createContext<AppState | undefined>(undefined);

// Создаем провайдер компонент
export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Добавляем первую переменную - индекс текущего проекта
  const [currentProjectIndex, setCurrentProjectIndex] = useState(
    Math.floor(projects.length / 2)
  );
  const [animationOpened, setAnimationOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  // Возвращаем провайдер с нашим состоянием
  return (
    <AppContext.Provider
      value={{
        currentProjectIndex,
        setCurrentProjectIndex,
        animationOpened,
        setAnimationOpened,
        isAnimating,
        setIsAnimating,
        isScrollLocked,
        setIsScrollLocked,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Создаем хук для удобного использования контекста
export const useAppContext = () => {
  const context = useContext(AppContext);

  // Проверяем, что хук используется внутри провайдера
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
