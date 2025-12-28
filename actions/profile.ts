"use server";

import { prisma } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod/v4";
import { auth } from "@/lib/auth";

const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    title: z.string().min(1, "Title is required"),
    bio: z.string().min(1, "Bio is required"),
    about: z.string().min(1, "About is required"),
    photoUrl: z.string().optional(),
    photoPublicId: z.string().optional(),
    resumeUrl: z.string().optional(),
    location: z.string().optional(),
    email: z.string().email().optional().or(z.literal("")),
    github: z.string().url().optional().or(z.literal("")),
    linkedin: z.string().url().optional().or(z.literal("")),
    twitter: z.string().url().optional().or(z.literal("")),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

async function createAuditLog(
    action: string,
    entity: string,
    entityId: string,
    changes?: object
) {
    const session = await auth();
    if (!session?.user?.id) return;
    await prisma.auditLog.create({
        data: {
            action,
            entity,
            entityId,
            changes: changes ? JSON.parse(JSON.stringify(changes)) : null,
            userId: session.user.id,
        },
    });
}

export async function getProfile() {
    return prisma.profile.findFirst();
}

export async function updateProfile(data: ProfileFormData) {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };

    const validated = profileSchema.safeParse(data);
    if (!validated.success) return { error: validated.error.format() };

    try {
        const existing = await prisma.profile.findFirst();

        const profile = existing
            ? await prisma.profile.update({
                where: { id: existing.id },
                data: {
                    ...validated.data,
                    email: validated.data.email || null,
                    github: validated.data.github || null,
                    linkedin: validated.data.linkedin || null,
                    twitter: validated.data.twitter || null,
                    photoUrl: validated.data.photoUrl || null,
                    photoPublicId: validated.data.photoPublicId || null,
                },
            })
            : await prisma.profile.create({
                data: {
                    ...validated.data,
                    email: validated.data.email || null,
                    github: validated.data.github || null,
                    linkedin: validated.data.linkedin || null,
                    twitter: validated.data.twitter || null,
                    photoUrl: validated.data.photoUrl || null,
                    photoPublicId: validated.data.photoPublicId || null,
                },
            });

        await createAuditLog(
            existing ? "UPDATE" : "CREATE",
            "Profile",
            profile.id,
            { before: existing, after: profile }
        );

        revalidatePath("/");
        revalidatePath("/admin/profile");
        revalidateTag("profile");

        return { success: true, data: profile };
    } catch (error) {
        console.error("Failed to update profile:", error);
        return { error: "Failed to update profile" };
    }
}
