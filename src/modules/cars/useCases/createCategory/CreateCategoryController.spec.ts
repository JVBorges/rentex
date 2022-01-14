import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";

import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm";

let conn: Connection;
describe("Create category controller", () => {
  beforeAll(async () => {
    conn = await createConnection();
    await conn.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await conn.query(
      `INSERT INTO USERS(id, name, email, password, driver_license, is_admin) values (
        '${id}', 'admin', 'admin@rentex.com', '${password}', 'XXXXXX', true
      )`
    );
  });

  afterAll(async () => {
    await conn.dropDatabase();
    await conn.close();
  });

  it('Should be able to create a new category', async () => {
    const responseToken = await request(app)
      .post('/session')
      .send({
        email: 'admin@rentex.com',
        password: 'admin'
      });
    
    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
        name: 'Category name test',
        description: 'Category description test'
      });
    
    expect(response.status).toBe(201);
  });

  it('Should not be able to create a category with an existent name', async () => {
    const responseToken = await request(app)
      .post('/session')
      .send({
        email: 'admin@rentex.com',
        password: 'admin'
      });
    
    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
        name: 'Category name test',
        description: 'Category description test'
      });
    
    expect(response.status).toBe(400);
  });
});