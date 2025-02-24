import { BasePayload } from "payload";

export const seedUsers = async (payload: BasePayload) => {
  const users = await payload.find({
    collection: "users",
  });

  if (users.docs.length === 0) {
    await payload.create({
      collection: "users",
      data: {
        email: "admin@gmail.com",
        password: "123",
      },
    });
  }
};
