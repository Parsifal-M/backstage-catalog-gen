import { Entity } from "../../types";
import { BaseEntitySpec, EntityGeneratorParams } from "../types";
import { createBaseEntity } from "../createBaseEntity";
export interface DomainEntitySpec extends BaseEntitySpec {
  owner: string;
  subdomainOf?: string;
  type?: string;
}

export const generateDomainEntity = (params: EntityGeneratorParams<DomainEntitySpec>): Entity => {
  return createBaseEntity<DomainEntitySpec>(
    "Domain",
    params,
    (p: EntityGeneratorParams<DomainEntitySpec>) => ({
      ...p.spec
    })
  );
};
