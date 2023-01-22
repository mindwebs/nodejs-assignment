import { Router } from "express";
import multer from "multer";
import * as Util from "../utils/commonUtils";
import * as imageController from "../controllers/image.controller";

const imageRouter = Router();

const fileStorage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, './uploads');
    },
    filename: function (req: any, file: any, cb: any) {
        let ext = '';

        if (file.mimetype == 'image/jpeg') ext = '.jpg';
        else if (file.mimetype == 'image/png') ext = '.png';

        cb(null, Util.get_current_time() + "-" + `image${ext}`);
    }
});

const upload = multer({ storage: fileStorage });

imageRouter.post(
    '/upload',
    upload.single('file'),
    imageController.UploadImage,
);

export default imageRouter;