import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();

  // Default users
  await knex("users").insert([
    { name: "John", email: "johnn@example.com", age: 67 },
    { name: "Mari", email: "mari@example.com", age: 33 },
    { name: "Rick", email: "rick@example.com", age: 27 },
    { name: "Sam", email: "sam@example.com", age: 12 },
    { name: "Lila", email: "lila@example.com", age: 43 },
    { name: "Tom", email: "tom@example.com", age: 21 },
  ]);
}
