export interface SignupFormData {
    name: string;
    email: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface AuthResponse {
    user: User;
}

/*
These mirror the backend types from Step 8c — this is intentional.
 Frontend and backend are separate TypeScript projects (no shared types between them yet, 
 that's a more advanced setup we're not doing here), 
 so we define matching shapes on each side by hand. Keeping them consistent is on us as developers.
*/