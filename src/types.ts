export type EntityKind = 'API' | 'Component' | 'Domain' | 'Group' | 'Location' | 'Resource' | 'System' | 'Template' | 'User';
export interface Entity {
  apiVersion: string;
  kind: EntityKind;
  metadata: EntityMetadata;
  spec: Record<string, unknown>;
}

export interface EntityLink {
  url: string;
  title?: string;
  icon?: string;
  type?: string;
}

export interface EntityMetadata {
  name: string;
  description?: string;
  annotations?: Record<string, string>;
  labels?: Record<string, string>;
  tags?: string[];
  links?: EntityLink[];
}
