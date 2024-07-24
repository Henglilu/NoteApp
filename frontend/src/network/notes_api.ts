import { promises } from "dns";
import { Note } from "../models/note";
import { User } from "../models/user";
import { ConflictError, UnauthorizedError } from "../errors/http_erros";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const res = await fetch(input, init);
    if(res.ok) {
        return res
    }else {
        const errorBody = await res.json();
        const errorMessage = errorBody.error;
        if (res.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (res.status === 409) {
            throw new ConflictError(errorMessage)
        } else {
            throw Error("Request Failed with status: " + res.status + "message: " + errorMessage);
        }

        throw Error(errorMessage);
    }
}

export async function getLoginUser(): Promise<User> {
    const  res = await fetchData("/api/users", {method: "GET"})
    return res.json(); //will work if back and front are on the same url
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials:SignUpCredentials):Promise<User> {
    const res = await fetchData("/api/users/signup",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    })
    return res.json();
}

export interface loginCredentials {
    username: string,
    password: string,
}

export  async function login(credentials: loginCredentials): Promise<User> {
    const res = await fetchData("/api/users/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        })
        return res.json();
}

export async function logout() {
    await fetchData("api/users/logout", {method: "POST"})
}


export async function fetchNote(): Promise<Note[]>{
    const res = await fetch("/api/notes", {method: "GET"})
    return res.json();
}

export interface NoteInput {
    title: string;
    text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> { //create
    const res = await fetchData("/api/notes",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        }
    )
    return res.json()
}

export async function updateNote(noteId: string, note: NoteInput): Promise<Note> {
    const res = await fetchData("/api/notes/" + noteId, 
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        }
    )
    return res.json()
}

export async function deleteNote(noteId: string) { //delete
    await fetchData("/api/notes/" + noteId, {method: "DELETE"});
    
}