import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../users/schemas/user.schema";
import { mockedUser, userRepositoryMockFactory, userRepositoryMockValue, userUnitTestParams } from "../../users/mock";

describe("UsersController", () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, {
        provide: getRepositoryToken(User),
        useFactory: userRepositoryMockFactory
      }]
    })
      .overrideProvider(AuthService)
      .useValue(userRepositoryMockValue)
      .compile();

    authController = userModule.get<AuthController>(AuthController);
    authService = userModule.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(authController).toBeDefined();
  });

  describe("create", () => {
    it("should create a new user", async () => {
      jest
        .spyOn(authService, "signUp")
        .mockImplementation(() => Promise.resolve(mockedUser.signUp));

      expect(await authController.signUp(userUnitTestParams.newUser as User))
        .toBe(mockedUser.signUp);
    });

  });

  describe("logIn", () => {
    it("should return a new user", async () => {
      jest
        .spyOn(authService, "logIn")
        .mockImplementation(() => Promise.resolve(mockedUser.logIn));

      expect(await authController.logIn(userUnitTestParams.logUser as User))
        .toBe(mockedUser.logIn);
    });
  });

  describe("logOut", () => {
    it("should return nothing", async () => {
      jest
        .spyOn(authService, "logOut")
        .mockImplementation(() => Promise.resolve());

      expect(await authController.logOut(userUnitTestParams.userId))
        .toBe(undefined);
    });
  });
});
