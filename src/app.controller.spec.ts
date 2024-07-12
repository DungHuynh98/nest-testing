import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService, User } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = moduleRef.get<AppService>(AppService);
    appController = moduleRef.get<AppController>(AppController);
  });

  describe('find', () => {
    it('should return an array of users', () => {
      const users: User[] = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
      jest.spyOn(appService, 'find').mockReturnValue(users);

      expect(appController.find()).toBe(users);
      expect(appService.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', () => {
      const user: User = { id: 1, name: 'John' };
      jest.spyOn(appService, 'findById').mockReturnValue(user);

      expect(appController.findOne(1)).toBe(user);
      expect(appService.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new user', () => {
      const newUser: User = { id: 1, name: 'John' };
      jest.spyOn(appService, 'create').mockReturnValue(newUser);

      const createUserDto = { name: 'John' };
      expect(appController.create(createUserDto)).toBe(newUser);
      expect(appService.create).toHaveBeenCalledWith(createUserDto.name);
    });
  });

  describe('update', () => {
    it('should update a user by ID', () => {
      const updatedUser: User = { id: 1, name: 'John Doe' };
      jest.spyOn(appService, 'update').mockReturnValue(updatedUser);

      const updateUserDto = { name: 'John Doe' };
      expect(appController.update(1, updateUserDto)).toBe(updatedUser);
      expect(appService.update).toHaveBeenCalledWith(1, updateUserDto.name);
    });
  });

  describe('delete', () => {
    it('should delete a user by ID', () => {
      const result = { deleted: 1 };
      jest.spyOn(appService, 'delete').mockReturnValue(result);

      expect(appController.delete(1)).toBe(result);
      expect(appService.delete).toHaveBeenCalledWith(1);
    });
  });
});