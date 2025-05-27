import { IKeyValueAccess } from "./IKeyValueaccess";


export interface IKeyValueStore extends IKeyValueAccess {
  begin(): void;
  commit(): void;
  commitAll(): void;
  rollback(): void;
}