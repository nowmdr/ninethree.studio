"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type DeviceType = "mobile" | "tablet" | "desktop" | "ultrawide";
type InputType = "touch" | "mouse" | "both";

interface DeviceContextProps {
  deviceType: DeviceType;
  inputType: InputType;
  hasTouch: boolean;
  hasMouse: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isUltrawide: boolean;
}

const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
};

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
  const [inputType, setInputType] = useState<InputType>("mouse");
  const [hasTouch, setHasTouch] = useState(false);
  const [hasMouse, setHasMouse] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isUltrawide, setIsUltrawide] = useState(false);

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Определяем возможности ввода
      const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const mouse = window.matchMedia("(pointer: fine)").matches;
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

      // Определяем тип устройства по User Agent
      const userAgent = navigator.userAgent;
      const mobile =
        /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent
        );
      const tablet =
        /iPad|Android(?!.*Mobile)/i.test(userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

      // Определяем тип устройства по размеру экрана
      let newDeviceType: DeviceType = "desktop";

      if (width >= 3440 && height >= 1440) {
        // Ультраширокие экраны (21:9, 32:9 и выше)
        newDeviceType = "ultrawide";
      } else if (width <= 768) {
        newDeviceType = "mobile";
      } else if (width <= 1024 || tablet) {
        newDeviceType = "tablet";
      } else {
        newDeviceType = "desktop";
      }

      // Определяем тип ввода
      let newInputType: InputType = "mouse";
      if (touch && mouse) {
        newInputType = "both";
      } else if (touch) {
        newInputType = "touch";
      }

      // Обновляем все состояния
      setDeviceType(newDeviceType);
      setInputType(newInputType);
      setHasTouch(touch);
      setHasMouse(mouse);
      setIsMobile(mobile);
      setIsTablet(tablet);
      setIsDesktop(!mobile && !tablet && newDeviceType === "desktop");
      setIsUltrawide(newDeviceType === "ultrawide");

      console.log("Device Info:", {
        deviceType: newDeviceType,
        inputType: newInputType,
        width,
        height,
        touch,
        mouse,
        mobile,
        tablet,
      });
    };

    updateDeviceInfo();

    // Слушаем изменения размера экрана
    window.addEventListener("resize", updateDeviceInfo);

    // Слушаем изменения медиа-запросов
    const mediaQueries = [
      window.matchMedia("(max-width: 768px)"),
      window.matchMedia("(min-width: 769px) and (max-width: 1024px)"),
      window.matchMedia("(min-width: 1025px) and (max-width: 3439px)"),
      window.matchMedia("(min-width: 3440px)"),
      window.matchMedia("(pointer: fine)"),
      window.matchMedia("(pointer: coarse)"),
    ];

    const handleMediaChange = () => updateDeviceInfo();
    mediaQueries.forEach((mq) =>
      mq.addEventListener("change", handleMediaChange)
    );

    return () => {
      window.removeEventListener("resize", updateDeviceInfo);
      mediaQueries.forEach((mq) =>
        mq.removeEventListener("change", handleMediaChange)
      );
    };
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        deviceType,
        inputType,
        hasTouch,
        hasMouse,
        isMobile,
        isTablet,
        isDesktop,
        isUltrawide,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
