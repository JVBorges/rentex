import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOpts = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOpts, {
      database: process.env.NODE_ENV === 'test' ? 'rentex_test' : defaultOpts.database
    })
  );
};