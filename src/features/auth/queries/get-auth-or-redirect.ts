import { redirect } from "next/navigation";
import { getOrganizationsByUser } from "@/features/organization/queries/get-organization-by-user";
import {
  emailVerificationPath,
  onboardingPath,
  selectActiveOrganizationPath,
  signInPath,
} from "@/path";
import { getAuth } from "./get-auth";

type getAuthOrRedirectProps = {
  checkEmailVerified?: boolean;
  checkOrganization?: boolean;
  checkActiveOrganization?: boolean;
};

const getAuthOrRedirect = async (options?: getAuthOrRedirectProps) => {
  const {
    checkEmailVerified = true,
    checkOrganization = true,
    checkActiveOrganization = true,
  } = options ?? {};

  const auth = await getAuth();

  if (!auth.user) {
    redirect(signInPath());
  }

  if (checkEmailVerified && !auth.user.emailVerified) {
    redirect(emailVerificationPath());
  }

  let activeOrganization;

  if (checkOrganization || checkActiveOrganization) {
    const organizations = await getOrganizationsByUser();
    if (checkActiveOrganization && !organizations.length) {
      redirect(onboardingPath());
    }

    activeOrganization = organizations.find(
      (org) => org.membershipByUser.isActive
    );

    if (checkActiveOrganization && !!!activeOrganization) {
      redirect(selectActiveOrganizationPath());
    }
  }

  return { ...auth, activeOrganization };
};

export { getAuthOrRedirect };
