import { differenceInSeconds } from "date-fns";
import { prisma } from "@/lib/prisma";

const canResendVerificationEmail = async (userId: string) => {
  const databaseCode = await prisma.emailVerificationToken.findFirst({
    where: {
      userId,
    },
  });

  if (!databaseCode) {
    return true;
  }

  const diff = differenceInSeconds(
    new Date(),
    new Date(databaseCode.createdAt)
  );

  return diff > 60;
};

export { canResendVerificationEmail };
