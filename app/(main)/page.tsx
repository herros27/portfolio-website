import dynamicImport from "next/dynamic";
import Intro from "@/components/intro";
import About from "@/components/about";
import SectionDivider from "@/components/ui/section-divider";
import {
  getPublicProfile,
  getPublicProjects,
  getPublicCertificates,
  getPublicExperiences,
  getPublicSkills,
  getSectionVisibility,
} from "@/lib/queries";

// Dynamic imports for below-the-fold sections to reduce initial bundle
const Certificates = dynamicImport(() => import("@/components/certificates"), {
  loading: () => <SectionSkeleton />,
});
const Projects = dynamicImport(() => import("@/components/projects"), {
  loading: () => <SectionSkeleton />,
});
const Skills = dynamicImport(() => import("@/components/skills"), {
  loading: () => <SectionSkeleton />,
});
const Experience = dynamicImport(() => import("@/components/experience"), {
  loading: () => <SectionSkeleton />,
});
const Contact = dynamicImport(() => import("@/components/contact"), {
  loading: () => <SectionSkeleton />,
});

// Minimal loading skeleton
function SectionSkeleton() {
  return (
    <div className='w-full max-w-4xl mx-auto py-16 px-4'>
      <div className='animate-pulse'>
        <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto mb-6' />
        <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-8' />
        <div className='space-y-4'>
          <div className='h-32 bg-gray-200 dark:bg-gray-700 rounded' />
          <div className='h-32 bg-gray-200 dark:bg-gray-700 rounded' />
        </div>
      </div>
    </div>
  );
}

// Force dynamic rendering to prevent build-time database access
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch all data from database including section visibility
  const [profile, projects, certificates, experiences, skills, visibility] = await Promise.all([
    getPublicProfile(),
    getPublicProjects(),
    getPublicCertificates(),
    getPublicExperiences(),
    getPublicSkills(),
    getSectionVisibility(),
  ]);

  // Default visibility is true if not set
  const isVisible = (section: string) => visibility[section] !== false;

  return (
    <main className='flex flex-col items-center'>
      {isVisible("intro") && (
        <>
          <Intro profile={profile} />
          <SectionDivider />
        </>
      )}
      
      {isVisible("about") && (
        <>
          <About profile={profile} />
          <SectionDivider />
        </>
      )}
      
      {isVisible("certificates") && (
        <>
          <Certificates certificates={certificates} />
          <SectionDivider />
        </>
      )}
      
      {isVisible("projects") && (
        <>
          <Projects projects={projects} />
          <SectionDivider />
        </>
      )}
      
      {isVisible("skills") && (
        <>
          <Skills skills={skills} />
          <SectionDivider />
        </>
      )}
      
      {isVisible("experience") && (
        <>
          <Experience experiences={experiences} />
        </>
      )}
      
      {isVisible("contact") && (
        <Contact profile={profile} />
      )}
    </main>
  );
}
