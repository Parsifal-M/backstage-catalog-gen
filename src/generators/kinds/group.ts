import { Entity } from "../../types";
import { BaseEntitySpec, EntityGeneratorParams, EntityProfile } from "../types";
import { createBaseEntity } from "../createBaseEntity";
export interface GroupEntitySpec extends BaseEntitySpec {
  type: string;
  profile?: EntityProfile;
  parent?: string;
  children: string[];
  members: string[];
}

export const generateGroupEntity = (params: EntityGeneratorParams<GroupEntitySpec>): Entity => {
  const { name, owner } = params;
  const defaultSpec = {
    type: "team",
    profile: {
      displayName: `${name} Team`,
      email: `${name}@example.com`,
      picture: `https://example.com/avatar/${name}.png`
    },
    parent: owner ?? 'team-a',
    children: [],
    members: []
  };

  return createBaseEntity<GroupEntitySpec>(
    "Group",
    params,
    (p: EntityGeneratorParams<GroupEntitySpec>) => ({
      ...defaultSpec,
      ...p.spec,
      owner: undefined
    })
  );
};
