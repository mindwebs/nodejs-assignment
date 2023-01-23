import mongoose from "mongoose";

interface Tile {
    [key: string] : string[]
}

interface imageSchemaDto extends mongoose.Document {
    key: string;
    tiles: number;
    tile_keys: {
        row: number,
        paths: string[]
    }[];
}

export {
    imageSchemaDto,
    Tile
}