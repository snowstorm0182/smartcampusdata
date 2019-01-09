import Dexie from 'dexie';

const db = new Dexie('PublicationDB');
db.version(1).stores({
  labels: '++id',
  publications: '++id',
  notes: '++id,publicationsId',
  notelabels: '++id,notesId,labelsId',
});

export default db;
