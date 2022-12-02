export default function (request: IDBOpenDBRequest) {
  const db = request.result;
  const t_store = db.createObjectStore("temperature", { keyPath: "t" }); //migration
  t_store.createIndex("v", "v", { unique: false });
}
