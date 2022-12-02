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

  async put(value: any) {
    const db = await connect();
    const transaction = db.transaction([this.table], "readwrite");
    const objectStore = transaction.objectStore(this.table);
    await new Promise(
      (resolve) => (objectStore.add(value).onsuccess = resolve)
    );
  }

  async get<T = any>(key: string) {}

  async all<T = any>() {}
}

export const temperatureService = new DataService(tables.temparatures);
export const precipitationService = new DataService(tables.precipitation);
