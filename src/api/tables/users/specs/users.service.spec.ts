import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../schemas/user.schema";
import { mockedUser, userRepositoryMockFactory, userRepositoryMockValue, userUnitTestParams } from "../mock";
import { mockedPost, MockType, postUnitTestParams } from "../../posts/specs/mock";
import { Repository } from "typeorm";

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepositoryMock: MockType<Repository<User>>;

  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: getRepositoryToken(User),
        useFactory: userRepositoryMockFactory,
      },]
    })
      .overrideProvider(UsersService)
      .useValue(userRepositoryMockValue)
      .compile();

    usersService = userModule.get<UsersService>(UsersService);
    userRepositoryMock = userModule.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe("findAll user", () => {
    it("It should return array of all the user", async () => {
      expect(await usersService.findAll())
        .toEqual(expect.arrayContaining([]));
      expect(userRepositoryMock.find).toEqual(expect.arrayContaining([]));
    });
  });

  describe("findOne user", () => {
    it("It should return user", async () => {
      userRepositoryMock.findOne.mockReturnValue(userUnitTestParams.newUser);
      expect(await usersService.findOne(userUnitTestParams.userId))
        .toBe(userUnitTestParams.newUser);
    });
  });

  describe("Update user", () => {
    it("should return user ", async () => {
      userRepositoryMock.findOne  .mockReturnValue(mockedUser.update);
      expect(await usersService
        .update(userUnitTestParams.userId, mockedUser.update))
        .toEqual(mockedUser.update);
    });
  });

  describe("remove pst", () => {
    it("should return user ", async () => {
      userRepositoryMock.findOne.mockReturnValue(mockedUser.remove);
      expect(await usersService
        .remove(userUnitTestParams.userId))
        .toEqual(mockedUser.remove);
    });
  });
});
