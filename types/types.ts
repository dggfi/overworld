export {}

export interface ExampleInterface {
    foo: 'bar'
}

export declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
export declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

export interface BridgeAPI {
    desktop: boolean
}

declare global {
    interface Window {
        myAPI: BridgeAPI
    }
}