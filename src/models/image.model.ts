import { Schema, Model, model } from "mongoose";
import { imageSchemaDto } from "../dtos/image.dtos";

const imageSchema : Schema<imageSchemaDto> = new Schema({
    key: {
        type: String,
        unique: true
    },
    tiles: {
        type: Number,
    },
    tile_keys: [{
        position: {
            type: String,
        },
        key: {
            type: String
        }
    }]
});

const Image : Model<imageSchemaDto> = model('Image', imageSchema);

export default Image;