import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🌱 Starting database seed...");

    // Create admin user
    const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD || "admin123",
        12
    );

    const admin = await prisma.user.upsert({
        where: { email: process.env.ADMIN_EMAIL || "admin@example.com" },
        update: {},
        create: {
            email: process.env.ADMIN_EMAIL || "admin@example.com",
            password: hashedPassword,
            name: "Admin",
            role: "ADMIN",
            isActive: true,
        },
    });
    console.log(`✅ Admin user created: ${admin.email}`);

    // Create default profile
    const profile = await prisma.profile.upsert({
        where: { id: "default-profile" },
        update: {},
        create: {
            id: "default-profile",
            name: "Kemas Khairunsyah",
            title: "Full-Stack & Mobile Developer",
            bio: "A passionate developer with 2+ years of experience in building modern web and mobile applications.",
            about:
                "After graduating high school, I decided to pursue my passion for programming. I enrolled in a coding bootcamp and learned full-stack web development. My favorite part of programming is the problem-solving aspect. I love the feeling of finally figuring out a solution to a problem. My core stack is React, Next.js, Node.js, and Android/Kotlin. I am also familiar with TypeScript and PostgreSQL. I am currently looking for a full-time position as a software developer.",
            email: "contact@kemz.my.id",
            github: "https://github.com/herros27",
            linkedin: "https://linkedin.com/in/kemaskhairunsyah",
            location: "Indonesia",
        },
    });
    console.log(`✅ Profile created: ${profile.name}`);

    // Seed projects from existing data
    const projectsData = [
        {
            title: "DermaScan App",
            description:
                "This was my capstone project for Bangkit Academy. I was part of the Mobile Development team, building features and ensuring smooth mobile user experience.",
            tags: ["Android", "Kotlin", "Jetpack Compose", "Room", "Retrofit"],
            imageUrl: "/dermascan.webp",
            demoUrl: null,
            githubUrl: "https://github.com/herros27/DermaScan",
            published: true,
            order: 1,
        },
        {
            title: "CleanScape App",
            description:
                "A mobile app for managing inorganic waste, originally built for my previous organization. I implemented Firebase to handle data and authentication.",
            tags: ["Android", "Kotlin", "Firebase", "Firestore", "Firebase Auth"],
            imageUrl: "/cleanscape.webp",
            demoUrl: null,
            githubUrl: "https://github.com/herros27/CleanScape",
            published: true,
            order: 2,
        },
        {
            title: "constmg.murgung.id",
            description:
                "I worked as a FullStack Developer collaborating with a team at PT Murgung to create a project and employee management system. I built the front-end with React and the backend REST API with Laravel.",
            tags: ["React", "Laravel", "REST API", "Tailwind"],
            imageUrl: "/constMg.webp",
            demoUrl: "https://constmg.murgung.id",
            githubUrl: null,
            published: true,
            order: 3,
        },
        {
            title: "kompalsarana.com",
            description:
                "Website profile for PT. KOMPAL SARANA NUSANTARA. Built as a professional company website showcasing company info and services.",
            tags: ["Vue.js", "Interactive UI", "Web Design"],
            imageUrl: "/kompal.webp",
            demoUrl: "https://kompalsarana.com",
            githubUrl: null,
            published: true,
            order: 4,
        },
        {
            title: "bestek.co.id",
            description:
                "Website profile for PT BEST TEKNOLOGI, built with Vue.js featuring an interactive UI for a modern company profile website.",
            tags: ["Vue.js", "Interactive UI", "Web Design"],
            imageUrl: "/bestek.webp",
            demoUrl: "https://bestek.co.id",
            githubUrl: null,
            published: true,
            order: 5,
        },
    ];

    for (const project of projectsData) {
        await prisma.project.upsert({
            where: { id: `project-${project.order}` },
            update: project,
            create: {
                id: `project-${project.order}`,
                ...project,
            },
        });
    }
    console.log(`✅ ${projectsData.length} projects seeded`);

    // Seed certificates
    const certificatesData = [
        {
            title: "Certificate of Completion Bangkit Academy",
            issuer: "Bangkit Academy (Google, Tokopedia, Gojek, Traveloka)",
            description:
                "Graduated with Distinction in the Mobile Development path from Google's Bangkit Academy, mastering Android Native and soft skills.",
            tags: [
                "Android",
                "Kotlin",
                "Jetpack Compose",
                "Google Cloud",
                "Soft Skills",
            ],
            imageUrl: "/bangkitCompl.webp",
            issueDate: new Date("2024-07-01"),
            order: 1,
        },
        {
            title: "Certificate of Achievement Bangkit Academy",
            issuer: "Bangkit Academy",
            description:
                "Awarded as one of the Top 50 Product Capstone Teams for building an innovative mobile solution among thousands of participants.",
            tags: ["Product Management", "Team Leadership", "Capstone Project", "Pitching"],
            imageUrl: "/achievement.webp",
            issueDate: new Date("2024-07-01"),
            order: 2,
        },
        {
            title: "Certificate of Completion IDCamp (Flutter)",
            issuer: "Indosat Ooredoo Hutchison (IDCamp)",
            description:
                "Completed the Expert-level Multi-Platform App Developer path at IDCamp 2024, mastering advanced Flutter concepts and architecture.",
            tags: [
                "Flutter",
                "Dart",
                "Clean Architecture",
                "State Management",
                "Testing",
                "SOLID Principles",
                "Multi-platform",
            ],
            imageUrl: "/idCamp.webp",
            issueDate: new Date("2024-12-01"),
            order: 3,
        },
    ];

    for (const cert of certificatesData) {
        await prisma.certificate.upsert({
            where: { id: `cert-${cert.order}` },
            update: cert,
            create: {
                id: `cert-${cert.order}`,
                ...cert,
            },
        });
    }
    console.log(`✅ ${certificatesData.length} certificates seeded`);

    // Seed experiences
    const experiencesData = [
        {
            title: "Bachelor of Informatics (S1 Informatika)",
            company: "Universitas Ahmad Dahlan",
            location: "Yogyakarta, Indonesia",
            description:
                "Currently in Semester 7 (Class of 2022). Majoring in Informatics with a focus on Software Engineering. Active in academic projects and currently preparing for the final thesis with a target graduation in 2026.",
            icon: "LuGraduationCap",
            startDate: new Date("2022-08-01"),
            current: true,
            order: 1,
        },
        {
            title: "Bangkit Academy - Mobile Development",
            company: "Google, Tokopedia, Gojek, & Traveloka",
            location: "Remote (Indonesia)",
            description:
                "Graduated with Distinction in the Mobile Development (Android) path. Selected as Top 50 Product Capstone Project, building an innovative mobile solution with a cross-functional team.",
            icon: "FaAndroid",
            startDate: new Date("2024-02-01"),
            endDate: new Date("2024-07-01"),
            current: false,
            order: 2,
        },
        {
            title: "IDCamp 2024 - Multi Platform App Developer",
            company: "Indosat Ooredoo Hutchison",
            location: "Online",
            description:
                "Mastered Flutter development at the Expert Level. Focused on Clean Architecture, State Management, and building scalable multi-platform applications.",
            icon: "SiFlutter",
            startDate: new Date("2024-01-01"),
            endDate: new Date("2024-12-01"),
            current: false,
            order: 3,
        },
        {
            title: "Independent Full-Stack Developer",
            company: "Freelance",
            location: "Indonesia",
            description:
                "Deepening skills in Web Development (Next.js, TypeScript, Tailwind) and Mobile Automation. I actively explore CI/CD pipelines, library development, and Blockchain technology while building personal projects.",
            icon: "CgWorkAlt",
            startDate: new Date("2024-01-01"),
            current: true,
            order: 4,
        },
        {
            title: "Full-Stack & Automation Developer",
            company: "Open to Opportunities",
            location: "Indonesia",
            description:
                "Open to opportunities. Specializing in bridging the gap between mobile and web technologies, with a strong focus on automation and efficient code architecture.",
            icon: "FaReact",
            startDate: new Date("2024-12-01"),
            current: true,
            order: 5,
        },
    ];

    for (const exp of experiencesData) {
        await prisma.experience.upsert({
            where: { id: `exp-${exp.order}` },
            update: exp,
            create: {
                id: `exp-${exp.order}`,
                ...exp,
            },
        });
    }
    console.log(`✅ ${experiencesData.length} experiences seeded`);

    // Seed skills
    const skillsData = [
        "HTML",
        "CSS",
        "React",
        "Tailwind",
        "JavaScript",
        "Kotlin",
        "Figma",
        "Firebase",
        "PHP",
        "Android Studio",
        "Visual Studio Code",
        "Node.js",
        "Python",
    ];

    for (let i = 0; i < skillsData.length; i++) {
        await prisma.skill.upsert({
            where: { name: skillsData[i] },
            update: { order: i + 1 },
            create: {
                name: skillsData[i],
                order: i + 1,
                visible: true,
            },
        });
    }
    console.log(`✅ ${skillsData.length} skills seeded`);

    // Seed section visibility defaults
    const sections = [
        "home",
        "about",
        "certificates",
        "projects",
        "skills",
        "experience",
        "contact",
    ];

    for (let i = 0; i < sections.length; i++) {
        await prisma.sectionVisibility.upsert({
            where: { section: sections[i] },
            update: { order: i + 1 },
            create: {
                section: sections[i],
                visible: true,
                order: i + 1,
            },
        });
    }
    console.log(`✅ ${sections.length} section visibility settings seeded`);

    console.log("🎉 Database seed completed!");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
