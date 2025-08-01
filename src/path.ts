export const homePath = () => "/";
export const ticketsPath = () => "/tickets";

export const ticketPath = (ticketId: string) => {
  return `/tickets/${ticketId}`;
};

export const ticketEditPath = (ticketId: string) => {
  return `/tickets/${ticketId}/edit`;
};
