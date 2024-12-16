import DatabaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

class programRepository {
  readAll = async () => {
    const [rows] = await DatabaseClient.query<Rows>("select * from program");
    return rows;
  };
}

export default new programRepository();
