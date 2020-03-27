import localforage from 'localforage';

const Storage = localforage;
Storage.config({
  driver: localforage.LOCALSTORAGE,
  version: 0.1,
  storeName: 'Safe Grid',
  description: 'Safe Grid Local Store',
});

export default Storage;
