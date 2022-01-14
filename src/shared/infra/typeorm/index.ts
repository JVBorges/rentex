import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = 'postgres'): Promise<Connection> => {
  const defaultOpts = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOpts, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database: process.env.NODE_ENV === 'test' ? 'rentex_test' : defaultOpts.database
    })
  );
};