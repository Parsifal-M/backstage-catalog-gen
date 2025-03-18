import { Entity } from "../../types";
import { createBaseEntity } from "../createBaseEntity";
import { EntityGeneratorParams } from "../types";
export interface LocationEntitySpec {
  type?: string;
  target?: string;
  targets?: string[];
  presence?: "required" | "optional";
}

export const generateLocationEntity = (params: EntityGeneratorParams<LocationEntitySpec>): Entity => {
  const { name } = params;
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

  return createBaseEntity<LocationEntitySpec>(
    "Location",
    params,
    (p: EntityGeneratorParams<LocationEntitySpec>) => ({
      ...p.spec
    })
  );
};
