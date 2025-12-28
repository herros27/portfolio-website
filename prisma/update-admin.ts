import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.POSTGRES_URL;
if (!connectionString) {
    throw new Error("POSTGRES_URL is not set");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("🔐 Updating admin credentials...\n");

    const oldEmail = process.env.OLD_ADMIN_EMAIL || "admin@example.com";
    const newEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const newPassword = process.env.ADMIN_PASSWORD || "admin123";

    // Find existing admin
    const existingAdmin = await prisma.user.findUnique({
        where: { email: oldEmail },
    });

    if (!existingAdmin) {
        console.log(`❌ Admin with email ${oldEmail} not found!`);
        console.log("Creating new admin user...\n");

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        const newAdmin = await prisma.user.create({
            data: {
                email: newEmail,
                password: hashedPassword,
                name: "Admin",
                role: "ADMIN",
                isActive: true,
            },
        });

        console.log(`✅ New admin created: ${newAdmin.email}`);
    } else {
        console.log(`📧 Old email: ${oldEmail}`);
        console.log(`📧 New email: ${newEmail}\n`);

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        const updatedAdmin = await prisma.user.update({
            where: { email: oldEmail },
            data: {
                email: newEmail,
                password: hashedPassword,
            },
        });

        console.log(`✅ Admin credentials updated!`);
        console.log(`   Email: ${updatedAdmin.email}`);
        console.log(`   Password: ******** (hashed)\n`);
    }

    console.log("🎉 Done! You can now login with the new credentials.");
}

main()
    .catch((e) => {
        console.error("❌ Error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
