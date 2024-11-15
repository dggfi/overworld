import React from 'react';
import { createRoot } from 'react-dom/client';
import NewComponentStage from './components/Staging/NewComponentStage';
// import App from './App';

const root = createRoot(document.getElementById('root')!);
// root && root.render(<App />);
root && root.render(<NewComponentStage />)