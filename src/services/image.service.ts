import Image from "../models/image.model";
import shellExec from "shell-exec";
import fs from "fs";
import * as Util from "../utils/commonUtils";
import { Tile } from "../dtos/image.dtos";

const uploadImage = async (key: string, tilefactor: number) => {
    try {
        const existingFile = await Image.findOne({ key: key });

        if (existingFile) return { code: 400, message: "This file already exists" };

        const newFile = await Image.create({
            key: key,
        });

        const command = `cd uploads && python3 test.py ${key} ${tilefactor}`;

        await shellExec(command);

        const filename = Util.extract_file_name(key);

        const tilesFolder = `./uploads/output/${filename}/`;

        let filePaths: string[] = [], res = [];
        let count = 0, i = 1, j = 1, k = 0;

        fs.readdirSync(tilesFolder).forEach(file => {
            count++;
            filePaths.push(file);
        });

        newFile.tiles = count;
        let newTileFactor = Math.sqrt(count);
        let tile_keys : Tile = {};

        for (i = 1; i <= newTileFactor; i++) {
            if (k === count) break;
            let temp = [];
            for (j = 1; j <= newTileFactor; j++) {
                if (k === count) break;
                
                temp.push(filePaths[k]);
                k++;
            }

            temp = Util.sort_file(temp);
            tile_keys[`${i}`] = temp;
        }

        newFile.tile_keys = tile_keys;

        await newFile.save();

        return { code: 200, result: { key: key, tiles: count }, message: "OK" };

    } catch (err: any) {
        if (process.env.DEBUG === "TRUE") console.log(err);
        if (err.name === "ValidationError") return { code: 400, message: "Wrong Input Format" };
        return { code: 500, message: "Internal Server Error" };
    }
}

export {
    uploadImage
}