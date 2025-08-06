import { User as AuthUser } from "lucia";
type Entity = {
  userId: string | null;
};

const isOwner = (
  authUser: AuthUser | null | undefined,
  entity: Entity | null | undefined
) => {
  if (!authUser || !entity) {
    return false;
  }

  if (!entity.userId) {
    return false;
  }
  if (authUser.id !== entity.userId) {
    return false;
  } else {
    return true;
  }
};

export { isOwner };
