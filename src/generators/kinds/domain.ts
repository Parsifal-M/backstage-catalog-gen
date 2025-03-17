import { faker } from "@faker-js/faker";
import { Entity, BaseEntitySpec } from "../../types";
import { EntityGeneratorParams } from "../types";

/**
 * Generates a Domain entity
 */
export const generateDomainEntity = (params: EntityGeneratorParams<BaseEntitySpec>): Entity => {
  const { name, owner, annotations } = params;
  return {
    apiVersion: "backstage.io/v1alpha1",
    kind: "Domain",
    metadata: {
      name,
      description: faker.commerce.productDescription(),
      annotations
    },
    spec: {
      owner: owner ?? "team-b",
    }
  };
};
