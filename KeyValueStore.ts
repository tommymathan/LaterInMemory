// KeyValueStore.ts
//This is the implmentation of the key value store, it has the following operations
//Set, Get, Delete, Has
// Begin , Commit , and rollback are used for transaction management. 


import { IKeyValueAccess } from "./Interfaces/IKeyValueaccess";
import { IKeyValueStore } from "./Interfaces/IKeyValueStore";
import { Transaction } from "./Transaction";

export class KeyValueStore implements IKeyValueStore {

  //This array is used to keep a stack of new transactions
  private transactions: IKeyValueAccess[] = [new Transaction()];

  //give you top most transaction
  private get current(): IKeyValueAccess {
    return this.transactions[this.transactions.length - 1];
  }

  //In the current transaction, set a value
  set(key: string, value: any): void {
    this.current.set(key, value);
  }

  //gets the values from the most recent transaction or returns undefined
  get(key: string): any | undefined {
    for (let i = this.transactions.length - 1; i >= 0; i--) {
      const txn = this.transactions[i];
      if (txn.has(key)) {
        return txn.get(key);
      }
    }
    return undefined;
  }


  //marks key for deletion in the current transaction
  delete(key: string): void {
    this.current.delete(key);
  }

  //checks for a key in any of the transactions
  has(key: string): boolean {
    for (let i = this.transactions.length - 1; i >= 0; i--) {
      if (this.transactions[i].has(key)) return true;
    }
    return false;
  }

  //creates a new transaction
  begin(): void {
    this.transactions.push(new Transaction());
  }

  //commits the current transaction, and merges it into the parent transaction
  commit(): void {
    if (this.transactions.length <= 1) {
      throw new Error("No active transaction to commit.");
    }
    const txn = this.transactions.pop() as Transaction;
    txn.mergeInto(this.current);
  }

  //This will commit all transactions
  commitAll(): void {
    while (this.transactions.length > 1) {
        const txn = this.transactions.pop() as Transaction;
        txn.mergeInto(this.current);
    }
}

  rollback(): void {
    if (this.transactions.length <= 1) {
      throw new Error("No active transaction to rollback.");
    }
    this.transactions.pop();
  }
}