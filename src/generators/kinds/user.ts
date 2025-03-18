import { faker } from "@faker-js/faker";
import { Entity } from "../../types";
import { EntityGeneratorParams, EntityProfile } from "../types";
import { createBaseEntity } from "../createBaseEntity";
export interface UserEntitySpec {
  profile?: EntityProfile;
  memberOf: string[];
}

export const generateUserEntity = (params: EntityGeneratorParams<UserEntitySpec>): Entity => {
  const { name } = params;
  const defaultSpec = {
    profile: {
      displayName: params.spec?.profile?.displayName || faker.person.fullName(),
      email: params.spec?.profile?.email || `${name}@example.com`,
      picture: params.spec?.profile?.picture || 'https://avatars.githubusercontent.com/u/55416270'
    },
    memberOf: params.spec?.memberOf || []
  };

  return createBaseEntity<UserEntitySpec>(
    "User",
    params,
    (p: EntityGeneratorParams<UserEntitySpec>) => ({
      ...defaultSpec,
      ...p.spec,
      owner: undefined
    })
  );
};
