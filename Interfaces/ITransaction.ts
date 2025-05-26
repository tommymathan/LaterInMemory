import { IKeyValueAccess } from "./IKeyValueaccess";


export interface ITransaction extends IKeyValueAccess {
  mergeInto(parent: IKeyValueAccess): void;
}