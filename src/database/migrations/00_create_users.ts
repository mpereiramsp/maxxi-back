import { Knex } from "knex";

export async function up(knex: Knex) {
    return  knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('telefone').notNullable();
        table.string('email').notNullable();
        table.integer('tipoDeProfissional').notNullable();
        table.boolean('situacao').notNullable();
        table.timestamps();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
}