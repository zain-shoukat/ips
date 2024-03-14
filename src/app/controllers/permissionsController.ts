import { Controller, Delete, Get, Middleware, Post, Put } from "@overnightjs/core";
import { BaseController } from "./baseController.js";
import { ICustomHeaders, ICustomRequest, JoiValidator, PermissionsRoutes, ReqValidations } from "../utils/index.js";
import { logging } from "../../config/decorators/log.js";
import { PermissionsCRUDService } from "../../app/services/permissions/index.js";
import { Response } from 'express';



@Controller(PermissionsRoutes.BASE)
export class PermissionsController extends BaseController {

    @Post(PermissionsRoutes.CREATE)
    @Middleware([
      JoiValidator(ReqValidations.CreatePermissionsValidator),
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
          await PermissionsCRUDService.create({
            ...req.body,
            requestUrl: req.originalUrl,
          });
        this.sendSuccessResponse(res, result, language);
      } catch (error: any) {
        this.sendErrorResponse(res, error, language);
      }
    }


    @Get(PermissionsRoutes.GET_ALL)
    @logging()
    private async _get(req: ICustomRequest, res: Response) {
      const { language: language }: ICustomHeaders =
        req.headers;
      try {
        const result = await PermissionsCRUDService.list({
          ...req.query,
          requestUrl: req.originalUrl,
        });
        this.sendSuccessResponse(res, result, language);
      } catch (error: any) {
        this.sendErrorResponse(res, error, language);
      }
    }
  
    @Get(PermissionsRoutes.GET_BY_ID)
    @logging()
    private async _getById(req: ICustomRequest, res: Response) {
      const { language: language }: ICustomHeaders =
        req.headers;
      try {
        const result = await PermissionsCRUDService.readById({
          id: req.params.id,
          requestUrl: req.originalUrl,
        });
        this.sendSuccessResponse(res, result, language);
      } catch (error: any) {
        this.sendErrorResponse(res, error, language);
      }
    }

    @Put(PermissionsRoutes.UPDATE_BY_ID)
    @Middleware([
      JoiValidator(ReqValidations.UpdatePermissionsValidator),
    ])
    @logging()
    private async _update(
      req: ICustomRequest,
      res: Response,
    ) {
      const { language: language }: ICustomHeaders =
        req.headers;
  
      try {
        const result: IAPISuccessResponse =
          await PermissionsCRUDService.updateById(Number(req.params.id),req.body);
        this.sendSuccessResponse(res, result, language);
      } catch (error: any) {
        this.sendErrorResponse(res, error, language);
      }
    }

    @Delete(PermissionsRoutes.DELETE)
    @logging()
    private async _delete(req: ICustomRequest, res: Response) {
      const { language: language }: ICustomHeaders =
        req.headers;
      try {
        const result = await PermissionsCRUDService.deleteById({
          id: req.params.id,
        });
        this.sendSuccessResponse(res, result, language);
      } catch (error: any) {
        this.sendErrorResponse(res, error, language);
      }
    }

}