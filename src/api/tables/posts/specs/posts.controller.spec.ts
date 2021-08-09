import { Test, TestingModule } from "@nestjs/testing";
import { PostsController } from "../posts.controller";
import { PostsService } from "../posts.service";
import {
  mockedPost, postRepositoryMockFactory,
  postRepositoryMockValue, postUnitTestParams
} from "./mock";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Post } from "../schemas/post.schema";

describe("PostsController", () => {
  let postsController: PostsController;
  let postService: PostsService;

  beforeEach(async () => {
    const postModule: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService, {
        provide: getRepositoryToken(Post),
        useFactory: postRepositoryMockFactory,
      }]
    })
      .overrideProvider(PostsService)
      .useValue(postRepositoryMockValue)
      .compile();

    postsController = postModule.get<PostsController>(PostsController);
    postService = postModule.get<PostsService>(PostsService);
  });


  it("should be defined", () => {
    expect(postsController).toBeDefined();
  });

  describe("findAll", () => {
    it("should return an array with the information of all post", () => {
      expect(postsController.findAll()).toEqual(expect.arrayContaining([]));
    });
  });

  describe("create", () => {
    it("It should create one post on the database", () => {
      expect(postsController.create(postUnitTestParams.newPost))
        .toEqual(mockedPost.create);
      expect(postRepositoryMockValue.create)
        .toHaveBeenCalledWith(postUnitTestParams.newPost);
    });
  });


  describe("findOne", () => {
    it("It should return the information of one post", () => {
      expect(postsController.findOne(postUnitTestParams.postId))
        .toEqual(mockedPost.findOne);
      expect(postRepositoryMockValue.findOne)
        .toHaveBeenCalledWith(postUnitTestParams.postId);
    });
  });

  describe("update", () => {
    it("It should update the information of one post", () => {
      expect(postsController.update(postUnitTestParams.postId,
        postUnitTestParams.updatePostDto))
        .toEqual(mockedPost.update);
      expect(postRepositoryMockValue.update)
        .toHaveBeenCalledWith(postUnitTestParams.postId,
          postUnitTestParams.updatePostDto);
    });
  });

  describe("remove", () => {
    it("It should delete one post of the database", () => {
      expect(postsController.remove(postUnitTestParams.postId))
        .toEqual(mockedPost.remove);
      expect(postRepositoryMockValue.remove)
        .toHaveBeenCalledWith(postUnitTestParams.postId);
    });
  });

});
