import { IKeyValueAccess } from "./IKeyValueaccess";


export interface IKeyValueStore extends IKeyValueAccess {
  begin(): void;
  commit(): void;
  rollback(): void;
}