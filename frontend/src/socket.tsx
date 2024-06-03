"use client";
import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5005';

let session = ''; // Provide a default value for session
if(typeof window !== 'undefined'){
    session = window.localStorage.getItem('session') || '';
}
export const socket = io("http://localhost:5005", {
    extraHeaders: {
        session: session,
    },
});

