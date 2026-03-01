import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const [email, setEmail] = useState('vet@admin.com');
    const [password, setPassword] = useState('123456');
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Tentativa de login com:", email, password);
        // Aqui você adicionará a lógica de integração com seu backend Node.js
        navigate('/dashboard');
        setError('');

        try {
            // Ajuste a URL para a rota do seu backend Node.js
            const response = await axios.post('http://localhost:5000/api/login', {
                email: email,
                password: password
            });

            // Se o login for bem sucedido, o backend deve retornar o token
            const { token } = response.data;

            // Salva o token no navegador
            localStorage.setItem('token', token);

            // Redireciona para a página inicial
            navigate('/');
            
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