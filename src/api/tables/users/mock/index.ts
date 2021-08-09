import { User } from "../schemas/user.schema";
import { Types } from "mongoose";
import { UpdateUserDto } from "../dto/update-user.dto";
import { Repository } from "typeorm";

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

const mockedUserCreate = (info: Partial<User>) => {
  return {
    _id: expect.any(Types.ObjectId),
    firstName: info.firstName,
    lastName: info.lastName,
    email: info.email,
    isLog: expect.any(Boolean),
    username: info.username,
    roles: expect.any([]),
    posts: expect.any(Array)
  };
};

const mockedUserFindOne = (userId: string) => {
  return {
    _id: Types.ObjectId(userId),
    firstName: expect.any(String),
    lastName: expect.any(String),
    email: expect.any(String),
    isLog: expect.any(Boolean),
    username: expect.any(String),
    roles: expect.any(Array),
    posts: expect.any(Array)
  };
};

const mockedUserUpdate = (userId: string, updateUserDto: UpdateUserDto) => {
  const user = mockedUserCreate(updateUserDto);
  user.firstName = "testv2.0 updadte";
  user.lastName = "testv2.0 updadte";
  return { ...user,  updatedAt: expect.any(Date) };
};

const mockedUserRemove = (userId: string) => {
  return mockedUserFindOne(userId);
};


export const userUnitTestParams = {
  updateUserDto: new UpdateUserDto(),
  userId: "610f7d3ff43715b50c1d00a4",
  newUser: {
    lastName: "testv2",
    firstName: "testv2",
    username: "testv2.client.6",
    email: "testv2.client.6@testv2.com",
    password: "12345678",
    roles: ["Client"]
  }
};

export const mockedUser = {
  create: mockedUserCreate(userUnitTestParams.newUser),
  findOne: mockedUserFindOne(userUnitTestParams.userId),
  update: mockedUserUpdate(userUnitTestParams.userId, userUnitTestParams.updateUserDto),
  remove: mockedUserRemove(userUnitTestParams.userId)
};

export const userRepositoryMockValue = {
  findAll: jest.fn(),
  create: jest.fn((newUser) => mockedUserCreate(newUser)),
  findOne: jest.fn((schema) => mockedUserFindOne(schema)),
  update: jest.fn((userId, updateUser) => mockedUserUpdate(userId, updateUser)),
  remove: jest.fn((userId) => mockedUserRemove(userId))
};

// @ts-ignore
export const userRepositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => (userRepositoryMockValue)
);
