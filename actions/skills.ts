"use server";

import { prisma } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod/v4";
import { auth } from "@/lib/auth";

const skillSchema = z.object({
    name: z.string().min(1, "Name is required"),
    category: z.string().optional(),
    order: z.number().default(0),
    visible: z.boolean().default(true),
});

export type SkillFormData = z.infer<typeof skillSchema>;

async function createAuditLog(
    action: string,
    entity: string,
    entityId: string,
    changes?: object
) {
    const session = await auth();
    if (!session?.user?.id) return;
    try {
        await prisma.auditLog.create({
            data: {
                action,
                entity,
                entityId,
                changes: changes ? JSON.parse(JSON.stringify(changes)) : null,
                userId: session.user.id,
            },
        });
    } catch (error) {
        console.error("Failed to create audit log:", error);
    }
}

export async function getSkills() {
    return prisma.skill.findMany({
        orderBy: { order: "asc" },
    });
}

export async function getSkill(id: string) {
    return prisma.skill.findUnique({ where: { id } });
}

export async function createSkill(data: SkillFormData) {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };

    const validated = skillSchema.safeParse(data);
    if (!validated.success) return { error: validated.error.format() };

    try {
        const skill = await prisma.skill.create({ data: validated.data });
        await createAuditLog("CREATE", "Skill", skill.id, skill);
        revalidatePath("/");
        revalidatePath("/admin/skills");
        revalidateTag("skills");
        return { success: true, data: skill };
    } catch (error) {
        console.error("Failed to create skill:", error);
        return { error: "Failed to create skill" };
    }
}

export async function updateSkill(id: string, data: SkillFormData) {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };

    const validated = skillSchema.safeParse(data);
    if (!validated.success) return { error: validated.error.format() };

    try {
        const old = await prisma.skill.findUnique({ where: { id } });
        const skill = await prisma.skill.update({ where: { id }, data: validated.data });
        await createAuditLog("UPDATE", "Skill", id, { before: old, after: skill });
        revalidatePath("/");
        revalidatePath("/admin/skills");
        revalidateTag("skills");
        return { success: true, data: skill };
    } catch (error) {
        console.error("Failed to update skill:", error);
        return { error: "Failed to update skill" };
    }
}

export async function deleteSkill(id: string) {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };

    try {
        await prisma.skill.delete({ where: { id } });
        await createAuditLog("DELETE", "Skill", id);
        revalidatePath("/");
        revalidatePath("/admin/skills");
        revalidateTag("skills");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete skill:", error);
        return { error: "Failed to delete skill" };
    }
}

export async function toggleSkillVisibility(id: string) {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };

    try {
        const skill = await prisma.skill.findUnique({ where: { id } });
        if (!skill) return { error: "Skill not found" };

        const updated = await prisma.skill.update({
            where: { id },
            data: { visible: !skill.visible },
        });

        await createAuditLog("UPDATE", "Skill", id, {
            visible: { before: skill.visible, after: updated.visible },
        });

        revalidatePath("/");
        revalidatePath("/admin/skills");
        revalidateTag("skills");

        return { success: true, visible: updated.visible };
    } catch (error) {
        console.error("Failed to toggle visibility:", error);
        return { error: "Failed to toggle visibility" };
    }
}

export async function reorderSkills(skills: { id: string; order: number }[]) {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };

    try {
        await Promise.all(
            skills.map((s) =>
                prisma.skill.update({ where: { id: s.id }, data: { order: s.order } })
            )
        );
        revalidatePath("/");
        revalidatePath("/admin/skills");
        revalidateTag("skills");
        return { success: true };
    } catch (error) {
        console.error("Failed to reorder skills:", error);
        return { error: "Failed to reorder skills" };
    }
}
