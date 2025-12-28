import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDivider from "@/components/ui/section-divider";
import Skills from "@/components/skills";
import Certificates from "@/components/certificates";
import {
  getPublicProfile,
  getPublicProjects,
  getPublicCertificates,
  getPublicExperiences,
  getPublicSkills,
  getSectionVisibility,
} from "@/lib/queries";

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
