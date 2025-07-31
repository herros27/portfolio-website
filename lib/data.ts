import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";
import dartImg from "@/public/dart.png";
import dasarKotlinImg from "@/public/dasar_kotlin.png";
import fundamentalAndroidImg from "@/public/fundamentalAndroid.png";
import aiImg from "@/public/AI.png";
import androPemulaImg from "@/public/andro_pemula.png";


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
    title: "Graduated bootcamp",
    location: "Miami, FL",
    description:
      "I graduated after 6 months of studying. I immediately found a job as a front-end developer.",
    icon: React.createElement(LuGraduationCap),
    date: "2019",
  },
  {
    title: "Front-End Developer",
    location: "Orlando, FL",
    description:
      "I worked as a front-end developer for 2 years in 1 job and 1 year in another job. I also upskilled to the full stack.",
    icon: React.createElement(CgWorkAlt),
    date: "2019 - 2021",
  },
  {
    title: "Full-Stack Developer",
    location: "Houston, TX",
    description:
      "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.",
    icon: React.createElement(FaReact),
    date: "2021 - present",
  },
] as const;

export const projectsData = [
  {
    title: "CorpComment",
    description:
      "I worked as a full-stack developer on this startup project for 2 years. Users can give public feedback to companies.",
    tags: ["React", "Next.js", "MongoDB", "Tailwind", "Prisma"],
    imageUrl: corpcommentImg,
  },
  {
    title: "rmtDev",
    description:
      "Job board for remote developer jobs. I was the front-end developer. It has features like filtering, sorting and pagination.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind", "Redux"],
    imageUrl: rmtdevImg,
  },
  {
    title: "Word Analytics",
    description:
      "A public web app for quick analytics on text. It shows word count, character count and social media post limits.",
    tags: ["React", "Next.js", "SQL", "Tailwind", "Framer"],
    imageUrl: wordanalyticsImg,
  },
] as const;

export const certificatesData = [
  {
    title: "Getting Started With Dart",
    description:
      "The class is aimed at beginners who want to learn the basics of the Dart programming language with reference to industry standards. At the end of the class, students will be able to create Dart programs using the IntelliJ IDEA IDE or an Online IDE such as DartPad.",
    tags: [
      "Dart Fundamental",
      "Control Flow",
      "Collection",
      "Object Oriented Programming",
      "Functional Styles",
      "Dart Type System",
      "Effective Dart"
    ],
    imageUrl: dartImg,
  },
  {
    title: "Getting Started with Kotlin Programming",
    description:
      "This class is intended for those who want to learn the basics of the Kotlin programming language by referring to the international competency standards of Google Developers Authorized Training Partners. At the end of the class, students understand the basic concepts of programming languages, functional programming, and object-oriented programming (OOP) using Kotlin.",
    tags: [
      "Kotlin Fundamental",
      "Control Flow",
      "Collection",
      "Kotlin  OOP",
      "Kotlin Generics",
      "Special Classes",
      "Collections",
      "Coroutines"
    ],
    imageUrl: dasarKotlinImg,
  },
  {
    title: "Learn Fundamental Android Apllication",
    description:
      "Classes are aimed at levelers who want to learn the fundamentals of making Android applications, such as networking and databases, with reference to the international competency standards of the Google Developers Authorized Training Partner. At the end of class, students can create applications that can retrieve data from the Web API and store favorite data using a local database.",
    tags: [
      "Dasar Pengembangan Aplikasi Android",
      "Fragment",
      "Background Thread & Networking",
      "Android Architecture Component",
      "Navigation dan API",
      "Local Data Persistent",
      "Background Task dan Scheduler"
    ],
    imageUrl: fundamentalAndroidImg,
  },
  {
    title: "Learn AI Basics",
    description:
      "This class is intended for beginners who want to start a career in the world of AI. After taking the class, students are expected to be able to examine various basic concepts in AI and their applications well.",
    tags: [
      "Berkenalan dengan Artificial Intelligence (AI)",
      "Data untuk AI",
      "Pengantar Machine Learning"
    ],
    imageUrl: aiImg,
  },
  {
    title: "Learn to Make Android Apps for Beginners",
    description:
      "This class is intended for beginners who want to start their careers in the Android Developer field by referring to Googl's international competency standards. At the end of class, students can create an Android application that can display lists and data details.",
    tags: [
      "Pengenalan Android Studio",
      "Activity",
      "Intent",
      "View dan ViewGroup",
      "Functional Styles",
      "Style dan Theme",
      "RecyclerView"
    ],
    imageUrl: androPemulaImg,
  }
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
