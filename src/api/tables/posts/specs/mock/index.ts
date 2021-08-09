import { Post } from "../../schemas/post.schema";
import { Types } from "mongoose";
import { UpdatePostDto } from "../../dto/update-post.dto";
import { Repository } from "typeorm";

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

const mockedPostCreate = (info: Partial<Post>) => {
  return {
    _id: expect.any(Types.ObjectId),
    userId: info.userId,
    title: info.title,
    description: info.description,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
  };
};

const mockedPostFindOne = (postId: string) => {
  return {
    _id: postId,
    userId: expect.any(Types.ObjectId),
    title: expect.any(String),
    description: expect.any(String),
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
  };
};

const mockedPostUpdate = (postId: string, updatePost: UpdatePostDto) => {
  updatePost.title = "test 0 update";
  updatePost.description = "I'm a test 0 try to update";
  updatePost.userId = "610f7d3ff43715b50c1d00a4"
  return {
    _id: postId,
    userId: updatePost.userId,
    title: updatePost.title,
    description: updatePost.description,
    updatedAt: expect.any(Date)
  };
};

const mockedPostRemove = (postId: string) => {
  return {
    _id: postId,
    userId: expect.any(Types.ObjectId),
    title: expect.any(String),
    description: expect.any(String),
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
  };
};

export const postUnitTestParams = {
  updatePostDto: new UpdatePostDto(),
  postId: "610fcf1d06117ef9c46140c0",
  newPost: {
    "userId": Types.ObjectId("610f7d3ff43715b50c1d00a4"),
    "title": "Unit test",
    "description": "I'm an unit test"
  }
};

export const mockedPost = {
  create: mockedPostCreate(postUnitTestParams.newPost),
  findOne: mockedPostFindOne(postUnitTestParams.postId),
  update: mockedPostUpdate(postUnitTestParams.postId, postUnitTestParams.updatePostDto),
  remove: mockedPostRemove(postUnitTestParams.postId)
};

export const postRepositoryMockValue = {
  findAll: jest.fn(),
  create: jest.fn((newPost) => mockedPostCreate(newPost)),
  findOne: jest.fn((schema) => mockedPostFindOne(schema)),
  update: jest.fn((postId, updatePost) => mockedPostUpdate(postId, updatePost)),
  remove: jest.fn((postId) => mockedPostRemove(postId))
};

// @ts-ignore
export const postRepositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => (postRepositoryMockValue)
)