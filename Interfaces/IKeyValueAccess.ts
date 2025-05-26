export interface IKeyValueAccess {
  set(key: string, value: any): void;
  get(key: string): any | undefined;
  delete(key: string): void;
  has(key: string): boolean;
}