import { prisma } from "@/lib/prisma";
import { emailInvitationPath } from "@/path";
import { generateRandomToken, hashToken } from "@/utils/crypto";
import { getBaseUrl } from "@/utils/url";

const PASSWORD_RESET_TOKEN_LIFETIME_MS = 1000 * 60 * 60 * 2;

const generateInvitationLink = async (
  invitedByUserId: string,
  organizationId: string,
  email: string
) => {
  await prisma.invitation.deleteMany({
    where: {
      organizationId,
      email,
    },
  });

  const tokenId = generateRandomToken();
  const tokenHash = hashToken(tokenId);
  await prisma.invitation.create({
    data: {
      tokenHash,
      organizationId,
      email,
      invitedByUserId,
    },
  });

  const pageUrl = getBaseUrl() + emailInvitationPath();
  const invitationLink = pageUrl + `/${tokenId}`;

  return invitationLink;
};

export { generateInvitationLink };
