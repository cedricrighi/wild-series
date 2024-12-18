import DatabaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

interface Program {
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
}

class programRepository {
  readAll = async () => {
    const [rows] = await DatabaseClient.query<Rows>("select * from program");
    return rows;
  };

  create = async (program: Program) => {
    const { title, synopsis, poster, country, year, category_id } = program;
    const [result] = await DatabaseClient.query<Result>(
      "insert into program ( title, synopsis, poster, country, year, category_id ) values (?, ?, ?, ?, ?, ?)",
      [title, synopsis, poster, country, year, category_id],
    );

    return result;
  };

  read = async (id: number) => {
    const [rows] = await DatabaseClient.query<Rows>(
      "select * from program where id=?",
      [id],
    );
    return rows;
  };

  update = async (id: number, program: Program) => {
    const { title, synopsis, poster, country, year, category_id } = program;
    const [result] = await DatabaseClient.query<Result>(
      "update program set title = ?, synopsis = ?, poster = ?, country = ?, year = ?, category_id = ? where id = ?",
      [title, synopsis, poster, country, year, category_id, id],
    );
  };

  delete = async (id: number) => {
    const [result] = await DatabaseClient.query<Result>(
      "delete from program where id = ?",
      [id],
    );
    return result;
  };
}

export default new programRepository();
