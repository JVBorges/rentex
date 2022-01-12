import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = 'postgres'): Promise<Connection> => {
  const defaultOpts = await getConnectionOptions();

  return createConnection({ 
    ...defaultOpts, ...{ host }
  });
};