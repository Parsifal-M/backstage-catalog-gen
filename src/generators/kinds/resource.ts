import { faker } from "@faker-js/faker";
import { Entity, ResourceEntitySpec } from "../../types";
import { EntityGeneratorParams } from "../types";

/**
 * Generates a Resource entity
 */
export const generateResourceEntity = (params: EntityGeneratorParams<ResourceEntitySpec>): Entity => {
  const { name, annotations, owner } = params;
  return {
    apiVersion: "backstage.io/v1alpha1",
    kind: "Resource",
    metadata: {
      name,
      description: faker.commerce.productDescription(),
      annotations
    },
    spec: {
      type: params.spec?.type || faker.database.engine().toLowerCase(),
      owner: owner ?? "team-a",
      system: params.spec?.system,
      dependsOn: params.spec?.dependsOn,
      dependencyOf: params.spec?.dependencyOf
    }
  };
};
