const CPFCheck = require("cpf-check");
const getNome = require("../util/getNome");
const pool = require("../db/index");

const isCpfValid = (cpf) => {
  const characters = cpf.split("");
  return (
    characters.every((char) => Number.isInteger(Number(char))) &&
    CPFCheck.validate(CPFCheck.format(cpf))
  );
};

module.exports = {
  async index(_, res) {
    let resultSet;
    try {
      resultSet = await pool.query(`SELECT cpf, nome FROM pacientes`);
    } catch (error) {
      console.log(error);
      return res.status(503).json({ error: "Database error" });
    }
    return res.json(resultSet.rows);
  },
  async store(req, res) {
    const { cpf } = req.params;

    if (!isCpfValid(cpf)) {
      return res.status(400).json({ error: "CPF mal formatado" });
    }
    let resultSet;
    try {
      resultSet = await pool.query(`SELECT * FROM pacientes WHERE CPF=$1`, [
        cpf,
      ]);
    } catch (error) {
      console.log(error);
      return res.status(503).json({ error: "Database error" });
    }
    if (resultSet.rows.length > 0) {
      return res
        .status(404)
        .json({ error: "CPF já cadastrado", data: resultSet.rows[0] });
    }

    const nome = await getNome(cpf);
    if (!nome) {
      return res.status(404).json({ error: "CPF inválido" });
    }
    try {
      resultSet = await pool.query(`INSERT INTO pacientes VALUES ($1, $2)`, [
        cpf,
        nome,
      ]);
    } catch (error) {
      console.log(error);
      return res.status(503).json({ error: "Database error" });
    }
    return res.json({ cpf: cpf, nome: nome });
  },
};
