import { Knex } from "knex";

export async function up(knex: Knex) {
    return  knex.schema.createTable('profession', table => {
        table.increments('id').primary();
        table.string('descricao').notNullable();
        table.boolean('situacao').notNullable();
        table.timestamps();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('profession');
}