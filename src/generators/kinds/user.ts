import { faker } from "@faker-js/faker";
import { Entity, UserEntitySpec } from "../../types";
import { EntityGeneratorParams } from "../types";

/**
 * Generates a User entity
 */
export const generateUserEntity = (params: EntityGeneratorParams<UserEntitySpec>): Entity => {
  const { name, annotations } = params;
  return {
    apiVersion: "backstage.io/v1alpha1",
    kind: "User",
    metadata: {
      name,
      description: `User account for ${name}`,
      annotations
    },
    spec: {
      profile: {
        displayName: params.spec?.profile?.displayName || faker.person.fullName(),
        email: params.spec?.profile?.email || `${name}@example.com`,
        picture: params.spec?.profile?.picture || faker.image.avatar()
      },
      memberOf: params.spec?.memberOf || []
    }
  };
};
