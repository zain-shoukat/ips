import { IPermission, permissionCreationMapper } from "../../../app/utils/dto/index.js";
import { PermissionsRepository } from "../../models/repositories/permissionsRepo.js";
import {
    ApiError,
    ApiSuccess,
    ICrud,
    IGetEntityList,
    IGetEntity,
    CustomLogger,
    PermissionsMessages
    // IGetEntity,
  } from '../../utils/index.js';
import { logging } from "../../../config/decorators/log.js";




class PermissionsCruds extends PermissionsRepository implements ICrud {


    @logging()
    async create(
      permissions: IPermission,
    ): Promise<IAPISuccessResponse> {
      try { 
        const data: IPermission = await this.createOne(await permissionCreationMapper(permissions));
        return ApiSuccess.format({
          userMessage: PermissionsMessages.PERMISSION_CREATED.message,
          code: PermissionsMessages.PERMISSION_CREATED.code,
          keyName: 'data',
          ['data']: data,
        });
      } catch (error: any) {
        throw ApiError.format(
          error,
          PermissionsMessages.PERMISSION_FAILURE,
        );
      }
    }
  
    @logging()
    async list(
      args: IGetEntityList,
    ): Promise<IAPISuccessResponse> {
      try {
        const data: any = await this.find(args);
        return ApiSuccess.format({
          userMessage: PermissionsMessages.PERMISSIONS_FETCHED.message,
          code: PermissionsMessages.PERMISSIONS_FETCHED.code,
          keyName: 'data',
          ['data']: data.data,
          pagination: data.pagination,
        });
      } catch (error: any) {
        throw ApiError.format(
          error,
          PermissionsMessages.PERMISSION_FAILURE,
        );
      }
    }
  
    @logging()
    async readById(
      args: IGetEntity,
    ): Promise<IAPISuccessResponse> {
      try {
        const data: any = await this.findOne(args);
        return ApiSuccess.format({
          userMessage: PermissionsMessages.SINGLE_PERMISSION_FETCHED.message,
          code: PermissionsMessages.SINGLE_PERMISSION_FETCHED.code,
          keyName: 'data',
          ['data']: data,
        });
      } catch (error: any) {
        throw ApiError.format(
          error,
          PermissionsMessages.PERMISSION_FAILURE,
        );
      }
    }
  
    @logging()
    async updateById(
      userId: number,
      args: IPermission,
    ): Promise<IAPISuccessResponse> {
      try {
        const data: any = await this.updateOne(userId, args);
        CustomLogger.log(
          'info',
          `update permission: ${JSON.stringify(data)}`,
        );
        if (data.affected > 0) {
          return ApiSuccess.format({
            userMessage: PermissionsMessages.PERMISSION_UPDATED.message,
            code: PermissionsMessages.PERMISSION_UPDATED.code,
            keyName: 'data',
            ['data']: data.raw,
          });
        }
        else {
          throw PermissionsMessages.PERMISSION_FAILURE;
        }
      } catch (error: any) {
        throw ApiError.format(
          error,
          PermissionsMessages.PERMISSION_FAILURE,
        );
      }
    }
  
    @logging()
    async deleteById(
      args: IGetEntity,
    ): Promise<IAPISuccessResponse> {
      try {
        const data: any = await this.deleteOne(args);
        return ApiSuccess.format({
          userMessage: PermissionsMessages.PERMISSION_DELETED.message,
          code: PermissionsMessages.PERMISSION_DELETED.code,
          keyName: 'data',
          ['data']: data.raw,
        });
      } catch (error: any) {
        throw ApiError.format(
          error,
          PermissionsMessages.PERMISSION_FAILURE
        );
      }
    }

}

export default new PermissionsCruds();