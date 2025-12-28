"use server";

import { prisma } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod/v4";
import { auth } from "@/lib/auth";

const certificateSchema = z.object({
    title: z.string().min(1, "Title is required"),
    issuer: z.string().min(1, "Issuer is required"),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    imagePublicId: z.string().optional(),
    credentialUrl: z.string().url().optional().or(z.literal("")),
    issueDate: z.coerce.date(),
    tags: z.array(z.string()),
    order: z.number().default(0),
});

export type CertificateFormData = z.infer<typeof certificateSchema>;

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

export async function getCertificates(includeDeleted = false) {
    return prisma.certificate.findMany({
        where: includeDeleted ? {} : { deletedAt: null },
        orderBy: { order: "asc" },
    });
}

export async function getCertificate(id: string) {
    return prisma.certificate.findUnique({ where: { id } });
}

export async function createCertificate(data: CertificateFormData) {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };

    const validated = certificateSchema.safeParse(data);
    if (!validated.success) return { error: validated.error.format() };

    try {
        const certificate = await prisma.certificate.create({
            data: {
                ...validated.data,
                credentialUrl: validated.data.credentialUrl || null,
                imageUrl: validated.data.imageUrl || null,
                imagePublicId: validated.data.imagePublicId || null,
            },
        });

        await createAuditLog("CREATE", "Certificate", certificate.id, certificate);
        revalidatePath("/");
        revalidatePath("/admin/certificates");
        revalidateTag("certificates");

        return { success: true, data: certificate };
    } catch (error) {
        console.error("Failed to create certificate:", error);
        return { error: "Failed to create certificate" };
    }
}

export async function updateCertificate(id: string, data: CertificateFormData) {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };

    const validated = certificateSchema.safeParse(data);
    if (!validated.success) return { error: validated.error.format() };

    try {
        const old = await prisma.certificate.findUnique({ where: { id } });
        const certificate = await prisma.certificate.update({
            where: { id },
            data: {
                ...validated.data,
                credentialUrl: validated.data.credentialUrl || null,
                imageUrl: validated.data.imageUrl || null,
                imagePublicId: validated.data.imagePublicId || null,
            },
        });

        await createAuditLog("UPDATE", "Certificate", id, { before: old, after: certificate });
        revalidatePath("/");
        revalidatePath("/admin/certificates");
        revalidateTag("certificates");

        return { success: true, data: certificate };
    } catch (error) {
        console.error("Failed to update certificate:", error);
        return { error: "Failed to update certificate" };
    }
}

export async function deleteCertificate(id: string) {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };

    try {
        await prisma.certificate.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
        await createAuditLog("DELETE", "Certificate", id);
        revalidatePath("/");
        revalidatePath("/admin/certificates");
        revalidateTag("certificates");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete certificate:", error);
        return { error: "Failed to delete certificate" };
    }
}

export async function restoreCertificate(id: string) {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };

    try {
        await prisma.certificate.update({
            where: { id },
            data: { deletedAt: null },
        });
        await createAuditLog("RESTORE", "Certificate", id);
        revalidatePath("/");
        revalidatePath("/admin/certificates");
        revalidateTag("certificates");
        return { success: true };
    } catch (error) {
        console.error("Failed to restore certificate:", error);
        return { error: "Failed to restore certificate" };
    }
}
