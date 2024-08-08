const mongoose = require('mongoose');
const {Schema} = mongoose;

const brandSchema = new Schema({
    value: { type: String, required: true, unique: true},
    label: { type: String, required: true, unique: true},
});

const virtual = brandSchema.virtual('id');
//to convert "_id" into "id" , we are using virtual schema
virtual.get(function() {
    return this._id;
})
brandSchema.set('toJSON', {
    virtuals: true,
    versionkey: false,
    transform: function(doc, ret) {
        delete ret._id;
    },
})

exports.Brand = mongoose.model('Brand', brandSchema);