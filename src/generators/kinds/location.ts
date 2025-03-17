import { Entity, LocationEntitySpec } from "../../types";
import { EntityGeneratorParams } from "../types";

/**
 * Generates a Location entity
 */
export const generateLocationEntity = (params: EntityGeneratorParams<LocationEntitySpec>): Entity => {
  const { name, annotations } = params;
  const targetSpec: { target?: string; targets?: string[] } = {};

  if (params.spec?.target) {
    targetSpec.target = params.spec.target;
  } else if (params.spec?.targets && params.spec.targets.length > 0) {
    targetSpec.targets = params.spec.targets;
  } else {
    targetSpec.targets = [
      `http://github.com/myorg/myproject/${name}/catalog-info-1.yaml`,
      `http://github.com/myorg/myproject/${name}/catalog-info-2.yaml`
    ];
  }

  return {
    apiVersion: "backstage.io/v1alpha1",
    kind: "Location",
    metadata: {
      name,
      description: `Location for ${name} resources`,
      annotations
    },
    spec: {
      type: params.spec?.type || "url",
      presence: params.spec?.presence || "required",
      ...targetSpec
    }
  };
};
