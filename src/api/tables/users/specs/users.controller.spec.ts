import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../schemas/user.schema";
import { mockedUser, userRepositoryMockFactory, userRepositoryMockValue, userUnitTestParams } from "../mock";

describe('UsersController', () => {
  let usersController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, {
        provide: getRepositoryToken(User),
        useFactory: userRepositoryMockFactory,
      }]
    })
      .overrideProvider(UsersService)
      .useValue(userRepositoryMockValue)
      .compile();

    usersController = userModule.get<UsersController>(UsersController);
    userService = userModule.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });


 describe("findAll", () => {
    it("should return an array with the information of all users", () => {
      expect(usersController.findAll()).toEqual(expect.arrayContaining([]));
    });
  });

  describe("findOne", () => {
    it("It should return the information of one user", () => {
      expect(usersController.findOne(userUnitTestParams.userId))
        .toEqual(mockedUser.findOne);
      expect(userRepositoryMockValue.findOne)
        .toHaveBeenCalledWith(userUnitTestParams.userId);
    });
  });

  describe("update", () => {
    it("It should update the information of one user", () => {
      expect(usersController.update(userUnitTestParams.userId,
        userUnitTestParams.updateUserDto))
        .toEqual(mockedUser.update);
      expect(userRepositoryMockValue.update)
        .toHaveBeenCalledWith(userUnitTestParams.userId,
          userUnitTestParams.updateUserDto);
    });
  });

  describe("remove", () => {
    it("It should delete one user of the database", () => {
      expect(usersController.remove(userUnitTestParams.userId))
        .toEqual(mockedUser.remove);
      expect(userRepositoryMockValue.remove)
        .toHaveBeenCalledWith(userUnitTestParams.userId);
    });
  });
});
