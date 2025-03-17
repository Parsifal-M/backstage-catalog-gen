import { faker } from "@faker-js/faker";
import { Entity } from "../../types";
import { EntityGeneratorParams, WellKnownLifecycle, BaseEntitySpec } from "../types";

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
