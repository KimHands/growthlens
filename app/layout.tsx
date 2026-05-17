import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import Toast from "@/components/Toast";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GrowthLens",
    template: "%s · GrowthLens",
  },
  description:
    "자기계발 기록 — 노이즈를 걷어내고 진짜 흐름을 본다. STL 시계열 분해로 일일 변동과 장기 트렌드를 분리해주는 모바일 앱.",
  applicationName: "GrowthLens",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "GrowthLens",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#007F5F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={beVietnamPro.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className="bg-surface-container-lowest min-h-[100dvh] font-body-md text-on-surface antialiased">
        {children}
        <Toast />
      </body>
    </html>
  );
}
