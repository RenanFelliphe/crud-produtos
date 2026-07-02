-- Execute este script no banco `desenv_web_rpv` (mesmo banco usado em aula)
CREATE TABLE IF NOT EXISTS produtos (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nome        VARCHAR(100) NOT NULL,
  descricao   TEXT,
  preco       DECIMAL(10,2) NOT NULL,
  quantidade  INT NOT NULL DEFAULT 0,
  criado_em   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
