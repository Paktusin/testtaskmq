import { tables } from "../tables";
import { ItemData } from "../types";
import migrations from "./migrations";

const version = 2;

function loadMigration(this: IDBOpenDBRequest, event: IDBVersionChangeEvent) {
  migrations[version] && migrations[version](this);
}

export function connect() {
  return new Promise<IDBDatabase>((resolve) => {
    const DBOpenRequest = window.indexedDB.open("test_mq", version);
    DBOpenRequest.onupgradeneeded = loadMigration;
    DBOpenRequest.onsuccess = function () {
      resolve(this.result);
    };
  });
}

export class DataService<T> {
  constructor(private table: string) {}

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

  async get(key: string) {}

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
