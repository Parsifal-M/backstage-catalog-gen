import { generateApiEntity } from "./kinds/api";
import { generateComponentEntity } from "./kinds/component";
import { generateDomainEntity } from "./kinds/domain";
import { generateGroupEntity } from "./kinds/group";
import { generateLocationEntity } from "./kinds/location";
import { generateSystemEntity } from "./kinds/system";
import { generateTemplateEntity } from "./kinds/template";
import { generateUserEntity } from "./kinds/user";
import { generateResourceEntity } from "./kinds/resource";
import { EntityGeneratorParams, EntityGenerator } from "./types";
import { EntitySpecMap, Entity } from "../types";

/**
 * Registry of entity generators
 */
export const generators: {
  [K in keyof EntitySpecMap]: EntityGenerator<EntitySpecMap[K]>
} = {
  API: generateApiEntity,
  Component: generateComponentEntity,
  Domain: generateDomainEntity,
  Group: generateGroupEntity,
  User: generateUserEntity,
  Resource: generateResourceEntity,
  System: generateSystemEntity,
  Location: generateLocationEntity,
  Template: generateTemplateEntity
};

/**
 * Generates an entity of a given kind
 */
export const generateEntity = <K extends keyof EntitySpecMap>(
  kind: K,
  params: EntityGeneratorParams<EntitySpecMap[K]>
): Entity => {
  const generator = generators[kind];
  if (!generator) {
    throw new Error(`Unknown entity kind: ${kind}. Available kinds: ${Object.keys(generators).join(', ')}`);
  }

  return generator(params);
};
