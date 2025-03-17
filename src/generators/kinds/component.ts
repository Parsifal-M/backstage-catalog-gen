import { faker } from "@faker-js/faker";
import { Entity, BaseEntitySpec } from "../../types";
import { EntityGeneratorParams } from "../types";

/**
 * Generates a Component entity
 */
export const generateComponentEntity = (params: EntityGeneratorParams<BaseEntitySpec>): Entity => {
  const { name, annotations, owner } = params;
  const componentTypes = ["service", "website", "library"];
  const lifecycleStates = ["experimental", "production", "deprecated"];

  return {
    apiVersion: "backstage.io/v1alpha1",
    kind: "Component",
    metadata: {
      name,
      description: faker.commerce.productDescription(),
      annotations
    },
    spec: {
      type: params.spec?.type || componentTypes[Math.floor(Math.random() * componentTypes.length)],
      lifecycle: params.spec?.lifecycle || lifecycleStates[0],
      owner: owner ?? "team-a",
    }
  };
};
