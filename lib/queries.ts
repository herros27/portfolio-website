import { prisma } from "./db";
import { unstable_cache } from "next/cache";

// Get profile for public display
export const getPublicProfile = unstable_cache(
    async () => {
        return prisma.profile.findFirst();
    },
    ["profile"],
    { tags: ["profile"] }
);

// Get published projects
export const getPublicProjects = unstable_cache(
    async () => {
        return prisma.project.findMany({
            where: {
                published: true,
                deletedAt: null,
            },
            orderBy: { order: "asc" },
        });
    },
    ["projects"],
    { tags: ["projects"] }
);

// Get experiences for timeline
export const getPublicExperiences = unstable_cache(
    async () => {
        return prisma.experience.findMany({
            where: { deletedAt: null },
            orderBy: { order: "asc" },
        });
    },
    ["experience"],
    { tags: ["experience"] }
);

// Get certificates
export const getPublicCertificates = unstable_cache(
    async () => {
        return prisma.certificate.findMany({
            where: { deletedAt: null },
            orderBy: { order: "asc" },
        });
    },
    ["certificates"],
    { tags: ["certificates"] }
);

// Get visible skills
export const getPublicSkills = unstable_cache(
    async () => {
        return prisma.skill.findMany({
            where: { visible: true },
            orderBy: { order: "asc" },
        });
    },
    ["skills"],
    { tags: ["skills"] }
);

// Get section visibility settings
export const getSectionVisibility = unstable_cache(
    async () => {
        const sections = await prisma.sectionVisibility.findMany();
        const result: Record<string, boolean> = {};
        for (const s of sections) {
            result[s.section] = s.visible;
        }
        return result;
    },
    ["sections"],
    { tags: ["sections"] }
);
