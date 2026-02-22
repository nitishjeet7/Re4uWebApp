import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@researchedit4u.com";
  const adminPassword = "admin123"; // Change this in production!
  
  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("Admin user already exists:", adminEmail);
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: "Admin User",
    },
  });

  console.log("Created admin user:", admin.email);
  console.log("Password:", adminPassword);
  console.log("⚠️  Remember to change the default password in production!");
}

main()
  .catch((e: unknown) => {
    const err = e as { code?: string; message?: string };
    if (err?.code === "P2021") {
      console.error("The User table does not exist. Create it first with:\n  npx prisma db push\n");
    } else {
      console.error(e);
    }
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());