import { faker } from "@faker-js/faker";
import { Entity, GroupEntitySpec } from "../../types";
import { EntityGeneratorParams } from "../types";

/**
 * Generates a Group entity
 */
export const generateGroupEntity = (params: EntityGeneratorParams<GroupEntitySpec>): Entity => {
  const { name, annotations, owner } = params;
  return {
    apiVersion: "backstage.io/v1alpha1",
    kind: "Group",
    metadata: {
      name,
      description: faker.commerce.productDescription(),
      annotations
    },
    spec: {
      profile: {
        displayName: params.spec?.profile?.displayName || `${name} Team`,
        email: params.spec?.profile?.email,
        picture: params.spec?.profile?.picture
      },
      parent: owner ?? 'team-a',
      children: params.spec?.children || [],
      members: params.spec?.members || []
    }
  };
};
