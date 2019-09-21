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
  }


  firebase.initializeApp(config);

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