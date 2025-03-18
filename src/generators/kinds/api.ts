import { Entity } from "../../types";
import { EntityGeneratorParams, BaseEntitySpec } from "../types";
import { createBaseEntity } from "../createBaseEntity";

export interface ApiEntitySpec extends BaseEntitySpec {
  type: string;
  lifecycle: string;
  owner: string;
  system?: string;
  definition: string;
}

export const generateApiEntity = (params: EntityGeneratorParams<ApiEntitySpec>): Entity => {
  const { name, owner } = params;
  const defaultSpec = {
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

  return createBaseEntity<ApiEntitySpec>(
    "API",
    params,
    (p: EntityGeneratorParams<ApiEntitySpec>) => ({
      ...defaultSpec,
      ...p.spec
    })
  );
};
