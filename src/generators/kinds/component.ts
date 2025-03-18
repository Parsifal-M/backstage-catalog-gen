import { faker } from "@faker-js/faker";
import { Entity } from "../../types";
import { EntityGeneratorParams, WellKnownLifecycle, BaseEntitySpec } from "../types";
import { createBaseEntity } from "../createBaseEntity";

export type WellKnownComponentType = 'website' | 'service' | 'library';
export interface ComponentEntitySpec extends BaseEntitySpec {
  type: WellKnownComponentType;
  lifecycle: WellKnownLifecycle;
  owner: string;
  system?: string;
  subcomponentOf?: string;
  providesApis?: string[];
  consumesApis?: string[];
  dependsOn?: string[];
  dependencyOf?: string[];
}

export const generateComponentEntity = (params: EntityGeneratorParams<ComponentEntitySpec>): Entity => {
  const componentTypes = ["service", "website", "library"];
  const lifecycleStates = ["experimental", "production", "deprecated"];

  const defaultSpec = {
    type: componentTypes[Math.floor(Math.random() * componentTypes.length)],
    lifecycle: lifecycleStates[0]
  };

  return createBaseEntity<ComponentEntitySpec>(
    "Component",
    params,
    (p: EntityGeneratorParams<ComponentEntitySpec>) => ({
      ...defaultSpec,
      ...p.spec
    })
  );
};
