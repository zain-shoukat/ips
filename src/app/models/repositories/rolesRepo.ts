import { Repository, SelectQueryBuilder } from 'typeorm';

// import {
//   MakePaginationObject,
//   OrmErrorHandling,
//   MakeFindOneDbArgs,
//   MakeQueryBuilder,
//   MakeRolesQuery,
// } from '../../helpers/index.js';
// import {
//   IPagination,
//   IGetEntityList,
//   IGetEntityReturn,
//   IGetEntity,
// } from '../../utils/interfaces/index.js';

import { validateOrReject } from 'class-validator';

import { Roles } from '../entities/index.js';
import DBConn from '../../../config/typeorm.js';
import {
  ICreateRoles,
  IRoles,
} from '../../utils/dto/index.js';
import { logging } from '../../../config/decorators/log.js';
import {
  MakePaginationObject,
  MakeQueryBuilder,
  OrmExceptionHandling,
  MakeRolesQueryParams,
  MakeQueryBuilderGetOne,
  MakeQueryBuilderSoftDelete,
} from '../../helpers/index.js';
import {
  IGetEntityList,
  IGetEntity,
  IGetEntityReturnObject,
  RolesMessages,
} from '../../utils/index.js';

export abstract class RolesRepository {
  private _repo: Repository<Roles>;
  constructor() {
    this._repo = DBConn.getRepository(Roles);
  }

  @logging()
  async createOne(roles: ICreateRoles) {
    try {
      const rolesEntity = this._repo.create(roles);
      console.log(rolesEntity);

      await validateOrReject(rolesEntity, {
        validationError: { target: false, value: false },
      });
      const newRoles: IRoles =
        await this._repo.save(rolesEntity);
      return newRoles;
    } catch (error: any) {
      console.log(error);
      throw OrmExceptionHandling(error);
    }
  }

  @logging()
  async find(
    args: IGetEntityList,
  ): Promise<IGetEntityReturnObject<Roles>> {
    try {
      const queryBuilder: SelectQueryBuilder<Roles> =
        MakeQueryBuilder(args, MakeRolesQueryParams, Roles);

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
  async findOne(args: IGetEntity): Promise<IRoles> {
    try {
      const queryBuilder: SelectQueryBuilder<Roles> =
        MakeQueryBuilderGetOne(args, MakeRolesQueryParams, Roles);
      const role = await queryBuilder.getOne();
      console.log(role);

      if (!role) {
        throw RolesMessages.ROLES_NOT_FETCHED;
      }
      return role;
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }

  @logging()
  async deleteOne(args: IGetEntity) {
    try {
      return await this._repo.softDelete({ id: Number(args.id) });
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }

  @logging()
  async updateOne(id: number, updateParams: Partial<IRoles>): Promise<IRoles> {
    try {
      const result:any = await this._repo.update({ id }, updateParams);
      return result;
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }


}
