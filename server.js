// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";
import kDramasRoutes from "./scr/routes/kDramasRoutes.js";
import kDramas from "./scr/models/dados.js";

//Criar a aplicacao/server com express
const app = express();
app.use(express.json());

// Criar rotas para k-Drama
app.get ("kDramas", (req, res) => {
    res.send (kDramas);
})
// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal GET para "/"
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});


// Aqui vão todas suas Rotas
app.use ("/kDramas", kDramasRoutes);

// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});





