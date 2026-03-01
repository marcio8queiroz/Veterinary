const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
// const User = require("../models/userModel"); // Se você tiver um model de usuário

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Lógica Temporária para teste (substitua pela consulta ao banco depois)
    if (email === "vet@admin.com" && password === "123456") {
        
        // Gerando o token (o 'secret' deve vir do seu arquivo .env)
        const token = jwt.sign(
            { user: email, role: 'admin' }, 
            process.env.SECRET || "sua_chave_secreta", 
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            success: true,
            token: token
        });
    }

    return res.status(401).json({ message: "E-mail ou senha inválidos" });
});

module.exports = router;