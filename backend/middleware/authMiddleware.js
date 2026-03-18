const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // Busca o token no cabeçalho da requisição
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Pega apenas o código após "Bearer"

    if (!token) return res.status(401).json({ message: "Acesso Negado. Faça login primeiro." });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Guarda os dados do usuário na requisição
        next(); // Autoriza a continuação para a rota
    } catch (err) {
        res.status(403).json({ message: "Token Inválido ou Expirado." });
    }
};