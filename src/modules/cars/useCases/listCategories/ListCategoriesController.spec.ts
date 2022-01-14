import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";

import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm";

let conn: Connection;
describe("List categories controller", () => {
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

  it('Should be able to list all existent categories', async () => {
    const responseToken = await request(app)
      .post('/session')
      .send({
        email: 'admin@rentex.com',
        password: 'admin'
      });
    
    const { token } = responseToken.body;

    const categories = [
      { name: 'Category 1 name', description: 'Category 1 description' },
      { name: 'Category 2 name', description: 'Category 2 description' },
    ]

    await Promise.all(
      categories.map(category => {
        return request(app)
          .post('/categories')
          .set({
            Authorization: `Bearer ${token}`
          })
          .send({
            name: category.name,
            description: category.description
          })
        } 
      )
    );

    const response = await request(app)
      .get('/categories')
      .set({
        Authorization: `Bearer ${token}`
      });
    
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});