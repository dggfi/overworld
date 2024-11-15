// *** NOTES***
// - Widgets with ownerId NULL belong to the local space only
// - All widget IDs should be UUIDs
// - The type of Widget is specified by its KIND 


// *** Single records

export interface Server {
    id?: string, // UUID
    name: string,
    address: string, // Format https:{domain}:{port}
    username: string | null,
}

export interface LocalUser {
    id: string, // UUID
    name: string, // Defaults to LOCAL,
    password: string | null,
    lastServer: Server | null,
    authoredWidgets: string[], // resolve to 
    sharedWidgets: Widget[],
    characters: string[], //
}

export interface Options {
    rememberLastServer: boolean,
    rememberUsername: boolean,
    rememberPassword: boolean,
    autoShare: boolean
}

export interface NetworkUser {
    id: string, // UUID
    name: string,
    sharedWidgets: Widget[]
}

// Authoring
export interface Widget {
    id: string, // UUID
    authorId: string | null, // UUID
    kind: string, // Key for AllWidgets, preferably unique
    ownerId: string, // User ID
    active: boolean,
}

export interface Widgets {
    [key: string]: Widget // KEY: kind
}

export interface Servers {
    [key: string]: Server
}

// Widgets
export interface Widget {
    id: string, // UUID
    ownerId: string,
    active: boolean,
    kind: string
}

// *** Collections / Database
export interface Users {
    [key: string]: LocalUser | NetworkUser
}

// *** Original Widget Blueprints
export interface DimensionalWidget extends Widget {
    defaultX: number,
    defaultY: number,
    x: number,
    y: number,
    defaultWidth: number,
    defaultHeight: number,
    width: number,
    height: number
}

// Client
export interface Userspace {
    widgetsAvailable: string[],
}