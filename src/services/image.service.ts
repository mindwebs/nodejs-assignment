import Image from "../models/image.model";
import shellExec from "shell-exec";
import fs from "fs";
import * as Util from "../utils/commonUtils";

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

        let filePaths = [];
        let count = 0, i = 1, j = 1;

        fs.readdirSync(tilesFolder).forEach(file => {
            count++;
        });

        newFile.tiles = count;

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