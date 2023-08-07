const mongoose = require('mongoose');


const PromoSchema = mongoose.Schema({

image:{

    type: String,

    require:true,
},


title:{

    type: Array,

    require:true,
},

desc:{

    type:String,

    require:true,
}


})


module.exports = mongoose.model('Promo',PromoSchema); 