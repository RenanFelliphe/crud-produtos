import knex, { Knex } from "knex";

const config: Knex.Config = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1', // verificar se o host do banco de dados é o mesmo que está sendo usado aqui
        port: 3306, // verificar se a porta do banco de dados é a mesma que está sendo usada aqui
        user: 'root', // verificar se o usuário do banco de dados é o mesmo que está sendo usado aqui
        password: 'root', // verificar se a senha do banco de dados é a mesma que está sendo usada aqui
        database: 'desenv_web_rpv' // atualizar conforme seu banco de dados
    },
    pool: { min: 2, max: 10 }
}

export const db: Knex = knex(config);
