import { EntityType } from "../types";
import yaml from "js-yaml";
import { faker } from "@faker-js/faker";

interface EntityMetadata {
  name: string;
  description: string;
  annotations?: Record<string, string>;
}

interface EntitySpec {
  type?: string;
  lifecycle?: string;
  owner: string;
  definition?: string;
  domain?: string;
}

interface Entity {
  apiVersion: string;
  kind: string;
  metadata: EntityMetadata;
  spec: EntitySpec;
}

export const generateEntities = (
  entityType: EntityType,
  amount: number,
  owner?: string | null,
  annotations?: Record<string, string>
): string => {
  const entities: Entity[] = [];

  for (let i = 0; i < amount; i++) {
    const randomDescription = faker.commerce.productDescription();
    const entityName = `example-${faker.hacker.abbreviation().toLowerCase()}-${
      i + 1
    }`;
    const randomType = ["website", "service", "library"];

    const metadata: EntityMetadata = {
      name: entityName,
      description: randomDescription,
    };

    if (annotations && Object.keys(annotations).length > 0) {
      metadata.annotations = {
        ...annotations,
      };
    }

    const entity: Entity = {
      apiVersion: "backstage.io/v1alpha1",
      kind: entityType,
      metadata: metadata,
      spec: {
        owner: owner ?? "team-a",
      },
    };

    if (entityType === "Component") {
      entity.spec = {
        type: randomType[Math.floor(Math.random() * randomType.length)],
        lifecycle: "experimental",
        owner: owner ?? "team-a",
      };
    } else if (entityType === "API") {
      entity.spec = {
        type: "openapi",
        lifecycle: "production",
        owner: owner ?? "team-b",
        definition: `openapi: "3.0.0"
info:
  version: 1.0.0
  title: ${entityName}
  license:
    name: MIT`,
      };
    } else if (entityType === "System") {
      entity.spec = {
        owner: owner ?? "team-b",
        domain: `${faker.hacker
          .noun()
          .toLowerCase()
          .split(" ")
          .join("-")}-domain`,
      };
    } else if (entityType === "Resource") {
      entity.spec = {
        type: faker.database.engine().toLowerCase(),
        lifecycle: "experimental",
        owner: owner ?? "team-a",
      };
    }

    entities.push(entity);
  }

  const yamlDocuments = entities.map((entity) =>
    yaml.dump(entity, { lineWidth: -1 })
  );
  const result = `# This file contains ${amount} Backstage ${entityType} entities\n\n${yamlDocuments.join(
    "---\n"
  )}`;

  return result;
};
