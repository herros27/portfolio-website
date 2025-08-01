import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { ProgressiveBlur } from "@/components/magicui/progressive-blur";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kemas Khairunsyah | Personal Portfolio",
  description: "Kemas is a freelancer developer with 2 years of experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth!">
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <div className="bg-[#fbe2e3] absolute -top-24 -z-10 right-44 h-125 w-125 rounded-full blur-[10rem] sm:w-275 dark:bg-[#946263]"></div>
        <div className="bg-[#dbd7fb] absolute -top-4 -z-10 -left-140 h-125 w-200 rounded-full blur-[10rem] sm:w-275 md:-left-132 lg:-left-112 xl:-left-60 2xl:-left-20 dark:bg-[#676394]"></div>

        <div className="relative h-full w-full overflow-auto">
  {/* Your scrollable content */}
          <div className="p-4 space-y-4 overflow-x-hidden">
            <ThemeContextProvider>
              <ActiveSectionContextProvider>
                <Header />
                {children}
                <Footer />

                <Toaster position="top-right" />
                <ThemeSwitch />
                <SmoothCursor />
              </ActiveSectionContextProvider>
            </ThemeContextProvider>
          </div>

          <ProgressiveBlur
            className="pointer-events-none"
            height="20%"
            position="top"
            blurLevels={[2, 4, 8]}
          />
        </div>

       
      </body>
    </html>
  );
}
