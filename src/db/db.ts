import { tables } from "../tables";
import { ItemData } from "../types";

const version = 2;

export function connect() {
  return new Promise<IDBDatabase>((resolve) => {
    const DBOpenRequest = window.indexedDB.open("test_mq", version);
    DBOpenRequest.onupgradeneeded = function () {
      this.result.createObjectStore(tables.temparatures);
      this.result.createObjectStore(tables.precipitation);
      this.result.createObjectStore(tables.loaded);
    };
    DBOpenRequest.onsuccess = function () {
      resolve(this.result);
    };
  });
}

export class DataService<T> {
  constructor(public table: string) {}

  async withStore<T>(fn: (store: IDBObjectStore) => Promise<T>) {
    const db = await connect();
    const transaction = db.transaction([this.table], "readwrite");
    return fn(transaction.objectStore(this.table));
  }

  async put(key: string, value: T) {
    return this.withStore<IDBValidKey>((store) =>
      this.toPromise(store.put(value, key))
    );
  }

  toPromise(fn: IDBRequest): Promise<any> {
    return new Promise(
      (resolve) =>
        (fn.onsuccess = function () {
          resolve(this.result);
        })
    );
  }

  async get(key: string) {
    return this.withStore<T>((store) => this.toPromise(store.get(key)));
  }

  async all() {
    return this.withStore<T[]>((store) => this.toPromise(store.getAll()));
  }

  async bound(keyFrom: string, keyTo: string) {
    const keyRangeValue = IDBKeyRange.bound(keyFrom, keyTo, false, true);
    return this.withStore<T[]>((store) => {
      return new Promise((resolve) => {
        const res: T[] = [];
        store.openCursor(keyRangeValue).onsuccess = async function () {
          if (this.result) {
            res.push(this.result.value);
            this.result.continue();
          } else {
            resolve(res);
          }
        };
      });
    });
  }

  async count() {
    return this.withStore<number>((store) => this.toPromise(store.count()));
  }
}

export const temperatureService = new DataService<ItemData>(
  tables.temparatures
);
export const precipitationService = new DataService<ItemData>(
  tables.precipitation
);

export const updateService = new DataService<number>(tables.loaded);
