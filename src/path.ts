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
