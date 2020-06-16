import mongoose from 'mongoose'

const options = {
    "timestamps": true
}

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    phone: {
        type: Number
    },
    source: {
        type: String
    },
},options)

const clientModel = mongoose.model("Client",clientSchema);

module.exports = clientModel