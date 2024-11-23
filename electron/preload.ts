import { contextBridge, webUtils } from 'electron';

window.addEventListener('DOMContentLoaded', () => {
    contextBridge.exposeInMainWorld('myAPI', {
        desktop: true
    })

    contextBridge.exposeInMainWorld('electron', {
        showFilePath(file: File) {
            const path = webUtils.getPathForFile(file);
            return path;
        },
    })
})