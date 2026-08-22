import { prisma } from "../src/client";

import { UserRole, UserStatus } from "../src/generated/prisma/client";

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "john@example.com",
      firstName: "John",
      lastName: "Smith",
      role: UserRole.CUSTOMER,
      status: UserStatus.ACTIVE,
    },
  });

  console.log("Created user:", user);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
