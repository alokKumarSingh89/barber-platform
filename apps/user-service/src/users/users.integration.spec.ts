import { UserRole } from '@barber/database';

import { prisma } from '@barber/database';

describe('Users database integration', () => {
  const email = `integration-${Date.now()}@example.com`;
  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email,
      },
    });
    await prisma.$disconnect();
  });
  it('should create and retrieve a user', async () => {
    const created = await prisma.user.create({
      data: {
        email,
        firstName: 'Integration',
        lastName: 'Test',
        role: UserRole.CUSTOMER,
      },
    });
    expect(created.email).toBe(email);
    const found = await prisma.user.findUnique({
      where: {
        id: created.id,
      },
    });
    expect(found).not.toBeNull();
    expect(found?.firstName).toBe('Integration');
  });
});
