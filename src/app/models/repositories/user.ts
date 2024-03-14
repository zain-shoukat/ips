import {
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import {
  ICreateUser,
} from '../../utils/dto/index.js';
import { validateOrReject } from 'class-validator';
import { logging } from '../../../config/decorators/index.js';
import { Users } from '../entities/index.js';
import DBConn from '../../../config/typeorm.js';

import {
  MakePaginationObject,
  MakeQueryBuilder,
  OrmExceptionHandling,
  MakeUsersQueryParams,
  MakeQueryBuilderGetOne,
} from '../../helpers/index.js';

import {
  IGetEntity,
  IGetEntityList,
  IGetEntityReturnObject,
  UserMessages,
} from '../../utils/index.js';

export abstract class UserRepository {
  private repo: Repository<Users>;
  constructor() {
    this.repo = DBConn.getRepository(Users);
  }
  @logging()
  async createOne(user: ICreateUser,) {
    try {
      const userEntity = this.repo.create(user);
      // await validateOrReject(userEntity, {
      //   validationError: { target: false, value: false },
      // });
      const newUser: ICreateUser =
        await this.repo.save(userEntity);
      return newUser;
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }

  @logging()
  async find(
    args: IGetEntityList,
  ): Promise<IGetEntityReturnObject<Users>> {
    try {
      const queryBuilder: SelectQueryBuilder<Users> =
        MakeQueryBuilder(args, MakeUsersQueryParams, Users);

      const [allRecords, recordsCount] =
        await queryBuilder.getManyAndCount();
      const pagination: IPagination = MakePaginationObject({
        totalCount: recordsCount,
        resultCount: allRecords.length,
        requestUrl: args.requestUrl,
        pageNo: args.pageNo,
        limit: args.limit,
      });
      return {
        pagination: pagination,
        data: allRecords,
      };
    } catch (error) {
      throw OrmExceptionHandling(error);
    }
  }

  @logging()
  async findOne(args: IGetEntity): Promise<ICreateUser> {
    try {
      const queryBuilder: SelectQueryBuilder<Users> =
        MakeQueryBuilderGetOne(args, MakeUsersQueryParams, Users);
      const user = await queryBuilder.getOne();
      if (!user) {
        throw UserMessages.USER_NOT_FETCHED;
      }
      return user;
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }


   @logging()
  async updateOne(id: number, updateParams: Partial<ICreateUser>): Promise<ICreateUser> {
    try {
      const result: any = await this.repo.update({ id }, updateParams)
      return result;
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }

  @logging()
  async deleteOne(args: IGetEntity) {
    try {
      return await this.repo.softDelete({ id: Number(args.id) });
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }

  async updateUser(user: ICreateUser) {
    const id = user.id;
    try {
      const updatedUser: any = await this.repo.update(
        id!,
        user,
      );
      if (
        updatedUser.affected &&
        updatedUser.affected > 0
      ) {
        console.log('User updated successfully!');
      } else {
        console.log('User not found or not updated.');
      }
      return updatedUser;
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }
}
