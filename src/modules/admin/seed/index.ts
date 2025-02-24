import { BasePayload } from "payload";
import { seedUsers } from "./seedUsers";
import { seedTeamMembers } from "./seedTeamMembers";
import { seedInstructors } from "./seedInstructors";
import { seedCourses } from "./seedCourses";

export const seed = async (payload: BasePayload) => {
  if (process.env.NODE_ENV === "development") {
    await seedUsers(payload);
    await seedTeamMembers(payload);
    await seedInstructors(payload);
    await seedCourses(payload);
  }
};
