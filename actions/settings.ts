"use server";

import { prisma } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { auth } from "@/lib/auth";

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

export async function getSectionVisibilitySettings() {
    return prisma.sectionVisibility.findMany({
        orderBy: { section: "asc" },
    });
}

export async function updateSectionVisibility(section: string, visible: boolean) {
    const session = await auth();
    if (!session?.user) {
        return { error: "Unauthorized" };
    }

    try {
        await prisma.sectionVisibility.upsert({
            where: { section },
            update: { visible },
            create: { section, visible },
        });

        await createAuditLog("UPDATE", "SectionVisibility", section, { visible });

        revalidatePath("/");
        revalidateTag("public");
        revalidatePath("/admin/settings");

        return { success: true };
    } catch (error) {
        console.error("Error updating section visibility:", error);
        return { error: "Failed to update section visibility" };
    }
}
