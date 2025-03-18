import { Entity } from "../../types";
import { BaseEntitySpec, EntityGeneratorParams } from "../types";
import { createBaseEntity } from "../createBaseEntity";

export interface SystemEntitySpec extends BaseEntitySpec {
  owner: string;
  domain?: string;
  type?: string;
}

export const generateSystemEntity = (params: EntityGeneratorParams<SystemEntitySpec>): Entity => {
  return createBaseEntity<SystemEntitySpec>(
    "System",
    params,
    (p: EntityGeneratorParams<SystemEntitySpec>) => ({
      ...p.spec
    })
  );
};
