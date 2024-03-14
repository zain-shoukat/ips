import { Repository, SelectQueryBuilder } from 'typeorm';
import { Permission } from "../entities/permission.js";
import { logging } from '../../../config/decorators/log.js';
import DBConn from '../../../config/typeorm.js';
import { IPermission } from "../../../app/utils/dto/index.js";
import {
  MakePaginationObject,
  MakeQueryBuilder,
  OrmExceptionHandling,
  MakePermissionsQueryParams,
  MakeQueryBuilderGetOne,
} from '../../helpers/index.js';
import { validateOrReject } from "class-validator";
import {
  IGetEntityList,
  IGetEntity,
  IGetEntityReturnObject,
  PermissionsMessages,
} from '../../utils/index.js';



export abstract class PermissionsRepository {
    private _repo: Repository<Permission>;
    constructor() {
      this._repo = DBConn.getRepository(Permission);
    }

    @logging()
    async createOne(permissions: IPermission) {
      try {
        const permissionsEntity = this._repo.create(permissions);
  
        // await validateOrReject(permissionsEntity, {
        //   validationError: { target: false, value: false },
        // });
        const newPermissions: IPermission =
          await this._repo.save(permissionsEntity);
        return newPermissions;
      } catch (error: any) {
        console.log(error);
        throw OrmExceptionHandling(error);
      }
    }


    @logging()
  async findOne(args: IGetEntity): Promise<IPermission> {
    try {
      const queryBuilder: SelectQueryBuilder<Permission> =
        MakeQueryBuilderGetOne(args, MakePermissionsQueryParams, Permission);
      const permission = await queryBuilder.getOne();

      if (!permission) {
        throw PermissionsMessages.PERMISSIONS_NOT_FETCHED;
      }
      return permission;
    } catch (error: any) {
      throw OrmExceptionHandling(error);
    }
  }

  @logging()
  async find(
    args: IGetEntityList,
  ): Promise<IGetEntityReturnObject<Permission>> {
    try {
      const queryBuilder: SelectQueryBuilder<Permission> =
        MakeQueryBuilder(args, MakePermissionsQueryParams, Permission);

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
  async updateOne(id: number, updateParams: Partial<IPermission>): Promise<IPermission> {
    try {
      const result:any = await this._repo.update({ id }, updateParams);
      return result;
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


}