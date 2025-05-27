This is in memory key value store written in TypeScript nested transactions. 

#Archictecture 

How I decided to split this up is by creating three interfaces. There is one shared interface in IKeyValueaccess, this is extended by both IKeyValueStore, and ITransaction.
This was because both , KeyValueStore and ITransaction, had the following shared operations.

  set(key: string, value: any): void;
  get(key: string): any | undefined;
  delete(key: string): void;
  has(key: string): boolean;

However I decided against having one shared implementation, because it allows for better encapsulation, each class handles its own logic. 

#Unit Tests
The unit tests cover the following behaviors.
- Set/Get/Delete behavior
- Transaction begin/commit/rollback
- Nested transactions
- `commitAll` behavior


#to run the test, be in teh root folder, and run 
npm install
npx jest