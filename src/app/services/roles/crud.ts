// import { IRoles } from '../../models/dto';
// import { RolesRepository } from '../../models/repositories';
import {
  ApiError,
  ApiSuccess,
  ICrud,
  IGetEntityList,
  RolesMessages,
  IGetEntity,
  CustomLogger
  // IGetEntity,
} from '../../utils/index.js';
import { logging } from '../../../config/decorators/index.js';
import { RolesRepository } from '../../models/repositories/rolesRepo.js';
import {
  ICreateRoles,
  IRoles,
  roleCreationMapper,
} from '../../utils/dto/index.js';

class RolesCruds extends RolesRepository implements ICrud {
  @logging()
  async create(
    roles: ICreateRoles,
  ): Promise<IAPISuccessResponse> {
    try {
      const data: IRoles = await this.createOne(
        await roleCreationMapper(roles),
      );
      return ApiSuccess.format({
        userMessage: RolesMessages.ROLE_CREATED.message,
        code: RolesMessages.ROLE_CREATED.code,
        keyName: 'data',
        ['data']: data,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        RolesMessages.ROLE_FAILURE,
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
        userMessage: RolesMessages.ROLES_FETCHED.message,
        code: RolesMessages.ROLES_FETCHED.code,
        keyName: 'data',
        ['data']: data.data,
        pagination: data.pagination,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        RolesMessages.ROLE_FAILURE,
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
        userMessage: RolesMessages.SINGLE_ROLE_FETCHED.message,
        code: RolesMessages.SINGLE_ROLE_FETCHED.code,
        keyName: 'data',
        ['data']: data,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        RolesMessages.ROLE_FAILURE,
      );
    }
  }

  @logging()
  async updateById(
    userId: number,
    args: ICreateRoles,
  ): Promise<IAPISuccessResponse> {
    try {
      const data: any = await this.updateOne(userId, args);
      CustomLogger.log(
        'info',
        `update role: ${JSON.stringify(data)}`,
      );
      if (data.affected > 0) {
        return ApiSuccess.format({
          userMessage: RolesMessages.ROLE_UPDATED.message,
          code: RolesMessages.ROLE_UPDATED.code,
          keyName: 'data',
          ['data']: data.raw,
        });
      }
      else {
        throw RolesMessages.ROLE_FAILURE;
      }
    } catch (error: any) {
      throw ApiError.format(
        error,
        RolesMessages.ROLE_FAILURE,
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
        userMessage: RolesMessages.ROLE_DELETED.message,
        code: RolesMessages.ROLE_DELETED.code,
        keyName: 'data',
        ['data']: data.raw,
      });
    } catch (error: any) {
      throw ApiError.format(
        error,
        RolesMessages.ROLE_FAILURE
      );
    }
  }
}

export default new RolesCruds();
