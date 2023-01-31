// import * as fb from '../firebase.js';
import { defineStore } from 'pinia';
import { ref as vueRef, computed } from 'vue';
import { useRouter } from 'vue-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { auth, db, database } from '../firebase'
import { getDatabase, ref, set, get } from "firebase/database";
// import { ref, onValue } from "firebase/database";

export const useUserStore = defineStore('authUser', () => {
  let userProfile = vueRef({ name: "pathan" });
  let userUID = vueRef();
  let userData = vueRef({})
  const isAuthenticated = vueRef(false);
  const router = useRouter();
  const db = getDatabase();
  // Create User
  async function createUser(email, password, first, last, phone, imageData) {
    try {
      console.log("USERSTORE CONSOLE", email, password, first, last, phone, imageData)
      const result = await createUserWithEmailAndPassword(auth, email, password)
      console.log("CONSOLE OF USER STORE user", result.user.email)
      userProfile.value = result.user
      userUID.value = result.user.uid;
      isAuthenticated.value = true;
      // Add User Info
      console.log("Debugging userProfile.value", userProfile.value, "Debugging userUiD.value", userUID.value, "result.USER.UID", result.user.uid)
      set(ref(db, "user/" + result.user.uid), {
        firstName: first,
        lastName: last,
        phoneNumber: phone,
        image: imageData
      })
      if (isAuthenticated) {
        router.push({
          name: 'todoview',
          params: {
            id: result.user.uid
          }
        })
      }
    } catch (error) {

      alert(error.message)
      // isAuthenticated.value = false;

    }
  }
  // Login User
  async function login(email, password) {
    try {
      const loginUser = await signInWithEmailAndPassword(auth, email, password)
      userProfile.value = loginUser.user
      userUID.value = loginUser.user.uid;
      console.log("LOGIN SUCCESSFULL Login User", loginUser,"UserProfile",userProfile.value,"UserUID.value",userUID.value)
           isAuthenticated.value = true;

      if (isAuthenticated) {
        router.push({
          name: 'todoview',
          params: {
            id: loginUser.user.uid
          }
        })
      }
      // isAuthenticated.value = true;
    } catch (error) {
      alert(error.message)
      // isAuthenticated.value = false;

    }
  }
  // fetch user info
  async function getUserData() {
    await get(ref(db, "user/" + userUID.value)).then((snapshot) => {
      if (snapshot.exists()) {
        userData.value = snapshot.val();
        // userUID.value = userData.value.user
        console.log(snapshot.val());
      }
      else {
        console.log("No Data available");
      }
    }).catch((error) => {
      console.log(error)
    });

  }
  // check user sign in or  not
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // const uid = user.uid;
      isAuthenticated.value = true;
      console.log("USER Sign in")
    } else {
      // User is signed out
      isAuthenticated.value = false;
      console.log("USER Sign out")
    }
  });
  return {
    createUser, isAuthenticated, userProfile, login, getUserData, userData, userUID
  }
})
