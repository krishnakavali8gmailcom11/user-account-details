import pkg from 'mongoose';
const { model, Schema } = pkg;

const bankSchema = new Schema({
    name:  String,
    branch:  String,
    city:  String,
    weather:  String
});

export default model('Bank', bankSchema);