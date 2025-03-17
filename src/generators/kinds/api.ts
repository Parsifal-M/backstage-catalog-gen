import { faker } from "@faker-js/faker";
import { Entity } from "../../types";
import { EntityGeneratorParams, BaseEntitySpec } from "../types";

export interface ApiEntitySpec extends BaseEntitySpec {
  type: string;
  lifecycle: string;
  owner: string;
  system?: string;
  definition: string;
}

export const generateApiEntity = (params: EntityGeneratorParams<ApiEntitySpec>): Entity => {
  const { name, annotations, owner } = params;

  return {
    apiVersion: "backstage.io/v1alpha1",
    kind: "API",
    metadata: {
      name,
      description: faker.commerce.productDescription(),
      annotations
    },
    spec: {
      type: "openapi",
      lifecycle: "production",
      owner: owner ?? "team-b",
      definition: `openapi: "3.0.0"
info:
  version: 1.0.0
  title: ${name}
  license:
    name: MIT`,
    }
  };
};
