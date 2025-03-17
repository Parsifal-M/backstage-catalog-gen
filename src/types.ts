export type EntityKind = 'API' | 'Component' | 'Domain' | 'Group' | 'Location' | 'Resource' | 'System' | 'Template' | 'User';
export interface Entity {
  apiVersion: string;
  kind: EntityKind;
  metadata: EntityMetadata;
  spec: Record<string, unknown>;
}

export interface EntityMetadata {
  name: string;
  description?: string;
  annotations?: Record<string, string>;
  labels?: Record<string, string>;
  tags?: string[];
  links?: EntityLink[];
}

export interface EntityLink {
  url: string;
  title?: string;
  icon?: string;
  type?: string;
}

export interface EntityProfile {
  displayName?: string;
  email?: string;
  picture?: string;
}

export interface BaseEntitySpec {
  type?: string;
  owner: string;
  [key: string]: unknown;
}

export type WellKnownComponentType = 'website' | 'service' | 'library';
export type WellKnownLifecycle = 'experimental' | 'production' | 'deprecated';

// Component Entity Spec
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

// API Entity Spec
export interface ApiEntitySpec extends BaseEntitySpec {
  type: string;
  lifecycle: string;
  owner: string;
  system?: string;
  definition: string;
}

// System Entity Spec
export interface SystemEntitySpec extends BaseEntitySpec {
  owner: string;
  domain?: string;
  type?: string;
}

// Resource Entity Spec
export interface ResourceEntitySpec extends BaseEntitySpec {
  type: string;
  owner: string;
  system?: string;
  dependsOn?: string[];
  dependencyOf?: string[];
}

// Group Entity Spec
export interface GroupEntitySpec extends BaseEntitySpec {
  type: string;
  profile?: EntityProfile;
  parent?: string;
  children: string[];
  members: string[];
}

// User Entity Spec
export interface UserEntitySpec {
  profile?: EntityProfile;
  memberOf: string[];
}

// Domain Entity Spec
export interface DomainEntitySpec extends BaseEntitySpec {
  owner: string;
  subdomainOf?: string;
  type?: string;
}

// Location Entity Spec
export interface LocationEntitySpec {
  type?: string;
  target?: string;
  targets?: string[];
  presence?: "required" | "optional";
}

// Template Parameter
export interface TemplateParameter {
  title: string;
  required?: string[];
  properties: Record<string, {
    title?: string;
    type?: string;
    description?: string;
    [key: string]: unknown;
  }>;
}

// Template Step
export interface TemplateStep {
  id: string;
  name: string;
  action: string;
  input: Record<string, unknown>;
}

// Template Entity Spec
export interface TemplateEntitySpec {
  owner: string;
  type: string;
  parameters: TemplateParameter[];
  steps: TemplateStep[];
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
