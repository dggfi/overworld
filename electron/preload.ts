import { contextBridge } from 'electron';

window.addEventListener('DOMContentLoaded', () => {
    contextBridge.exposeInMainWorld('myAPI', {
        desktop: true
    })
})