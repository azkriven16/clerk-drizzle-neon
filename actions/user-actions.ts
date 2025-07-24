"use server";

import { db } from "@/db";
import { UserInput, users } from "@/db/schema";

export const getAllUsers = async () => {
  const data = await db.select().from(users);
  return data;
};

export const getUser = async (userId: any) => {
  const user = await db.query.users.findMany({
    where: (users, { eq }) => eq(users.clerkId, userId),
    with: {
      todos: true,
    },
  });

  return user;
};

export const addUser = async (user: UserInput) => {
  await db
    .insert(users)
    .values({
      clerkId: user.clerkId,
      email: user.email,
      name: user.name!,
      firstName: user.firstName,
      lastName: user.lastName,
      photo: user.photo,
    })
    .returning({ clerkClientId: users.clerkId });

  // revalidatePath("/");
};
