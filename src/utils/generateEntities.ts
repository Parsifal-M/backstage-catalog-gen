import yaml from "js-yaml";
import { faker } from "@faker-js/faker";
import { generateEntity } from "../generators/registry";
import { EntityKind, Entity } from "../types";

export const generateEntities = (
  entityKind: EntityKind,
  amount: number,
  owner?: string | null,
  annotations?: Record<string, string>
): string => {
  const entities: Entity[] = [];

  for (let i = 0; i < amount; i++) {
    const entity = generateEntity(entityKind, {
      name:
        entityKind !== "User"
          ? `example-${faker.hacker.abbreviation().toLowerCase()}-${i + 1}`
          : `example-${faker.person.firstName().toLowerCase()}-${faker.person.lastName().toLowerCase()}-${i + 1}`,
      owner: owner || undefined,
      annotations,
      spec: {}, // todo: pass any custom spec options if needed
    });

    entities.push(entity);
  }

  const yamlDocuments = entities.map((entity) =>
    yaml.dump(entity, { lineWidth: -1 })
  );

  const result = `# This file contains ${amount} Backstage ${entityKind} entities\n\n${yamlDocuments.join(
    "---\n"
  )}`;

  return result;
};
