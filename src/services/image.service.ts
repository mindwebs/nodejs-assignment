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

        const command = `cd uploads && python3 script.py ${key} ${tilefactor}`;

        await shellExec(command);

        const filename = Util.extract_file_name(key);

        const tilesFolder = `./uploads/output/${filename}/`;

        let filePaths: string[] = [], res = [];
        let count = 0, i = 1, j = 1, k = 0;

        fs.readdirSync(tilesFolder).forEach(file => {
            count++;
            filePaths.push(file);
        });

        filePaths.sort((file1, file2) => {
            let name1 = file1, name2 = file2;
            name1 = name1.split('.')[0];
            name1 = name1.split('_')[1];

            name2 = name2.split('.')[0];
            name2 = name2.split('_')[1];

            if (Number(name1) > Number(name2)) return 1;
            if (Number(name1) < Number(name2)) return -1;
            return 0;
        });

        newFile.tiles = count;
        let newTileFactor = Math.sqrt(count);

        for (i = 1; i <= newTileFactor; i++) {
            if (k === count) break;
            let temp = [];
            for (j = 1; j <= newTileFactor; j++) {
                if (k === count) break;

                temp.push(filePaths[k]);
                k++;
            }

            temp = Util.sort_file(temp);
            res.push({
                row: i,
                paths: temp,
            })
        }

        newFile.tile_keys = res;

        await newFile.save();

        return { code: 200, result: { key: key, tiles: count }, message: "OK" };

    } catch (err: any) {
        if (process.env.DEBUG === "TRUE") console.log(err);
        if (err.name === "ValidationError") return { code: 400, message: "Wrong Input Format" };
        return { code: 500, message: "Internal Server Error" };
    }
}

const listTilePaths = async (key: string, position: number[], radius: number) => {
    try {
        const existingFile: any = await Image.findOne({ key: key });

        if (!existingFile) return { code: 404, message: "No Such Image found" };

        let r = radius, center_x = position[0], center_y = position[1];

        if (center_x > existingFile.tile_keys.length || center_y > existingFile.tile_keys.length) return { code: 400, message: "Given position exceeding tile matrix dimensions. Please give a correct position pertaining to the dimensions of the image" };

        let starting_x = 0, starting_y = 0;
        let bottomLeft_x = 0, bottomLeft_y = 0;
        let topRight_x = 0, topRight_y = 0;
        let ending_x = 0, ending_y = 0;
        let numRows = 0, numCols = 0;

        // The below set of codes represent how to find the four corner positions of the sub-matrix

        while (center_x - r < 0 && center_y - r < 0) r--;

        starting_x = center_x - r;
        starting_y = center_y - r;

        r = radius;

        while (center_x + r > 0 && center_y - r < 0) r--;
        bottomLeft_x = center_x + r;
        bottomLeft_y = center_y - r;

        r = radius;

        while (center_x - r < 0 && center_y + r > 0) r--;
        topRight_x = center_x - r;
        topRight_y = center_y + r;

        r = radius;

        while (center_x + r > 0 && center_y + r > 0) r--;
        ending_x = center_x + r;
        ending_y = center_y + r;

        numRows = bottomLeft_x - starting_x + 1;
        numCols = topRight_y - starting_y + 1;

        let positions = [], paths = [];

        for (let i = starting_x - 1; i < starting_x + numRows - 1; i++) {
            const index = `${i + 1}`;
            let temp = [], paths_ith_row: any[] = [];

            existingFile.tile_keys.forEach((tile_key: any) => {
                if (tile_key.row === i + 1) {
                    paths_ith_row = tile_key.paths;
                    return;
                }
            });



            for (let j = starting_y - 1; j < starting_y + numCols - 1; j++) {
                const pos = `${i + 1}, ${j + 1}`;
                temp.push(pos);

                paths.push(paths_ith_row[j]);
            }

            positions.push(temp);
        }

        return {
            code: 200, result: {
                key: key,
                positions: positions,
                images: paths,
            }, message: "OK"
        };

    } catch (err: any) {
        if (process.env.DEBUG === "TRUE") console.log(err);
        if (err.name === "ValidationError") return { code: 400, message: "Wrong Input Format" };
        return { code: 500, message: "Internal Server Error" };
    }
}

const getFullImage = async (key: string) => {
    try {
        const existingImage = await Image.findOne({ key: key });

        if (!existingImage) return { code: 404, message: "Not Found" };

        const fileLocation = `./uploads/${existingImage.key}`;

        const file = fs.createReadStream(fileLocation);

        if (!file) return { code: 400, message: "File Not Found in storage" };

        return { code: 200, file: file, message: "OK" };

    } catch (err: any) {
        if (process.env.DEBUG === "TRUE") console.log(err);
        if (err.name === "ValidationError") return { code: 400, message: "Wrong Input Format" };
        return { code: 500, message: "Internal Server Error" };
    }
}

const getTileImage = async (path: string) => {
    try {
        let tile_name = path.split('.')[0], ext = path.split('.')[1];
        let folder_name = tile_name.split('_')[0];
        let key = folder_name + "." + ext;

        const existingImage = await Image.findOne({ key: key });

        if (!existingImage) return { code: 404, message: "No such image exists" };

        const fileLocation = `./uploads/output/${folder_name}/${path}`;

        const file = fs.createReadStream(fileLocation);

        if (!file) return { code: 500, message: "Internal Server error" };

        return { code: 200, file: file, message: "OK" };

    } catch (err: any) {
        if (process.env.DEBUG === "TRUE") console.log(err);
        if (err.name === "ValidationError") return { code: 400, message: "Wrong Input Format" };
        return { code: 500, message: "Internal Server Error" };
    }
}

export {
    uploadImage,
    listTilePaths,
    getFullImage,
    getTileImage,
}