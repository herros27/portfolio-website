"use server";

import { prisma } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod/v4";
import { auth } from "@/lib/auth";

const experienceSchema = z.object({
    title: z.string().min(1, "Title is required"),
    company: z.string().min(1, "Company is required"),
    location: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional().nullable(),
    current: z.boolean().default(false),
    icon: z.string().optional(),
    order: z.number().default(0),
});

export type ExperienceFormData = z.infer<typeof experienceSchema>;

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

export async function getExperiences(includeDeleted = false) {
    return prisma.experience.findMany({
        where: includeDeleted ? {} : { deletedAt: null },
        orderBy: { order: "asc" },
    });
}

export async function getExperience(id: string) {
    return prisma.experience.findUnique({ where: { id } });
}

export async function createExperience(data: ExperienceFormData) {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };

    const validated = experienceSchema.safeParse(data);
    if (!validated.success) return { error: validated.error.format() };

    try {
        const experience = await prisma.experience.create({
            data: {
                ...validated.data,
                endDate: validated.data.current ? null : validated.data.endDate,
            },
        });

        await createAuditLog("CREATE", "Experience", experience.id, experience);
        revalidatePath("/");
        revalidatePath("/admin/experience");
        revalidateTag("experience");

        return { success: true, data: experience };
    } catch (error) {
        console.error("Failed to create experience:", error);
        return { error: "Failed to create experience" };
    }
}

export async function updateExperience(id: string, data: ExperienceFormData) {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };

    const validated = experienceSchema.safeParse(data);
    if (!validated.success) return { error: validated.error.format() };

    try {
        const old = await prisma.experience.findUnique({ where: { id } });
        const experience = await prisma.experience.update({
            where: { id },
            data: {
                ...validated.data,
                endDate: validated.data.current ? null : validated.data.endDate,
            },
        });

        await createAuditLog("UPDATE", "Experience", id, { before: old, after: experience });
        revalidatePath("/");
        revalidatePath("/admin/experience");
        revalidateTag("experience");

        return { success: true, data: experience };
    } catch (error) {
        console.error("Failed to update experience:", error);
        return { error: "Failed to update experience" };
    }
}

export async function deleteExperience(id: string) {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };

    try {
        await prisma.experience.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
        await createAuditLog("DELETE", "Experience", id);
        revalidatePath("/");
        revalidatePath("/admin/experience");
        revalidateTag("experience");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete experience:", error);
        return { error: "Failed to delete experience" };
    }
}

export async function restoreExperience(id: string) {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };

    try {
        await prisma.experience.update({
            where: { id },
            data: { deletedAt: null },
        });
        await createAuditLog("RESTORE", "Experience", id);
        revalidatePath("/");
        revalidatePath("/admin/experience");
        revalidateTag("experience");
        return { success: true };
    } catch (error) {
        console.error("Failed to restore experience:", error);
        return { error: "Failed to restore experience" };
    }
}
