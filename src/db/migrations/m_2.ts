import m_1 from "./m_1";

export default function (request: IDBOpenDBRequest) {
  m_1(request);
  const db = request.result;
  const store = db.createObjectStore("precipitation", { keyPath: "t" }); //migration
  store.createIndex("v", "v", { unique: false });
}
