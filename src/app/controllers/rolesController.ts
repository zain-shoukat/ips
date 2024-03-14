import {
  Controller,
  Delete,
  Get,
  Middleware,
  Post,
  Put,
} from '@overnightjs/core';
import { Response } from 'express';
import {
  ICustomHeaders,
  ICustomRequest,
  ReqValidations,
  RolesRoutes,
} from '../utils/index.js';
import { logging } from '../../config/decorators/log.js';
import { BaseController } from './baseController.js';
import { RolesCRUDService } from '../services/roles/index.js';
import { JoiValidator } from '../utils/index.js';

@Controller(RolesRoutes.BASE)
export class RolesController extends BaseController {
  @Post(RolesRoutes.CREATE)
  @Middleware([
    JoiValidator(ReqValidations.CreateRolesValidator),
  ])
  @logging()
  private async _create(
    req: ICustomRequest,
    res: Response,
  ) {
    const { language: language }: ICustomHeaders =
      req.headers;

    try {
      const result: IAPISuccessResponse =
        await RolesCRUDService.create({
          ...req.body,
          requestUrl: req.originalUrl,
        });
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }

  @Get(RolesRoutes.GET_ALL)
  @logging()
  private async _get(req: ICustomRequest, res: Response) {
    const { language: language }: ICustomHeaders =
      req.headers;
    try {
      const result = await RolesCRUDService.list({
        ...req.query,
        requestUrl: req.originalUrl,
      });
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }

  @Get(RolesRoutes.GET_BY_ID)
  @logging()
  private async _getById(req: ICustomRequest, res: Response) {
    const { language: language }: ICustomHeaders =
      req.headers;
    try {
      const result = await RolesCRUDService.readById({
        id: req.params.id,
        requestUrl: req.originalUrl,
      });
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }

  @Put(RolesRoutes.UPDATE_BY_ID)
  @Middleware([JoiValidator(ReqValidations.UpdateRolesValidator)])
  @logging()
  private async _updateById(req: ICustomRequest, res: Response) {
    const { language: language }: ICustomHeaders =
      req.headers;
    try {
      const result = await RolesCRUDService.updateById(Number(req.params.id),req.body);
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }

  @Delete(RolesRoutes.DELETE)
  @logging()
  private async _delete(req: ICustomRequest, res: Response) {
    const { language: language }: ICustomHeaders =
      req.headers;
    try {
      const result = await RolesCRUDService.deleteById({
        id: req.params.id,
      });
      this.sendSuccessResponse(res, result, language);
    } catch (error: any) {
      this.sendErrorResponse(res, error, language);
    }
  }

}
