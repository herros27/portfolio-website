import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact, FaAndroid } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { SiFlutter } from "react-icons/si";


export const projectsData = [
  {
    title: "DermaScan App",
    description: "This was my capstone project...",
    tags: ["Android", "Kotlin", "Jetpack Compose", "Room", "Retrofit"],
    // ✅ GANTI JADI STRING (sesuai nama file di folder public)
    imageUrl: "/dermascan.png",
  },
  {
    title: "CleanScape App",
    description: "A mobile app for managing inorganic waste...",
    tags: ["Android", "Kotlin", "Firebase", "Firestore", "Firebase Auth"],
    imageUrl: "/cleanscape.png",
  },
  {
    title: "constmg.murgung.id",
    description: "I worked as a FullStack Developer...",
    tags: ["React", "Laravel", "REST API", "Tailwind"],
    imageUrl: "/constMg.png",
  },
  {
    title: "kompalsarana.com",
    description: "Website profile for PT. KOMPAL SARANA NUSANTARA...",
    tags: ["Vue.js", "Interactive UI", "Web Design"],
    imageUrl: "/kompal.png",
  },
  {
    title: "bestek.co.id",
    description: "Website profile for PT BEST TEKNOLOGI...",
    tags: ["Vue.js", "Interactive UI", "Web Design"],
    imageUrl: "/bestek.png",
  },
] as const;

export const certificatesData = [
  {
    title: "Certificate of Completion Bangkit Academy",
    description: "Graduated with Distinction...",
    tags: ["Android", "Kotlin", "Jetpack Compose", "Google Cloud", "Soft Skills"],
    // Pastikan besar kecil huruf SAMA PERSIS dengan nama file
    imageUrl: "/bangkitCompl.png",
  },
  {
    title: "Certificate of Achievement Bangkit Academy",
    description: "Awarded as one of the Top 50 Product Capstone Teams...",
    tags: ["Product Management", "Team Leadership", "Capstone Project", "Pitching"],
    imageUrl: "/achievement.png",
  },
  {
    title: "Certificate of Completion IDCamp (Flutter)",
    description: "Completed the Expert-level Multi-Platform...",
    tags: ["Flutter", "Dart", "Clean Architecture", "State Management", "Testing"],
    imageUrl: "/idcamp.png",
  }
] as const;

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Certificates",
    hash: "#certificates",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Bachelor of Informatics (S1 Informatika)",
    location: "Universitas Ahmad Dahlan, Yogyakarta",
    description:
      "Currently in Semester 7 (Class of 2022). Majoring in Informatics with a focus on Software Engineering. Active in academic projects and currently preparing for the final thesis with a target graduation in 2026.",
    icon: React.createElement(LuGraduationCap),
    date: "2022 - 2026 (Expected)",
  },
  {
    title: "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
    location: "Remote (Indonesia)",
    description:
      "Graduated with Distinction in the Mobile Development (Android) path. Selected as Top 50 Product Capstone Project, building an innovative mobile solution with a cross-functional team.",
    icon: React.createElement(FaAndroid), // Menggunakan icon Android karena fokus track kamu
    date: "Feb 2024 - Jul 2024", // Sesuaikan tanggal
  },
  {
    title: "IDCamp 2024 - Multi Platform App Developer",
    location: "Online",
    description:
      "Mastered Flutter development at the Expert Level. Focused on Clean Architecture, State Management, and building scalable multi-platform applications.",
    icon: React.createElement(SiFlutter), // Menggunakan icon Flutter
    date: "2024",
  },
  {
    title: "Independent Full-Stack Developer",
    location: "Indonesia",
    description:
      "Deepening skills in Web Development (Next.js, TypeScript, Tailwind) and Mobile Automation. I actively explore CI/CD pipelines, library development, and Blockchain technology while building personal projects.",
    icon: React.createElement(CgWorkAlt), // Atau bisa ganti icon code
    date: "2024 - Present",
  },
  {
    title: "Full-Stack & Automation Developer",
    location: "Indonesia",
    description:
      "Open to opportunities. Specializing in bridging the gap between mobile and web technologies, with a strong focus on automation and efficient code architecture.",
    icon: React.createElement(FaReact),
    date: "Present",
  },
] as const;

export const skillsData = [
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
] as const;
