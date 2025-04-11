import { createRoot } from 'react-dom/client'
import './index.css'
import './assets/fonts.css'
import Dashboard from './dashboard/Dashboard'
import App from './App'

createRoot(document.getElementById("root")!).render(
    <App />
);
