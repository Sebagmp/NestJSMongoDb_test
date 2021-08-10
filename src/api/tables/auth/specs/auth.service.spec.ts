import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../auth.service";
import {
  mockedUser,
  MockType,
  userRepositoryMockFactory,
  userRepositoryMockValue,
  userUnitTestParams
} from "../../users/mock";
import { Repository } from "typeorm";
import { User } from "../../users/schemas/user.schema";
import { getRepositoryToken } from "@nestjs/typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";

describe("AuthService", () => {
  let authService: AuthService;
  let authRepositoryMock: MockType<Repository<User>>;

  beforeEach(async () => {
    const authModule: TestingModule = await Test.createTestingModule({
      providers: [AuthService, {
        provide: getRepositoryToken(User),
        useFactory: userRepositoryMockFactory
      }]
    })
      .overrideProvider(AuthService)
      .useValue(userRepositoryMockValue)
      .compile();

    authService = authModule.get<AuthService>(AuthService);
    authRepositoryMock = authModule.get(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(authService).toBeDefined();
  });

  describe("Create a new user", () => {
    it("should return an user", async () => {
      authRepositoryMock.save = userRepositoryMockValue.signUp;
      await authService.signUp(userUnitTestParams.newUser);
      expect(authRepositoryMock.save).toHaveBeenCalledWith(userUnitTestParams.newUser);
      authRepositoryMock.create = userRepositoryMockValue.signUp;
      authRepositoryMock.findOne = undefined;
      expect(await authService.signUp(userUnitTestParams.newUser as User))
        .toEqual(mockedUser.signUp);
      expect(authRepositoryMock.create).toHaveBeenCalledWith(userUnitTestParams.newUser);
    });

    it("should throw error if user exists", async () => {
      authRepositoryMock.findOne = userRepositoryMockValue.signUp;
      try {
        authRepositoryMock.create(mockedUser.signUp);
      } catch (e) {
        expect(e).toEqual(
          new HttpException(
            "User already exist",
            HttpStatus.CONFLICT
          )
        );
      }
    });
  });

  describe("Lof In a new user", () => {
    it("should return an user", async () => {
      authRepositoryMock.save = userRepositoryMockValue.logIn;
      authRepositoryMock.findOne = userRepositoryMockValue.findOne;
      await authService.logIn(userUnitTestParams.logUser);
      expect(authRepositoryMock.save).toHaveBeenCalledWith(userUnitTestParams.logUser);
    });
  });

  describe("Log out an user", () => {
    it("should return null", async () => {
      authRepositoryMock.save = userRepositoryMockValue.logOut;
      await authService.logOut(userUnitTestParams.userId);
      expect(authRepositoryMock.save).toHaveBeenCalledWith(userUnitTestParams.userId);
    });
  });
});
