import { Entity } from "../../types";
import { BaseEntitySpec, EntityGeneratorParams } from "../types";
import { createBaseEntity } from "../createBaseEntity";

export interface ResourceEntitySpec extends BaseEntitySpec {
  type: string;
  owner: string;
  system?: string;
  dependsOn?: string[];
  dependencyOf?: string[];
}

export const generateResourceEntity = (params: EntityGeneratorParams<ResourceEntitySpec>): Entity => {
  const defaultSpec = {
    system: params.spec?.system,
    dependsOn: params.spec?.dependsOn,
    dependencyOf: params.spec?.dependencyOf
  };

  return createBaseEntity<ResourceEntitySpec>(
    "Resource",
    params,
    (p: EntityGeneratorParams<ResourceEntitySpec>) => ({
      ...defaultSpec,
      ...p.spec
    })
  );
};
