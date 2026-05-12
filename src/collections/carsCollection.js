import mongoose, {Schema}  from "mongoose";

const engineSchema = new Schema({
    type: ["petrol", "diesel", "hybrid", "electric"],
    volume_l: Number,
    power_hp: Number,
    _id: false
})

const carsSchema = new Schema({
_id: {
    type: String,
    required: true
},
brand: {
    type: String,
    required: true
},
model: {
    type: String,
    required: true
},
year: Number,
price_usd: Number,
mileage_km: Number,
engine: engineSchema,
transmission: String,
drivetrain: String,
body_type: String,
color: String,
features: [String],
in_stock: Boolean
})
export const carsCollection = mongoose.model('Cars', carsSchema, "Cars")