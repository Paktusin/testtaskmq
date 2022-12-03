export default function (request: IDBOpenDBRequest) {
  const db = request.result;
  const t_store = db.createObjectStore("temperature"); //migration
}
