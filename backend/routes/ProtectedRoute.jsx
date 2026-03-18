import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');

    // Se não houver token, manda de volta para o login
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // Se houver token, libera o acesso para as rotas filhas
    return <Outlet />;
};

export default ProtectedRoute;