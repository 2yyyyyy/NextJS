import { prisma } from "@/lib/prisma";
import { generateRandomCode } from "@/utils/crypto";

const EMAIL_VERIFICATION_CODE_TOKEN_MS = 1000 * 60 * 15;

export const generateEmailVerificationCode = async (
  userId: string,
  email: string
) => {
  const code = generateRandomCode();
  await prisma.emailVerificationToken.deleteMany({
    where: {
      userId,
    },
  });

  await prisma.emailVerificationToken.create({
    data: {
      userId,
      email,
      code,
      expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_CODE_TOKEN_MS),
    },
  });
  return code;
};
