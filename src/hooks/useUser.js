// import { useEffect, useState } from "react"
import { db } from "../firebase";

export const useUser = () => {
    const addUser = async (loggedUser) => {
        const foundUser = await db.collection('users').where('uid', '==', loggedUser.uid).get();
    
        if (foundUser.empty) {
          db.collection('users').add({
            uid: loggedUser.uid,
            displayName: loggedUser.displayName,
            email: loggedUser.email,
            photoURL: loggedUser.photoURL,
          })
        }
      }

    return {
        addUser,
    }
}