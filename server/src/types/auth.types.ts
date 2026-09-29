export interface SignupInput {
    name: string;
    email: string;
    password: string;
}

export interface SafeUser {
    id: string;
    name: string;
    email: string; 
    role: string;
}

/*

SignupInput — the shape of the request body we expect on POST /api/auth/signup
SafeUser — the shape of the user data we're allowed to send back to the frontend. Notice: no password field at all — not even the hash. This type exists specifically to make it structurally impossible to accidentally leak the password hash in a response; if you tried to assign user.password to a SafeUser-typed variable, TypeScript would error, since password isn't even a valid property on that type.
*/