import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// configuration for the google firebase that comes from firebase account 
const config = {
    apiKey: "AIzaSyBahlA3GoHpkN8Ddn5HvQ0qgM8SeV7bTGM",
    authDomain: "ecommerce-clothes-db.firebaseapp.com",
    databaseURL: "https://ecommerce-clothes-db.firebaseio.com",
    projectId: "ecommerce-clothes-db",
    storageBucket: "",
    messagingSenderId: "620122127582",
    appId: "1:620122127582:web:008d23cbd7aabe8bec164f"
  };

  firebase.initializeApp(config);

  //extracting user information from google auth parameters.
  export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if(!userAuth) return;

// the path of the collection that will check for the user id in firebase database
    const userRef = firestore.doc(`users/${userAuth.uid}`)

    // will get a snapshot for the object about that user we did a check on
    const snapShot = await userRef.get();

    // if the property exists is false then we will store specific data in the database
    if(!snapShot.exists) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message)
      }
    }
    return userRef;
  };


  /* a function to add any static data we have in the project to the firebase database
  without do it manually
  */
 
  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    /* batch will take all sets requests and make it into on big request 
    to avoid connection fail in the middle of set process
    */
    const batch = firestore.batch();

    // will loop into objectsToAdd to set each key indpendendly cause firebase make only on set per request

    objectsToAdd.forEach(obj => {
      // create collections docs with unique id 
      const newDocRef = collectionRef.doc();
     
      // set values docs values using newDocRef using batch
      batch.set(newDocRef, obj)
    });

    // fire the batch request
    return await batch.commit()
  };

// convert the snapshot collection to object instead of Array
  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
      const {title, items} = doc.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
    });
    return transformedCollection.reduce((accumlator, collection)=> {
      accumlator[collection.title.toLowerCase()] = collection;
      return accumlator
    }, {});
  };

// exporting the firebase functions that we can use later
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  /* configure the sign in with google that will pop up accounts 
  list for the user to select an account to sign in with
*/


  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider);


  export default firebase;