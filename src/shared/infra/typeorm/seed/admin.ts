import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";
import createConnection from "../index";

async function create() {
  const conn = await createConnection('localhost');

  const id = uuidV4();
  const password = await hash('admin', 8);

  await conn.query(
    `INSERT INTO USERS(id, name, email, password, driver_license, is_admin) values (
      '${id}', 'admin', 'admin@rentex.com', '${password}', 'XXXXXX', true
    )`
  );

  await conn.close();
}

create().then(() => console.log('Admin user created!'));
