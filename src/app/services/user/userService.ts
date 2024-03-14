import { CustomLogger, UserMessages } from '../../utils/index.js';
import { logging } from '../../../config/decorators/index.js';
import { ApiError, ApiSuccess } from '../../utils/index.js';
import { UserRepository } from '../../models/repositories/index.js';
import { UserCRUDService } from './index.js';
import { CommonService } from '../common/index.js';
import { BcryptService } from '../index.js';
import { ICreateUser } from 'app/utils/dto/index.js';

class UserService extends UserRepository {
  @logging()
  async bulkUserCreation(
    args: any,
  ): Promise<IAPISuccessResponse> {
    try {
      //BL
      //CRUD
      return ApiSuccess.format({
        userMessage: UserMessages.DATA_FETCHED.message,
        code: UserMessages.DATA_FETCHED.code,
        keyName: 'data',
        ['data']: args,
      });
    } catch (error) {
      throw ApiError.format(
        error,
        UserMessages.FETCHING_FAILURE,
      );
    }
  }


  @logging()
  async userCreation(
    body: ICreateUser,
  ): Promise<IAPISuccessResponse> {
    
     // user find with email, req.org filtered with is_owner false
      //  email=shan@getMaxListeners.com,isOwner=true,orgId is not null
      const users = await UserCRUDService.list({
        email: body.email,
        isOwner: false,
        organizationId: body.organizationId,
        requestUrl: '',
      });

      CustomLogger.log(
        'info',
        `USER: ${JSON.stringify(users)}`,
      );

      if (users[users.keyName].length > 0) {
        throw UserMessages.USER_EXISTED;
      }

      await CommonService.validateAndComparePassword(
        body.password,
        body.password,
      );
      const passwordHash = await BcryptService.hashPassword(
        body.password,
      );
      body.password = passwordHash;
      
      let createdUser = await UserCRUDService.create(body);

      CustomLogger.log(
        'info',
        `USER CREATED: ${JSON.stringify(users)}`,
      );

    try {
      return ApiSuccess.format({
        userMessage: UserMessages.USER_CREATED.message,
        code: UserMessages.USER_CREATED.code,
        keyName: 'data',
        ['data']: createdUser,
      });
    } catch (error) {
      throw ApiError.format(
        error,
        UserMessages.FETCHING_FAILURE,
      );
    }
  }
  
}
export default new UserService();
