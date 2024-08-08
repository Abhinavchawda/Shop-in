const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String },
    email : { type: String, required: true, unique: true},
    password : { type: String, required: true },
    role : { type: String, required: true, default: 'user' },
    addresses : { type: [Schema.Types.Mixed] }, 
    orders: { type: [Schema.Types.Mixed] },
    // salt: {type: Buffer}
});

const virtual = UserSchema.virtual('id');
//to convert "_id" into "id" , we are using virtual schema
virtual.get(function () {
    return this._id;
})
UserSchema.set('toJSON', {
    virtuals: true,
    versionkey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
})

exports.User = mongoose.model('User', UserSchema);