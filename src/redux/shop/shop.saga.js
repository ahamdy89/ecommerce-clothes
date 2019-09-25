import {takeLatest, call, put} from 'redux-saga/effects';
import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import {fetchCollectionsSucccess, fetchCollectionsFAILURE} from './shop.action';

// takeEvery listens to every action with specific types
// takelatest listens to last action with specific types

export function* fetchCollectionsAsync(){
   try {
    const collectionRef = firestore.collection('collections');

    const snapshot = yield collectionRef.get();
 
    const collectionsMap = yield call (convertCollectionsSnapshotToMap, snapshot);

    yield put(fetchCollectionsSucccess(collectionsMap));

   } catch (error) {
       yield put(fetchCollectionsFAILURE(error.message))
   }




//    collectionRef.get().then(snapshot => {
//       const collectionsMap =  convertCollectionsSnapshotToMap(snapshot);
//       dispatch(fetchCollectionsSucccess(collectionsMap));
//     }).catch(error => dispatch(fetchCollectionsFAILURE(error.message)))
}

// will use takelatest cause we want to issue the call of the api one time

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
}