import { faker } from "@faker-js/faker";
import { Entity, EntityKind } from "../types";
import { EntityGeneratorParams } from "./types";

export function createBaseEntity<T>(
  kind: EntityKind,
  params: EntityGeneratorParams<T>,
  specGenerator: (params: EntityGeneratorParams<T>) => Record<string, unknown>
): Entity {
  const { name, annotations, owner } = params;

  return {
    apiVersion: kind === "Template" ? "backstage.io/v1beta2" : "backstage.io/v1alpha1",
    kind,
    metadata: {
      name,
      description: faker.commerce.productDescription(),
      ...(annotations && Object.keys(annotations).length > 0 ? { annotations } : null)
    },
    spec: {
      owner: owner ?? getDefaultOwnerForKind(kind),
      ...specGenerator(params)
    }
  };
}

/**
 * Helper to provide default owners by entity kind when no owner is provided in the params
 */
function getDefaultOwnerForKind(kind: string): string {
  const defaultOwners: Record<string, string> = {
    'Component': 'team-a',
    'API': 'team-b',
    'System': 'team-b',
    'Template': 'team-platform',
    'Domain': 'team-platform',
    'Group': 'team-platform',
    'Location': 'team-platform',
    'Resource': 'team-platform',
    'User': 'team-platform',
  };

  return defaultOwners[kind] || 'team-a';
}
