// components/providers/splash-provider.tsx
"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import SplashScreen from "@/components/ui/splash-screen";
import { AnimatePresence } from "framer-motion";
const FALLBACK_URLS = [
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
];

// 1. Buat Context
const ImageContext = createContext<MarqueeImage[]>([]);
export type MarqueeImage = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const FALLBACK_IMAGES: MarqueeImage[] = Array.from(
  { length: 30 },
  (_, i) => {
    const baseUrl = FALLBACK_URLS[i % FALLBACK_URLS.length];

    return {
      id: `fallback-${i}`,
      src: `${baseUrl}?w=420&h=300&fit=crop&auto=format&fm=webp&q=40`,
      alt: "Fallback Unsplash image",
      width: 420,
      height: 300,
    };
  }
);

// Custom hook agar mudah dipanggil di Intro
export const useImages = () => useContext(ImageContext);

export default function SplashProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // State untuk menyimpan gambar
  const [images, setImages] = useState<MarqueeImage[]>([]);

 useEffect(() => {
  setIsMounted(true);

  const fetchImages = async () => {
    const cachedImages = sessionStorage.getItem("marquee_images");
    if (cachedImages) {
      setImages(JSON.parse(cachedImages));
      return;
    }

    try {
      const res = await fetch(
        "https://api.unsplash.com/photos/random?count=30&client_id=Vke3mS727zZ9UUD-1q35lIOjX4y29RM4hShA1BFVZGE",
        {
          headers: {
            "Accept-Version": "v1",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        const images = data.map((photo: any) => ({
          id: photo.id,
          alt: photo.alt_description || "Unsplash image",
          width: 420,
          height: 300,
          src: `${photo.urls.raw}&w=420&h=300&fit=crop&auto=format&fm=webp&q=40`,
        }));

        setImages(images);
        sessionStorage.setItem("marquee_images", JSON.stringify(images));
      }
    } catch (error) {
      console.warn("Gagal load Unsplash, pakai fallback.");
      setImages(FALLBACK_IMAGES);
    }
  };

  fetchImages();
}, []);


  const handleFinishLoading = () => {
    setIsLoading(false);
  };

  // Timeout pengaman (fallback jika animasi macet)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 10000); // Sesuaikan durasi (misal 5 detik cukup untuk fetch)
    return () => clearTimeout(timeout);
  }, []);

  if (!isMounted) return null;

  return (
    // 3. Bungkus Children dengan Context Provider
    <ImageContext.Provider value={images}>
      <AnimatePresence mode='wait'>
        {isLoading && (
          <SplashScreen key='splash' finishLoading={handleFinishLoading} />
        )}
      </AnimatePresence>
      {children}
    </ImageContext.Provider>
  );
}
