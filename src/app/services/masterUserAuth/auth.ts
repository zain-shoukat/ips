import {
  ISignIn,
  ISignUp,
  IUpdatePassword,
  IUserVerify
} from '../../utils/dto/masterUserAuth/index.js';
import {
  ACTIONS,
  ApiError,
  ApiSuccess,
  AuthMessages,
  CustomLogger,
  TOKEN_SECRET
} from '../../utils/index.js';
import { CommonService } from '../common/index.js';
import { BcryptService } from './index.js';
import { UserCRUDService, UserService } from '../index.js';
import {
  ICreateUser,
  convertSignUpToCreateUser,
} from '../../utils/dto/index.js';
import { IForgotPassword } from '../../utils/dto/masterUserAuth/index.js';
import { logging } from '../../../config/decorators/log.js';
import { CreateToken } from '../../helpers/index.js';

class AuthService {
  @logging()
  async signUp(
    body: ISignUp,
  ): Promise<IAPISuccessResponse> {
    try {
      // user find with 0 org filtered with is_owner true
      //  email=shan@getMaxListeners.com,isOwner=true,orgId is not null
      const users = await UserCRUDService.list({
        email: body.email,
        isOwner: true,
        organizationId: null,
        requestUrl: '',
      });

      CustomLogger.log(
        'info',
        `USER: ${JSON.stringify(users)}`,
      );

      if (users[users.keyName].length > 0) {
        throw AuthMessages.USER_EXISTED;
      }

      await CommonService.validateAndComparePassword(
        body.password,
        body.confirmPassword,
      );
      const passwordHash = await BcryptService.hashPassword(
        body.password,
      );
      body.password = passwordHash;
      body.confirmPassword = passwordHash;

      const createUserDTO =
        await convertSignUpToCreateUser(body);
      // create user
      // user role assign

      CustomLogger.log(
        'info',
        `CONVERTED USER: ${JSON.stringify(createUserDTO)}`,
      );

      const createdUser =
        await UserCRUDService.create(createUserDTO);
      console.log('createdUser', createdUser);
      if (createdUser.success) {
        //   //todo otp step to send
        return ApiSuccess.format({
          userMessage: AuthMessages.SIGN_UP_SUCCESS.message,
          code: AuthMessages.SIGN_UP_SUCCESS.code,
          keyName: 'data',
          ['data']: body,
        });
      } else {
        throw AuthMessages.SIGN_UP_FAILURE;
      }
    } catch (error: unknown) {
      console.error('Error in signUp:', error);
      throw ApiError.format(
        error,
        AuthMessages.SIGN_UP_FAILURE,
      );
    }
  }


  @logging()
  async signIn(
    body: ISignIn,
  ): Promise<IAPISuccessResponse> {
    const data =
    {
      user: {},
      action: ACTIONS,
      token: '',
      permissions: []
    }
    try {
      // get email is equal isOwner true and organization is null
      const users = await UserCRUDService.list({
        email: body.email,
        isOwner: true,
        organizationId: null,
        requestUrl: '',
      });

      CustomLogger.log(
        'info',
        `USER: ${JSON.stringify(users)}`,
      );

      if (users[users.keyName].length > 0) {
        const hashedPassword = users.data[0].password;
        const email = users.data[0].email;
        const isValidPassword =
          await BcryptService.comparePassword(
            body.password,
            hashedPassword,
          );
        CustomLogger.log(
          'info',
          `password valid: ${isValidPassword}}`,
        );
        if (!isValidPassword || email !== body.email) {
          throw AuthMessages.INVALID_CREDS;
        }
      } else {
        throw AuthMessages.INVALID_USER;
      }
      const tokenPayload = {
        firstName: users.data[0].firstName,
        lastName: users.data[0].lastName,
        email: users.data[0].email,
        externalId: users.data[0].externalId
      }
      let token = await CreateToken(tokenPayload, TOKEN_SECRET)
      CustomLogger.log(
        'info',
        `token: ${JSON.stringify(token)}`,
      );
      if (token.success) {
        data.token = token.token;
        data.user = users.data[0];
      }

      return ApiSuccess.format({
        userMessage: AuthMessages.SIGN_IN_SUCCESS.message,
        code: AuthMessages.SIGN_IN_SUCCESS.code,
        keyName: 'data',
        ['data']: data
      });
    } catch (error) {
      console.error('Error in signIn:', error);
      throw ApiError.format(
        error,
        AuthMessages.SIGN_IN_FAILURE,
      );
    }
  }

  async verifyUser(
    body: IUserVerify,
  ): Promise<IAPISuccessResponse> {
    try {
      const data =
      {
        user: {},
        action: ACTIONS,
        token: '',
        permissions: []
      }
      const users = await UserCRUDService.list({
        email: body.email,
        requestUrl: '',
      });

      if (users[users.keyName].length > 0) {
        const userData: ICreateUser = users.data[0];
        const otp = body.otp;
        const otpVerified = true;
        // otpVerification to do
        if (!otpVerified) {
            throw AuthMessages.INVALID_OTP
        }
        userData.verifiedAt = await CommonService.getCurrentTimeStamp();
        await UserCRUDService.updateById(Number(userData.id), userData);
        const tokenPayload = {
          firstName: users.data[0].firstName,
          lastName: users.data[0].lastName,
          email: users.data[0].email,
          externalId: users.data[0].externalId
        }
        let token = await CreateToken(tokenPayload, TOKEN_SECRET)
        CustomLogger.log(
          'info',
          `token: ${JSON.stringify(token)}`,
        );
        if (token.success) {
          data.token = token.token;
          data.user = users.data[0];
        }
        return ApiSuccess.format({
          userMessage: AuthMessages.OTP_VERIFIED.message,
          code: AuthMessages.OTP_VERIFIED.code,
          keyName: 'data',
          ['data']: data,
        });
      } else {
          throw AuthMessages.INVALID_USER
      }
    } catch (error) {
      console.error('Error in verifyUser:', error);
      throw ApiError.format(
        error,
        AuthMessages.GENERAL_FAILURE,
      );
    }
  }

  async resendOtp(
    body: any,
  ): Promise<IAPISuccessResponse> {
    try {
      const users = await UserCRUDService.list({
        email: body.email,
        requestUrl: '',
      });

      if (users[users.keyName].length > 0) {
        const userData: ICreateUser = users.data[0];
        // resend otp to do
        // if (!otpVerified) {
        //     throw AuthMessages.INVALID_OTP
        // }
        return ApiSuccess.format({
          userMessage: AuthMessages.OTP_RESEND.message,
          code: AuthMessages.OTP_RESEND.code,
          keyName: 'data',
          ['data']: [],
        });
      } else {
          throw AuthMessages.INVALID_USER
      }
    } catch (error) {
      console.error('Error in resendOtp:', error);
      throw ApiError.format(
        error,
        AuthMessages.GENERAL_FAILURE,
      );
    }
  }

  async forgotPassword(
    body: IForgotPassword,
  ): Promise<IAPISuccessResponse> {
    try {
      const users = await UserCRUDService.list({
        email: body.email,
        requestUrl: '',
      });

      if (users[users.keyName].length > 0) {
        //todo otp step
        return ApiSuccess.format({
          userMessage: AuthMessages.FORGOT_PASSWORD.message,
          code: AuthMessages.FORGOT_PASSWORD.code,
          keyName: 'data',
          ['data']: [],
        });

      } else {
        throw AuthMessages.INVALID_USER
      }
    } catch (error) {
      console.error('Error in forgotPassword:', error);
      throw ApiError.format(
        error,
        AuthMessages.GENERAL_FAILURE,
      );
    }
  }

  async updatePassword(
    body: IUpdatePassword,
  ): Promise<IAPISuccessResponse> {
    try {
      const users = await UserCRUDService.list({
        email: body.email,
        requestUrl: '',
      });

      if (users[users.keyName].length > 0) {
        let userData : ICreateUser = users.data[0];
        await CommonService.validateAndComparePassword(
          body.password,
          body.confirmPassword,
        );
        const passwordHash =
          await BcryptService.hashPassword(body.password);
          userData.password = passwordHash;
        let updatePasswordData = await UserCRUDService.updateById(Number(userData.id), userData);
        return ApiSuccess.format({
          userMessage: AuthMessages.UPDATE_PASSWORD.message,
          code: AuthMessages.UPDATE_PASSWORD.code,
          keyName: 'data',
          ['data']: updatePasswordData,
        });
      } else {
        throw AuthMessages.INVALID_USER
      }
    } catch (error) {
      console.error('Error in updatePassword:', error);
      throw ApiError.format(
        error,
        AuthMessages.GENERAL_FAILURE,
      );
    }
  }
}

export default new AuthService();
