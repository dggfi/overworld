import { net, protocol } from 'electron';
import url from 'node:url';

// code credit to @cwellsx
const isRunningFromWebServer = __dirname.includes(".webpack");

const schemeName = 'local';
const scheme = `${schemeName}://`;

export const convertPathToUrl: (path: string) => string = (path: string) => {
    return !isRunningFromWebServer ? url.pathToFileURL(path).toString() : `${scheme}${encodeURIComponent(path)}`;
};

export const registerFileProtocol = () => {
    if (!isRunningFromWebServer) return;
    protocol.handle(schemeName, (request) => {
        // undo the mangling that was done in convertPathToUrl
        const path = decodeURIComponent(request.url.slice(scheme.length));
        return net.fetch(path);
    });
}