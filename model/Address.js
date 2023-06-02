const { model, Schema } = require("mongoose");

const AddressSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    amountInEth: {
        type: String,
        required: true
    },
    amountInTokens: {
        type: String,
        required: true
    },
    claimed: {
        type: Boolean,
        default: false,
        required: true
    },
    index: {
        type: String,
        required: true
    }
});

module.exports = Address = model("Address", AddressSchema);