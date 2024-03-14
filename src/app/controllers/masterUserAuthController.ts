import { BaseController } from './baseController.js';
import { Controller, Middleware, Post, Put } from '@overnightjs/core';
import {
  MasterUserAuthRoutes,
  ICustomRequest,
  ICustomHeaders,
  JoiValidator,
  ReqValidations,
} from '../utils/index.js';
import { AuthService } from '../services/masterUserAuth/index.js';
import { logging } from '../../config/decorators/index.js';

@Controller(MasterUserAuthRoutes.BASE)
export class MasterUserAuthController extends BaseController {
  @Post(MasterUserAuthRoutes.SIGN_UP)
  @Middleware([JoiValidator(ReqValidations.SignUpValidator)])
  @logging()
  private async _signUp(req: ICustomRequest, res: any) {
    const { language: language }: ICustomHeaders = req.headers;
    try {
      const result = await AuthService.signUp(req.body);
      this.sendSuccessResponse(res, result, language);
    } catch (error: unknown) {
      this.sendErrorResponse(
        res,
        error as IAPIErrorResponse,
        language,
      );
    }
  }

  @Post(MasterUserAuthRoutes.SIGN_IN)
  @Middleware([JoiValidator(ReqValidations.signInValidator)])
  @logging()
  private async _signIn(req: ICustomRequest, res: any) {
    const { language: language }: ICustomHeaders = req.headers;
    try {
      const result = await AuthService.signIn(req.body);
      this.sendSuccessResponse(res, result, language);
    } catch (error: unknown) {
      this.sendErrorResponse(
        res,
        error as IAPIErrorResponse,
        language,
      );
    }
  }

  @Post(MasterUserAuthRoutes.OTP_VERIFY)
  @Middleware([JoiValidator(ReqValidations.VerifyUserValidator)])
  @logging()
  private async _verifyUser(req: ICustomRequest, res: any) {
    const { language: language } : ICustomHeaders = req.headers;
    try {
      const result = await AuthService.verifyUser(req.body);
      this.sendSuccessResponse(res, result, language);
    } catch (error: unknown) {
      this.sendErrorResponse(
        res,
        error as IAPIErrorResponse,
        language,
      );
    }
  }

  @Post(MasterUserAuthRoutes.OTP_RESEND)
  // @Middleware([JoiValidator(ReqValidations.VerifyUserValidator)])
  @logging()
  private async _resendOTP(req: ICustomRequest, res: any) {
    const { language: language } : ICustomHeaders = req.headers;
    try {
      const result = await AuthService.resendOtp(req.body);
      this.sendSuccessResponse(res, result, language);
    } catch (error: unknown) {
      this.sendErrorResponse(
        res,
        error as IAPIErrorResponse,
        language,
      );
    }
  }

  @Post(MasterUserAuthRoutes.FORGOT_PASSWORD)
  @Middleware([JoiValidator(ReqValidations.ForgotPasswordValidator)])
  @logging()
  private async _forgotPassword(
    req: ICustomRequest,
    res: any,
  ) {
    const { language: language } :ICustomHeaders = req.headers;
    try {
      const result = await AuthService.forgotPassword(
        req.body,
      );
      this.sendSuccessResponse(res, result, language);
    } catch (error: unknown) {
      this.sendErrorResponse(
        res,
        error as IAPIErrorResponse,
        language,
      );
    }
  }

  @Put(MasterUserAuthRoutes.UPDATE_PASSWORD)
  @Middleware([JoiValidator(ReqValidations.UpdatePasswordValidator)])
  @logging()
  private async _updatePassword(
    req: ICustomRequest,
    res: any,
  ) {
    const { language: language } : ICustomHeaders = req.headers;
    try {
      const result = await AuthService.updatePassword(
        req.body,
      );
      this.sendSuccessResponse(res, result, language);
    } catch (error: unknown) {
      this.sendErrorResponse(
        res,
        error as IAPIErrorResponse,
        language,
      );
    }
  }
}
