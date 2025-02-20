import mongoose from "mongoose"

const storeSchema = new mongoose.Schema({
  workingHours: {
    type: Object,
    required: true,
  },
})

const StoreHours = mongoose.model(`storehour`, storeSchema)

export default StoreHours