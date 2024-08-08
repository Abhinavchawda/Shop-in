const mongoose = require('mongoose');
const {Schema} = mongoose;

const categorySchema = new Schema({
    value: { type: String, required: true, unique: true},
    label: { type: String, required: true, unique: true},
});

const virtual = categorySchema.virtual('id');
//to convert "_id" into "id" , we are using virtual schema
virtual.get(function(){
    return this._id;
})
categorySchema.set('toJSON', {
    virtuals: true,
    versionkey: false,
    transform: function(doc, ret) {
        delete ret._id;
    },
})

exports.Category = mongoose.model('Category', categorySchema);