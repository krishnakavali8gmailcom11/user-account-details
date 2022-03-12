import pkg from 'mongoose';
const { model, Schema } = pkg;

const userSchema = new Schema({
    name: String,
    accounts: [{
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }]
});

export default model('User', userSchema);