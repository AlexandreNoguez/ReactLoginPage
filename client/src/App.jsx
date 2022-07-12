import AppRoutes from "./AppRoutes";
import AuthContextProvider from "./contexts/auth";

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

function App() {
    return (
        <div>
            <main>
                <AuthContextProvider>
                    <AppRoutes />;
                </AuthContextProvider>
            </main>
            <ToastContainer />
        </div>
    );
}

export default App;
