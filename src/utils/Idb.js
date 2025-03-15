import { openDB } from "idb";

const DB_NAME = "DictionaryDB";
const STORE_NAME = "recentSearches";
const DB_VERSION = 2;

const initDB = async () => {
 

  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion, newVersion) {
      console.log(` Upgrading DB from version ${oldVersion} to ${newVersion}`);

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        console.log(` Creating object store: ${STORE_NAME}`);
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });

        console.log(" Creating 'timestamp' index");
        store.createIndex("timestamp", "timestamp", { unique: false });
      } else {
        console.log(" Object store already exists.");
        
      }
    },
  });
};
  
// Save searched word & translation
export const savePhrase = async (word, translation) => {
  const db = await initDB();
  console.log(` Saving phrase: ${word}`);
  await db.add(STORE_NAME, { word, translation, timestamp: Date.now() });
};

//  Retrieve recent phrases (limit 5)
export const getRecentPhrases = async (limit = 5) => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
  
    if (!store.indexNames.contains("timestamp")) {
      console.warn(" 'timestamp' index not found. Fetching all records instead.");
      const allPhrases = await store.getAll();
      return allPhrases.sort((a, b) => b.timestamp - a.timestamp).slice(0, limit);
    }
  
    // Fetch last `limit` entries sorted by timestamp
    const index = store.index("timestamp");
    const phrases = await index.getAll(null, limit);
    return phrases.reverse(); // Show latest first
  };
  