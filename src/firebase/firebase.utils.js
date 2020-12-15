import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAI2JuJx2ml9RTkV8N1RbfUN_0GOAH9gGA",
    authDomain: "crwn-db-3b573.firebaseapp.com",
    projectId: "crwn-db-3b573",
    storageBucket: "crwn-db-3b573.appspot.com",
    messagingSenderId: "856943036240",
    appId: "1:856943036240:web:c47e3446f60298f4dc4e55",
    measurementId: "G-B9151NF8SM"
  };

  export const createUserProfileDocument = async (userAuth, additionalData ) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (err) {
        console.log('error creating user', err.message);
      }
    }

    return userRef;

  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;