import { KeyValueStore } from '../KeyValueStore';

describe('KeyValueStore', () => {
  let store: KeyValueStore;

  beforeEach(() => {
    store = new KeyValueStore();
  });

  test('set and get a value', () => {
    store.set('foo', 'bar');
    expect(store.get('foo')).toBe('bar');
  });

  test('delete a key', () => {
    store.set('a', 10);
    store.delete('a');
    expect(store.get('a')).toBeUndefined();
  });

  test('begin and rollback a transaction', () => {
    store.set('x', 1);
    store.begin();
    store.set('x', 2);
    store.rollback();
    expect(store.get('x')).toBe(1);
  });

  test('begin and commit a transaction', () => {
    store.set('x', 1);
    store.begin();
    store.set('x', 2);
    store.commit();
    expect(store.get('x')).toBe(2);
  });

  test('nested transactions commit correctly', () => {
    store.set('k', 'v1');
    store.begin();
    store.set('k', 'v2');
    store.begin();
    store.set('k', 'v3');
    store.commit(); // commit inner
    expect(store.get('k')).toBe('v3'); // txn2 committed into txn1
    store.commit(); // commit outer
    expect(store.get('k')).toBe('v3');
  });

  test('commitAll merges all layers', () => {
    store.set('a', 1);
    store.begin();
    store.set('a', 2);
    store.begin();
    store.set('b', 3);
    store.commitAll();
    expect(store.get('a')).toBe(2);
    expect(store.get('b')).toBe(3);
  });

  test('rollback with no transaction throws', () => {
    expect(() => store.rollback()).toThrow("No active transaction to rollback.");
  });

  test('commit with no transaction throws', () => {
    expect(() => store.commit()).toThrow("No active transaction to commit.");
  });
});