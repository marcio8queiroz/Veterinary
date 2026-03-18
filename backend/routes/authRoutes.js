const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
// const User = require("../models/userModel"); // Se você tiver um model de usuário

router.post("/login", async (req, res) => {
    try{
    const { email, password } = req.body;

    // Lógica Temporária para teste (substitua pela consulta ao banco depois)
    if (email === "vet@admin.com" && password === "123456") {

        // Se o .env não carregar, usamos a 'chave_mestra_teste' para não dar erro 500
            const secret = process.env.JWT_SECRET || "chave_mestra_teste";

      const token = jwt.sign(
                { email: email }, 
                secret, 
                { expiresIn: '1d' }
            );

    console.log("Token gerado com sucesso");
            return res.json({ success: true, token });
        }

        return res.status(401).json({ message: "E-mail ou senha incorretos" });

    } catch (error) {
        // Isso vai imprimir o erro real no seu terminal do VS Code
        console.error("ERRO CRÍTICO NO LOGIN:", error.message);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
});

module.exports = router;