"use server";

import { prisma } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod/v4";
import { auth } from "@/lib/auth";

// Validation schemas
const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    imageUrl: z.string().optional(),
    imagePublicId: z.string().optional(),
    demoUrl: z.string().url().optional().or(z.literal("")),
    githubUrl: z.string().url().optional().or(z.literal("")),
    tags: z.array(z.string()),
    published: z.boolean().default(false),
    order: z.number().default(0),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

// Create audit log helper
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

// Get all projects
export async function getProjects(includeDeleted = false) {
    return prisma.project.findMany({
        where: includeDeleted ? {} : { deletedAt: null },
        orderBy: { order: "asc" },
    });
}

// Get single project
export async function getProject(id: string) {
    return prisma.project.findUnique({
        where: { id },
    });
}

// Create project
export async function createProject(data: ProjectFormData) {
    const session = await auth();
    if (!session?.user) {
        return { error: "Unauthorized" };
    }

    const validated = projectSchema.safeParse(data);
    if (!validated.success) {
        return { error: validated.error.format() };
    }

    try {
        const project = await prisma.project.create({
            data: {
                ...validated.data,
                demoUrl: validated.data.demoUrl || null,
                githubUrl: validated.data.githubUrl || null,
                imageUrl: validated.data.imageUrl || null,
                imagePublicId: validated.data.imagePublicId || null,
            },
        });

        await createAuditLog("CREATE", "Project", project.id, project);

        revalidatePath("/");
        revalidatePath("/admin/projects");
        revalidateTag("projects");

        return { success: true, data: project };
    } catch (error) {
        console.error("Failed to create project:", error);
        return { error: "Failed to create project" };
    }
}

// Update project
export async function updateProject(id: string, data: ProjectFormData) {
    const session = await auth();
    if (!session?.user) {
        return { error: "Unauthorized" };
    }

    const validated = projectSchema.safeParse(data);
    if (!validated.success) {
        return { error: validated.error.format() };
    }

    try {
        const oldProject = await prisma.project.findUnique({ where: { id } });

        const project = await prisma.project.update({
            where: { id },
            data: {
                ...validated.data,
                demoUrl: validated.data.demoUrl || null,
                githubUrl: validated.data.githubUrl || null,
                imageUrl: validated.data.imageUrl || null,
                imagePublicId: validated.data.imagePublicId || null,
            },
        });

        await createAuditLog("UPDATE", "Project", project.id, {
            before: oldProject,
            after: project,
        });

        revalidatePath("/");
        revalidatePath("/admin/projects");
        revalidatePath(`/admin/projects/${id}`);
        revalidateTag("projects");

        return { success: true, data: project };
    } catch (error) {
        console.error("Failed to update project:", error);
        return { error: "Failed to update project" };
    }
}

// Soft delete project
export async function deleteProject(id: string) {
    const session = await auth();
    if (!session?.user) {
        return { error: "Unauthorized" };
    }

    try {
        const project = await prisma.project.update({
            where: { id },
            data: { deletedAt: new Date() },
        });

        await createAuditLog("DELETE", "Project", project.id);

        revalidatePath("/");
        revalidatePath("/admin/projects");
        revalidateTag("projects");

        return { success: true };
    } catch (error) {
        console.error("Failed to delete project:", error);
        return { error: "Failed to delete project" };
    }
}

// Restore project
export async function restoreProject(id: string) {
    const session = await auth();
    if (!session?.user) {
        return { error: "Unauthorized" };
    }

    try {
        const project = await prisma.project.update({
            where: { id },
            data: { deletedAt: null },
        });

        await createAuditLog("RESTORE", "Project", project.id);

        revalidatePath("/");
        revalidatePath("/admin/projects");
        revalidateTag("projects");

        return { success: true };
    } catch (error) {
        console.error("Failed to restore project:", error);
        return { error: "Failed to restore project" };
    }
}

// Toggle publish status
export async function toggleProjectPublish(id: string) {
    const session = await auth();
    if (!session?.user) {
        return { error: "Unauthorized" };
    }

    try {
        const project = await prisma.project.findUnique({ where: { id } });
        if (!project) {
            return { error: "Project not found" };
        }

        const updated = await prisma.project.update({
            where: { id },
            data: { published: !project.published },
        });

        await createAuditLog("UPDATE", "Project", project.id, {
            published: { before: project.published, after: updated.published },
        });

        revalidatePath("/");
        revalidatePath("/admin/projects");
        revalidateTag("projects");

        return { success: true, published: updated.published };
    } catch (error) {
        console.error("Failed to toggle publish:", error);
        return { error: "Failed to toggle publish status" };
    }
}

// Reorder projects
export async function reorderProjects(
    projects: { id: string; order: number }[]
) {
    const session = await auth();
    if (!session?.user) {
        return { error: "Unauthorized" };
    }

    try {
        await Promise.all(
            projects.map((p) =>
                prisma.project.update({
                    where: { id: p.id },
                    data: { order: p.order },
                })
            )
        );

        revalidatePath("/");
        revalidatePath("/admin/projects");
        revalidateTag("projects");

        return { success: true };
    } catch (error) {
        console.error("Failed to reorder projects:", error);
        return { error: "Failed to reorder projects" };
    }
}
