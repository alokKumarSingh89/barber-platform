import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import request from 'supertest';

describe('Users API (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/v1/users/:id', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/v1/users/test-id',
    );
    expect([200, 404]).toContain(response.status);
  });
});
