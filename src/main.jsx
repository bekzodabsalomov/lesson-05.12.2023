import './index.css'
import App from './App'
import ReactDOM from 'react-dom/client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContextProvider } from './context/GlobalContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <GlobalContextProvider>
        <ToastContainer position='top-center' limit={3} autoClose={2000} />
        <App />
    </GlobalContextProvider>
)