import Header from "@/components/header";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import SplashProvider from "@/components/providers/splash-provider";
import { getSectionVisibility } from "@/lib/queries";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LazyMotion, domAnimation } from "framer-motion";
// Lazy load non-critical UI components to reduce initial JS bundle
const SmoothCursor = dynamic(() =>
  import("@/components/ui/smooth-cursor").then((m) => m.SmoothCursor)
);
const ProgressiveBlur = dynamic(() =>
  import("@/components/magicui/progressive-blur").then(
    (m) => m.ProgressiveBlur
  )
);
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch section visibility for the header
  const visibility = await getSectionVisibility();

  return (
    <LazyMotion features={domAnimation}>  
    <div className='main-portfolio bg-gray-50 text-gray-950 relative pt-0 md:pt-26 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90'>
      <SpeedInsights />
      <SplashProvider>
        <div className='bg-[#fbe2e3] absolute -top-24 -z-10 right-44 h-125 w-125 rounded-full blur-[10rem] sm:w-275 dark:bg-[#946263]'></div>
        <div className='bg-[#dbd7fb] absolute -top-4 -z-10 -left-140 h-125 w-200 rounded-full blur-[10rem] sm:w-275 md:-left-132 lg:-left-112 xl:-left-60 2xl:-left-20 dark:bg-[#676394]'></div>

        <div className='relative h-full w-full overflow-auto'>
          {/* Your scrollable content */}
          <div className='p-4 space-y-4 overflow-x-hidden'>
            <ThemeContextProvider>
              <ActiveSectionContextProvider>
                <Header visibility={visibility} />
                {children}
                <Footer />

                <Toaster position='top-right' />
                <ThemeSwitch />
              </ActiveSectionContextProvider>
            </ThemeContextProvider>
          </div>

          <ProgressiveBlur
            className='pointer-events-none'
            height='20%'
            position='top'
            blurLevels={[2, 4, 8]}
          />
        </div>
        <SmoothCursor />
      </SplashProvider>
    </div>
    </LazyMotion>
  );
}
