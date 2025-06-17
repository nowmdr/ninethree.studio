import localFont from "next/font/local";

export const SlussenMedium = localFont({
  src: [
    {
      path: "./Slussen-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-slussen-medium",
});

export const SlussenMonoMedium = localFont({
  src: [
    {
      path: "./Slussen-Mono-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-slussen-mono-medium",
});
