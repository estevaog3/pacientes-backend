const express = require("express");
const PacienteDAO = require("./daos/PacienteDAO");

const routes = express.Router();

routes.get("/pacientes/listar", PacienteDAO.index);
routes.post("/pacientes/cadastrar/:cpf", PacienteDAO.store);

module.exports = routes;
