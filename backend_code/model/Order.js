const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
    items: { type: [Schema.Types.Mixed] , required: true },
    totalAmount: { type: Number },
    totalItems: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    //TODO we can use enum for the paymentMethod
    paymentMethod: { type: String, required: true },
    status: { type: String, default: 'pending', required: true },
    selectedAddress: { type: Schema.Types.Mixed },
    date: {type: Date}
});

const virtual = orderSchema.virtual('id');
//to convert "_id" into "id" , we are using virtual schema
virtual.get(function(){
    return this._id;
})
orderSchema.set('toJSON', {
    virtuals: true,
    versionkey: false,
    transform: function(doc, ret) {
        delete ret._id;
    },
})

exports.Order = mongoose.model('Order', orderSchema);