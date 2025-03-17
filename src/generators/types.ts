import { Entity } from "../types";

export interface EntityGeneratorParams<T> {
  name: string;
  owner?: string;
  annotations?: Record<string, string>;
  spec?: Partial<T>;
}

export type EntityGenerator<T> = (params: EntityGeneratorParams<T>) => Entity;
