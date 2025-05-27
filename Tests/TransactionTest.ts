import { Transaction } from '../Transaction';
import type { IKeyValueAccess } from '../Interfaces/IKeyValueaccess';

describe('Transaction', () => {
  let txn: Transaction;

  beforeEach(() => {
    txn = new Transaction();
  });

  test('set and get a value', () => {
    txn.set('a', 10);
    expect(txn.get('a')).toBe(10);
  });

  test('delete a key', () => {
    txn.set('a', 20);
    txn.delete('a');
    expect(txn.get('a')).toBeUndefined();
    expect(txn.has('a')).toBe(false); // This will be false, because it's deleted
  });

  test('has returns true for set key', () => {
    txn.set('x', 'value');
    expect(txn.has('x')).toBe(true);
  });

  test('has returns true for deleted key', () => {
    txn.set('x', 'value');
    txn.delete('x');
    expect(txn.has('x')).toBe(false); // Tracks as not present after deletion
  });

  test('mergeInto applies set and delete to parent', () => {
    class MockParent implements IKeyValueAccess {
      private store = new Map<string, any>();

      set(key: string, val: any) {
        this.store.set(key, val);
      }

      get(key: string) {
        return this.store.get(key);
      }

      delete(key: string) {
        this.store.delete(key);
      }

      has(key: string) {
        return this.store.has(key);
      }
    }

    const parent = new MockParent();

    txn.set('a', 42);
    txn.set('b', 99);
    txn.delete('c');

    parent.set('c', 'old'); // deleted from child
    txn.mergeInto(parent);

    expect(parent.get('a')).toBe(42);
    expect(parent.get('b')).toBe(99);
    expect(parent.has('c')).toBe(false);
  });
});