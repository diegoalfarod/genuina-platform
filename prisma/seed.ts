import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hash = (pw: string) => bcrypt.hashSync(pw, 10);

  // Usuario admin inicial. Cambia el email/contraseña después del primer ingreso.
  const admin = await prisma.user.upsert({
    where: { email: "admin@genuina.local" },
    update: {},
    create: {
      nombre: "Admin",
      email: "admin@genuina.local",
      passwordHash: hash("genuina"),
      rol: "ADMIN",
    },
  });

  console.log("Seed completo:", { admin: admin.email });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
