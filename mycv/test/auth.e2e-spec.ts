import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', async () => {
    const inputEmail = 'test@test.com';
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: inputEmail, password: 'password' })
      .expect(201);

    const { id, email } = res.body;
    expect(id).toBeDefined();
    expect(email).toEqual(inputEmail);
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const inputEmail = 'test@test.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email: inputEmail, password: 'password' })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const res2 = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(res2.body.email).toEqual(inputEmail);
  });
});

