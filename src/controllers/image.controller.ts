import { Request, Response } from "express";
import ResponseCreator from "../utils/responseCreator";
import * as imageService from "../services/image.service";

const UploadImage = async (req: Request, res: Response) => {
    const image = req.file;
    const { tilefactor } = req.body;

    const key = image!.filename;

    const {code, result=null, message} = await imageService.uploadImage(key, tilefactor);

    return ResponseCreator.generateResponse(res, code, result, message);
}

export {
    UploadImage,
}