import { faker } from "@faker-js/faker";
import { Entity } from "../../types";
import { BaseEntitySpec, EntityGeneratorParams } from "../types";
export interface DomainEntitySpec extends BaseEntitySpec {
  owner: string;
  subdomainOf?: string;
  type?: string;
}

export const generateDomainEntity = (params: EntityGeneratorParams<DomainEntitySpec>): Entity => {
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
