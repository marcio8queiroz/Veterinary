import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginComponent = () => {
    const [email, setEmail] = useState('vet@admin.com');
    const [password, setPassword] = useState('123456');
    const navigate = useNavigate();
    const [error, setError] = useState(''); // Verifique se isso está no topo do componente

   const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Limpa erros anteriores
        console.log("Iniciando requisição para o backend...");

        try {
            const response = await axios.post('http://localhost:5000/api/v1/auth/login', {
                email: email,
                password: password
            });

            // Se o login for bem sucedido
            const { token } = response.data;
            localStorage.setItem('token', token);
            console.log("Token salvo! Redirecionando...");

            // AGORA SIM você navega
            navigate('/dashboard'); 
            
        } catch (err) {
            setError('Usuário ou senha inválidos');
            console.error("Erro no login:", err);
        }
    };

    

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow border-0">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">Clínica Veterinária Login</h2>
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label className="form-label">E-mail</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Digite seu e-mail" 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Senha</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Digite sua senha" 
                                        required 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Entrar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;