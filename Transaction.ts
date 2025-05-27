import { ITransaction } from "./Interfaces/Itransaction";
import { IKeyValueAccess } from "./Interfaces/IKeyValueaccess";


export class Transaction implements ITransaction {
  private data: Map<string, any> = new Map();
  private deletedKeys: Set<string> = new Set();

  set(key: string, value: any): void {
    this.data.set(key, value);
    this.deletedKeys.delete(key);
  }

  get(key: string): any | undefined {
    if (this.deletedKeys.has(key)) return undefined;
    return this.data.get(key);
  }

  delete(key: string): void {
    this.data.delete(key);
    this.deletedKeys.add(key);
  }

  has(key: string): boolean {
    if (this.deletedKeys.has(key)) return false;
    return this.data.has(key);
  }

  mergeInto(parent: IKeyValueAccess): void {
    for (const [key, value] of this.data.entries()) {
      parent.set(key, value);
    }
    for (const key of this.deletedKeys) {
      parent.delete(key);
    }
  }
}