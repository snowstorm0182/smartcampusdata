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
db.version(4).stores({
  labels: '++id,title',
  quotes: '++id',
  forums: '++id',
  publications: '++id',
  notes: '++id,publicationsId',
  notelabels: '++id,notesId,labelsId',
});
db.version(5).stores({
  labels: '++id,title',
  quotes: '++id',
  forums: '++id',
  todos: '++id',
  publications: '++id',
  notes: '++id,publicationsId',
  notelabels: '++id,notesId,labelsId',
});
db.version(6).stores({
  labels: '++id,title',
  quotes: '++id',
  forums: '++id',
  todos: '++id',
  sections: '++id',
  publications: '++id',
  notes: '++id,publicationsId',
  notelabels: '++id,notesId,labelsId',
});

export default db;
