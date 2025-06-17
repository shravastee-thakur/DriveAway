// const carSchema = new mongoose.Schema ({
// name: {type: String, required: true},
// image : {type: String, required: true},
// capacity: {type : Number, required: true},
// fuelType: {type: String, required: true},
// bookedTimeSlots: [
// {
//     from: {type: String, required: true},
//     to: {type: String, required: true}
// }
// ],
// rentPerHour: {type: Number, required: true}

// }, {timestamps: true}
// )
// const carModel = mongoose.model('cars', carSchema)
// module.exports = carModel

// Booking model

// const mongoose= require("mongoose");
//         const bookingschema= new mongoose.Schema({

//         car: {type: mongoose.Schema.Types.ObjectID, ref: 'cars'},
//         user: {type: mongoose.Schema.Types.ObjectID, ref: 'users'},
//         bookedTimeSlots: {
//             from : {type: String},
//             to: {type: String}
//         },
//         totalHours: {type: Number},
//         totalAmount: {type : Number},
//         transactionId : {type: String},
//         driverRequired: {type: Boolean}
//         },
//         {timestamps: true}
//         )
// const bookingModel = mongoose.model('bookings', bookingschema)
// module.exports = bookingModel
