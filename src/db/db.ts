import { tables } from "../tables";
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
      this.toPromise(store.add(value))
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

  async all() {}

  async count() {
    return this.withStore<number>((store) => this.toPromise(store.count()));
  }
}

export const temperatureService = new DataService(tables.temparatures);
export const precipitationService = new DataService(tables.precipitation);
