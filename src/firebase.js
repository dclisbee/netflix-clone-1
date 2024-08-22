import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBl32Z4fK8FWRPuYKaNfCqgH82-i03jrJ0",
  authDomain: "netflix-clone-b685a.firebaseapp.com",
  projectId: "netflix-clone-b685a",
  storageBucket: "netflix-clone-b685a.appspot.com",
  messagingSenderId: "1004607426998",
  appId: "1:1004607426998:web:387d1a783adfe5021b3117",
  measurementId: "G-9D9CC8K5D8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=> {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid, 
            name, 
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);

    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth)
}

export {auth, db, login, signup, logout};