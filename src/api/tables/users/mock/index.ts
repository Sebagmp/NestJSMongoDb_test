import { User } from "../schemas/user.schema";
import { Types } from "mongoose";
import { UpdateUserDto } from "../dto/update-user.dto";
import { Repository } from "typeorm";

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

const mockedUserInfo = () => {
  return {
    _id: expect.any(Types.ObjectId),
    firstName: expect.any(String),
    lastName: expect.any(String),
    email: expect.any(String),
    isLog: expect.any(Boolean),
    username: expect.any(String),
    roles: expect.any([]),
    posts: expect.any([]),
    access_token: expect.any(String),
    updatedAt: expect.any(Date),
    createdAt: expect.any(Date)
  }
}

const mockedUserCreate = (info: Partial<User>)  => {
  const user = mockedUserInfo();
  user.firstName = info.firstName;
  user.lastName = info.lastName;
  user.email = info.lastName;
  delete user.access_token;
  delete user.updatedAt;
  delete user.createdAt
  return user;
};

const mockedUserFindOne = (userId: string) => {
  const user = mockedUserInfo();
  user._id = userId;
  delete user.access_token;
  delete user.updatedAt;
  delete user.createdAt
  return user;
};

const mockedUserUpdate = (userId: string, updateUserDto: UpdateUserDto) => {
  const user = mockedUserCreate(updateUserDto);
  user.firstName = "testv2.0 updadte";
  user.lastName = "testv2.0 updadte";
  return { ...user, updatedAt: expect.any(Date) };
};

const mockedUserLogIn = (info: Partial<User>) => {
  const user = mockedUserInfo();
  user.firstName = info.firstName;
  user.lastName = info.lastName;
  delete user.updatedAt;
  delete user.createdAt
  return user;
};

const mockedUserRemove = (userId: string) => {
  return mockedUserFindOne(userId);
};


export const userUnitTestParams = {
  updateUserDto: new UpdateUserDto(),
  userId: "610f7d3ff43715b50c1d00a4",
  logUser: {
    username: "testv2.0",
    password: "12345678"
  },
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
  signUp: mockedUserCreate(userUnitTestParams.newUser),
  logIn: mockedUserLogIn(userUnitTestParams.logUser),
  findOne: mockedUserFindOne(userUnitTestParams.userId),
  update: mockedUserUpdate(userUnitTestParams.userId, userUnitTestParams.updateUserDto),
  remove: mockedUserRemove(userUnitTestParams.userId)
};

export const userRepositoryMockValue = {
  findAll: jest.fn(),
  logOut: jest.fn(),
  signUp: jest.fn((newUser) => mockedUserCreate(newUser)),
  logIn: jest.fn((logUser) => mockedUserLogIn(logUser)),
  findOne: jest.fn((userId) => mockedUserFindOne(userId)),
  update: jest.fn((userId, updateUser) => mockedUserUpdate(userId, updateUser)),
  remove: jest.fn((userId) => mockedUserRemove(userId))
};

// @ts-ignore
export const userRepositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => (userRepositoryMockValue)
);
