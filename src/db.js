import Dexie from 'dexie';

const db = new Dexie('PublicationDB');
db.version(1).stores({
  labels: '++id',
  publications: '++id',
  notes: '++id,publicationsId',
  notelabels: '++id,notesId,labelsId',
});
db.version(2).stores({
  labels: '++id',
  quotes: '++id',
  publications: '++id',
  notes: '++id,publicationsId',
  notelabels: '++id,notesId,labelsId',
});
db.version(3).stores({
  labels: '++id,title',
  quotes: '++id',
  publications: '++id',
  notes: '++id,publicationsId',
  notelabels: '++id,notesId,labelsId',
});

export default db;
