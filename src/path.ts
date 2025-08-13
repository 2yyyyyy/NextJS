export const homePath = () => "/";
export const ticketsPath = () => "/tickets";

export const ticketPath = (ticketId: string) => {
  return `/tickets/${ticketId}`;
};

export const ticketEditPath = (ticketId: string) => {
  return `/tickets/${ticketId}/edit`;
};

export const signUpPath = () => "/sign-up";
export const signInPath = () => "/sign-in";

export const passwordForgetPath = () => "/password-forget";
export const passwordResetPath = () => "/password-reset";

export const accountProfilePath = () => "/account/profile";
export const accountPasswordPath = () => "/account/password";

export const emailVerificationPath = () => "/email-verification";

export const organizationPath = () => "/organization";

export const onboardingPath = () => "/onboarding";
export const organizationCreatePath = () => "/organization/create";

export const selectActiveOrganizationPath = () =>
  "/onboarding/select-active-organization";

export const membershipsPath = (organizationId: string) => {
  return `/organization/${organizationId}/memberships`;
};

export const ticketByOrganizationPath = () => "/tickets/organization";

export const invitationsPath = (organizationId: string) => {
  return `/organization/${organizationId}/invitations`;
};

export const emailInvitationPath = () => "/email-invitation";

export const attachmentDownloadPath = (attachmentId: string) => {
  return `/api/ali-oss/attachments/${attachmentId}`;
};

export const credentialsPath = (organizationId: string) => {
  return `/organization/${organizationId}/credentials`;
};
