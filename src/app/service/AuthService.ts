'use client'

import {auth} from "@/app/lib/firebase";
import {deleteCookieServer} from "@/app/actions/CookieServar";
import {setCookieClient} from "@/app/actions/CookieClient";
import {signInWithEmailAndPassword, signOut} from "firebase/auth";

const singIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setCookieClient('token', userCredential.user.uid)
            return window.location.replace('/post/home');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            return errorCode
        });
}

export default singIn

export async function sinOut() {
    await deleteCookieServer('token')
    await signOut(auth)
    return window.location.replace('/login')
}