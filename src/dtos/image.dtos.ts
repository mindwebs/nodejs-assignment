import mongoose from "mongoose";

interface imageSchemaDto extends mongoose.Document {
    key: string;
    tiles: number;
    tile_keys: [{
        position: string;
        key: string;
    }];
}

export {
    imageSchemaDto
}