import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: User["email"], password: string, name: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      name,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"],
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash,
  );

  if (!isValid) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

export async function updateUserName(id: User["id"], name: string) {
  return prisma.user.update({
    where: { id },
    data: { name },
  });
}

export async function updateUserPassword(id: User["id"], oldPassword: string, newPassword: string) {
  const userWithPassword = await prisma.user.findUnique({
    where: { id },
    include: { password: true },
  });

  if (!userWithPassword || !userWithPassword.password) {
    throw new Error("User or password not found");
  }

  const isValid = await bcrypt.compare(oldPassword, userWithPassword.password.hash);

  if (!isValid) {
    return false;
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await prisma.password.update({
    where: { userId: id },
    data: { hash: hashedNewPassword },
  });

  return true;
}
