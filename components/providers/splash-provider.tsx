// components/providers/splash-provider.tsx
"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import SplashScreen from "@/components/splash-screen";
import { AnimatePresence } from "framer-motion";
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=420&h=300&fit=crop&auto=format&q=50",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=420&h=300&fit=crop&auto=format&q=50",
  // Tambahkan URL gambar lain sesuka hati
];
// 1. Buat Context
const ImageContext = createContext<string[]>([]);

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
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    setIsMounted(true);

    const fetchImages = async () => {
      // 1. Cek dulu di Session Storage (Cache sederhana)
      // Agar saat refresh browser, kuota API tidak berkurang
      const cachedImages = sessionStorage.getItem("marquee_images");
      if (cachedImages) {
        setImages(JSON.parse(cachedImages));
        return;
      }

      try {
        const res = await fetch(
          "https://api.unsplash.com/photos/random?count=30&client_id=Vke3mS727zZ9UUD-1q35lIOjX4y29RM4hShA1BFVZGE"
        );

        // 2. Cek apakah response sukses (Status 200-299)
        if (!res.ok) {
          // Jika error 403/429 (Rate Limit), lempar error agar masuk ke catch
          throw new Error(`API Error: ${res.status}`);
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          const urls = data.map(
            (photo: any) =>
              `${photo.urls.raw}&w=420&h=300&fit=crop&auto=format&q=50`
          );
          setImages(urls);
          // Simpan ke session storage
          sessionStorage.setItem("marquee_images", JSON.stringify(urls));
        }
      } catch (error) {
        console.warn(
          "Gagal load Unsplash (mungkin limit habis), pakai gambar cadangan."
        );
        // 3. Gunakan gambar cadangan agar web tidak crash
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
