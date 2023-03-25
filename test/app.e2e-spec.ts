import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3333); // the port we want to listen in test env
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    const host = 'http://localhost:3333';
    pactum.request.setBaseUrl(host);
  });
  it.todo('should run');

  afterAll(() => {
    app.close();
  });

  const pactumPost = (url: string, body: any, status: number) =>
    pactum.spec().post(url).withBody(body).expectStatus(status);

  describe('Auth', () => {
    const auth: AuthDto = {
      email: 'moyal18@gmail.com',
      password: '1234567',
    };
    describe('Sign-up Flow', () => {
      it('Should throw error for no Body', (): any => {
        return pactumPost(`/auth/signup`, {}, 400);
      });
      it('Should throw error for no Password', (): any => {
        return pactumPost(`/auth/signup`, { email: auth.email }, 400);
      });
      it('Should throw error for no email', (): any => {
        return pactumPost(`/auth/signup`, { password: auth.password }, 400);
      });
      it('Should Sign Up correctly', (): any => {
        return pactumPost(`/auth/signup`, auth, 201);
      });
    });
    describe('Sign-in Flow', () => {
      it('Should throw error for no Body', (): any => {
        return pactumPost(`/auth/signin`, {}, 400);
      });
      it('Should throw error for no Password', (): any => {
        return pactumPost(`/auth/signin`, { email: auth.email }, 400);
      });
      it('Should throw error for no email', (): any => {
        return pactumPost(`/auth/signin`, { password: auth.password }, 400);
      });
      it('Should Sign In', (): any => {
        return pactum
          .spec()
          .post(`/auth/signin`)
          .withBody(auth)
          .expectStatus(201)
          .stores('userAuth', 'accessToken'); // store access_token in pactum for further use
      });
    });
  });
  describe('User Flow', () => {
    it('Get Me', (): any => {
      return pactum
        .spec()
        .withHeaders({
          Authorization: 'Bearer $S{userAuth}',
        })
        .get(`/users/me`)
        .expectStatus(200);
    });

    const userBody = {
      firstName: 'Dor',
      lastName: 'Moyal',
    };
    it('Edit User', (): any => {
      return pactum
        .spec()
        .withHeaders({
          Authorization: 'Bearer $S{userAuth}',
        })
        .withBody(userBody)
        .patch(`/users/`)
        .expectStatus(200);
    });
    it('Get User By Id', (): any => {
      return pactum
        .spec()
        .withHeaders({
          Authorization: 'Bearer $S{userAuth}',
        })
        .get(`/users/`)
        .expectStatus(200);
    });
  });
  describe('Bookmarks', () => {
    describe('Create Bookmark', () => {});
    describe('Get Bookmark by Id', () => {});
    describe('Create Bookmark', () => {});
    describe('Get All Bookmarks', () => {});
    describe('Edit Bookmark', () => {});
    describe('Delete Bookmark', () => {});
  });
});
