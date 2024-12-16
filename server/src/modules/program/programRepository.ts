import DatabaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

class programRepository {
  readAll = async () => {
    const [rows] = await DatabaseClient.query<Rows>("select * from program");
  };
}

export default new programRepository();
