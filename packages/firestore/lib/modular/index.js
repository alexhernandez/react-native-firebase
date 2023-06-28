/**
 * @typedef {import('..').FirebaseFirestoreTypes.CollectionReference} CollectionReference
 * @typedef {import('..').FirebaseFirestoreTypes.DocumentData} DocumentData
 * @typedef {import('..').FirebaseFirestoreTypes.DocumentReference} DocumentReference
 * @typedef {import('..').FirebaseFirestoreTypes.FieldPath} FieldPath
 * @typedef {import('..').FirebaseFirestoreTypes.Module} Firestore
 * @typedef {import('..').FirebaseFirestoreTypes.Query} Query
 * @typedef {import('..').FirebaseFirestoreTypes.SetOptions} SetOptions
 * @typedef {import('..').FirebaseFirestoreTypes.Settings} FirestoreSettings
 * @typedef {import('./index').PartialWithFieldValue} PartialWithFieldValue
 * @typedef {import('./index').UpdateData} UpdateData
 * @typedef {import('@firebase/app').FirebaseApp} FirebaseApp
 */

import { firebase } from '../index';

/**
 * @param {FirebaseApp?} app
 * @returns {Firestore}
 */
export function getFirestore(app) {
  if (app) {
    return firebase.firestore(app);
  }

  return firebase.firestore();
}

/**
 * @param {Firestore | CollectionReference | DocumentReference<unknown>} parent
 * @param {string?} path
 * @param {string?} pathSegments
 * @returns {DocumentReference}
 */
export function doc(parent, path, ...pathSegments) {
  if (pathSegments && pathSegments.length) {
    path = path + '/' + pathSegments.map(e => e.replace(/^\/|\/$/g, '')).join('/');
  }

  return parent.doc(path);
}

/**
 * @param {Firestore | DocumentReference<unknown> | CollectionReference<unknown>} parent
 * @param {string} path
 * @param {string?} pathSegments
 * @returns {CollectionReference<DocumentData>}
 */
export function collection(parent, path, ...pathSegments) {
  if (pathSegments && pathSegments.length) {
    path = path + '/' + pathSegments.map(e => e.replace(/^\/|\/$/g, '')).join('/');
  }

  return parent.collection(path);
}

/**
 * @param {Firestore} firestore
 * @param {string} collectionId
 * @returns {Query<DocumentData>}
 */
export function collectionGroup(firestore, collectionId) {
  return firestore.collectionGroup(collectionId);
}

/**
 * @param {DocumentReference} reference
 * @param {PartialWithFieldValue} data
 * @param {SetOptions?} options
 * @returns {Promise<void>}
 */
export function setDoc(reference, data, options) {
  return reference.set(data, options);
}

/**
 * @param {DocumentReference} reference
 * @param {string | FieldPath | UpdateData} fieldOrUpdateData
 * @param {unknown?} value
 * @param {unknown} moreFieldsAndValues
 * @returns {Promise<void>}
 */
export function updateDoc(reference, fieldOrUpdateData, value, ...moreFieldsAndValues) {
  if (!value) {
    return reference.update(fieldOrUpdateData);
  }

  if (!moreFieldsAndValues || !Array.isArray(moreFieldsAndValues)) {
    return reference.update(fieldOrUpdateData, value);
  }

  return reference.update(fieldOrUpdateData, value, ...moreFieldsAndValues);
}

/**
 * @param {CollectionReference} reference
 * @param {WithFieldValue} data
 * @returns {Promise<DocumentReference>}
 */
export function addDoc(reference, data) {
  return reference.add(data);
}

/**
 * @param {Firestore} firestore
 * @returns {Promise<void>}
 */
export function enableNetwork(firestore) {
  return firestore.enableNetwork();
}

/**
 * @param {Firestore} firestore
 * @returns {Promise<void>}
 */
export function disableNetwork(firestore) {
  return firestore.disableNetwork();
}

/**
 * @param {Firestore} firestore
 * @returns {Promise<void>}
 */
export function clearPersistence(firestore) {
  return firestore.clearPersistence();
}

/**
 * @param {Firestore} firestore
 * @returns {Promise<void>}
 */
export function terminate(firestore) {
  return firestore.terminate();
}

/**
 * @param {Firestore} firestore
 * @returns {Promise<void>}
 */
export function waitForPendingWrites(firestore) {
  return firestore.waitForPendingWrites();
}

/**
 * @param {FirebaseApp} app
 * @param {FirestoreSettings} settings
 * @param {string?} databaseId
 * @returns {Promise<Firestore>}
 */
// FIXME: databaseId is not supported by compat API?
// FIXME: as per web SDK, initializeFirestore would override existing firestore instance.
//       Calling getFirestore() after initializeFirestore() would return this new instance.
//       Need to figure out how to handle this using the compat API.
export async function initializeFirestore(app, settings, databaseId) {
  const firestore = firebase.firestore(app);
  await firestore.settings(settings);
  return firestore;
}

export * from './query';
export * from './snapshot';
export * from './Bytes';
export * from './FieldPath';
export * from './FieldValue';
