/* eslint-disable no-restricted-globals */
const version = 1;
const baseName = "test_mq";
const updateTable = "updated";
const tables = ["temperature", "precipitation"];
let db;

self.onfetch = (e) => {
  const requestURL = new URL(e.request.url),
    path = requestURL.pathname;
  if (path.indexOf("/data/") !== -1) {
    const requestedTable = tableFromPath(path);
    if (tables.indexOf(requestedTable) !== -1) {
      e.respondWith(getData(requestedTable, path));
    }
  }
};

let progress = {};

async function update(table, url) {
  if (progress[table]) {
    return;
  } else {
    progress[table] = true;
  }
  const conn = await connect();
  const backendData = await fetch(url).then((res) => res.json());
  for (let row of backendData) {
    await toPromise(getStore(table, conn).put(row, row.t));
  }
  await toPromise(getStore(updateTable, conn).put(table, 1));
  progress[table] = false;
}

async function getData(table, url) {
  let res = [];
  try {
    const conn = await connect();
    const updated = await toPromise(getStore(updateTable, conn).get(table));
    if (!updated) {
      update(table, url);
    }
    const count = await toPromise(getStore(table, conn).count());
    if (!count) {
      res = await fetch(url);
    } else {
      res = await toPromise(getStore(table, conn).getAll()); //can insert params query from to logic here bound()
    }
  } catch (err) {
    console.error(err);
  }
  return new Response(JSON.stringify(res), {
    headers: { "content-type": "application/json" },
  });
}

function tableFromPath(path) {
  return path.substring("/data/".length, path.length - ".json".length);
}

function getStore(table, conn) {
  return conn.transaction([table], "readwrite").objectStore(table);
}

function toPromise(fn) {
  return new Promise(
    (resolve) =>
      (fn.onsuccess = function () {
        resolve(this.result);
      })
  );
}

function connect() {
  return new Promise((resolve) => {
    if (db) {
      resolve(db);
    } else {
      const DBOpenRequest = self.indexedDB.open(baseName, version);
      DBOpenRequest.onupgradeneeded = function () {
        this.result.createObjectStore(updateTable);
        for (let table of tables) {
          this.result.createObjectStore(table);
        }
      };
      DBOpenRequest.onsuccess = function () {
        db = this.result;
        resolve(db);
      };
    }
  });
}
