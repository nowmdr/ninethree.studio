"use client";

import { useEffect, useState } from "react";
import styles from "./openHours.module.css";

// Working hours configuration
const WORKING_HOURS = {
  start: 9, // 9 AM
  end: 17, // 5 PM
  days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
};

export const OpenHours = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const day = now.toLocaleDateString("en-US", { weekday: "long" });

      // Format time as 9:06 PM
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      // Check if current day is working day
      const isWorkingDay = WORKING_HOURS.days.includes(day);

      // Check if current time is within working hours
      const isWithinHours =
        hours >= WORKING_HOURS.start && hours < WORKING_HOURS.end;

      setCurrentTime(formattedTime);
      setIsOpen(isWorkingDay && isWithinHours);
    };

    // Update immediately and then every minute
    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.openHours}>
      <span className={styles.openHoursText}>
        {isOpen ? "Open_" : "Closed_"}
      </span>
      <span className={styles.openHoursTime}>{currentTime}</span>
    </div>
  );
};
