import { Entity } from "../types";
import { ApiEntitySpec } from "./kinds/api";
import { ComponentEntitySpec } from "./kinds/component";
import { DomainEntitySpec } from "./kinds/domain";
import { GroupEntitySpec } from "./kinds/group";
import { LocationEntitySpec } from "./kinds/location";
import { ResourceEntitySpec } from "./kinds/resource";
import { SystemEntitySpec } from "./kinds/system";
import { TemplateEntitySpec } from "./kinds/template";
import { UserEntitySpec } from "./kinds/user";

export interface EntityProfile {
  displayName?: string;
  email?: string;
  picture?: string;
}

export type WellKnownLifecycle = 'experimental' | 'production' | 'deprecated';

export interface BaseEntitySpec {
  type?: string;
  owner: string;
  [key: string]: unknown;
}

export type EntitySpecMap = {
  API: ApiEntitySpec;
  Component: ComponentEntitySpec;
  Domain: DomainEntitySpec;
  Group: GroupEntitySpec;
  Location: LocationEntitySpec;
  Resource: ResourceEntitySpec;
  System: SystemEntitySpec;
  Template: TemplateEntitySpec;
  User: UserEntitySpec;
}

export interface EntityGeneratorParams<T> {
  name: string;
  owner?: string;
  annotations?: Record<string, string>;
  spec?: Partial<T>;
}

export type EntityGenerator<T> = (params: EntityGeneratorParams<T>) => Entity;
