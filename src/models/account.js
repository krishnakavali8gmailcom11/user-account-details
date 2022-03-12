import pkg from 'mongoose';
const { model, Schema } = pkg;

const accountSchema = new Schema({
    ifsc: String,
    number: Number,
    bank:  {
        type: Schema.Types.ObjectId,
        ref: 'Bank'
    }
});

export default model('Account', accountSchema);