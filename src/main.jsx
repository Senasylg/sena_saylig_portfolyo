import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'

// Tarayıcının otomatik scroll geri yüklemesi, rota değişiminde bizim "başa dön"
// davranışımızı eziyor ve sayfa ortasından açılmasına yol açıyordu.
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
)
