import AppRoutes from "./AppRoutes";
import AuthContextProvider from "./contexts/auth";

function App() {
    return (
        <AuthContextProvider>
            <AppRoutes />;
        </AuthContextProvider>
    );
}

export default App;
