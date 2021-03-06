CREATE USER test_user PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE "test_db" to test_user;
CREATE TABLE IF NOT EXISTS dor 
(
  id  SERIAL PRIMARY KEY,
  intensidade INT,
  paciente_cpf CHAR(11)
);
CREATE TABLE IF NOT EXISTS desconforto 
(
  local VARCHAR(10),
  id SERIAL PRIMARY KEY,
  paciente_cpf CHAR(11)
);
CREATE TABLE IF NOT EXISTS cirurgia
(
  id SERIAL PRIMARY KEY,
  tempo VARCHAR(10),
  tipo VARCHAR(10),
  sentiu_dor BOOLEAN,
  paciente_cpf CHAR(11)
);
CREATE TABLE IF NOT EXISTS pacientes
(
  cpf CHAR(11) PRIMARY KEY,
  nome VARCHAR(100),
  sente_dor BOOLEAN,
  sente_desconforto BOOLEAN,
  passou_por_cirurgia BOOLEAN,
  dor_id  INT,
  desconforto_id  INT,
  cirurgia_id  INT
);
ALTER TABLE dor ADD FOREIGN KEY (paciente_cpf) REFERENCES pacientes(cpf);
ALTER TABLE desconforto ADD FOREIGN KEY (paciente_cpf) REFERENCES pacientes(cpf);
ALTER TABLE cirurgia ADD FOREIGN KEY (paciente_cpf) REFERENCES pacientes(cpf);
ALTER TABLE pacientes ADD FOREIGN KEY (dor_id) REFERENCES dor(id);
ALTER TABLE pacientes ADD FOREIGN KEY (desconforto_id) REFERENCES desconforto(id);
ALTER TABLE pacientes ADD FOREIGN KEY (cirurgia_id) REFERENCES cirurgia(id);
GRANT ALL PRIVILEGES ON TABLE pacientes, dor, desconforto, cirurgia TO test_user;