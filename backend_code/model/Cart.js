const mongoose = require('mongoose');
const {Schema} = mongoose;

const cartSchema = new Schema({
    quantity : { type: Number, required: true },
    product: {type: Schema.Types.ObjectId, ref: 'Prodcut', required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

const virtual = cartSchema.virtual('id');
//to convert "_id" into "id" , we are using virtual schema
virtual.get(function(){
    return this._id;
})
cartSchema.set('toJSON', {
    virtuals: true,
    versionkey: false,
    transform: function(doc, ret) {
        delete ret._id;
    },
})

exports.Cart = mongoose.model('Cart', cartSchema);