import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Category = {
  id: number;
  name: string;
};

class CategoryRepository {
  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "category" table
    const [rows] = await databaseClient.query<Rows>("select * from category");

    // Return the array of categories
    return rows as Category[];
  }

  create = async (category: Category) => {
    // Extract the name from the category object
    const { name } = category;

    const [result] = await databaseClient.query<Result>(
      "insert into category (name) values (?)",
      [name],
    );

    return result;
  };

  read = async (id: number) => {
    const [rows] = await databaseClient.query<Rows>(
      "select * from category where id=?",
      [id],
    );

    return rows[0] as Category;
  };

  update = async (id: number, category: Category) => {
    const { name } = category;

    const [result] = await databaseClient.query<Result>(
      "update category set name = ? where id = ?",
      [name, id],
    );

    return result;
  };

  delete = async (id: number) => {
    const [result] = await databaseClient.query<Result>(
      "delete from category where id = ?",
      [id],
    );

    return result;
  };
}

export default new CategoryRepository();
