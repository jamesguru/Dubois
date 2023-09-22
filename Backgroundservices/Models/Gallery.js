const mongoose = require("mongoose");


const GallerySchema = mongoose.Schema({


    title:{

        type:String,

        required:true,
    },

    desc:{

        type:String,

        required:true,

    },

    video:{

        type:String,

        required:true,

    }



},

{timestamps:true}

)
GallerySchema.index({"$**":"text"});
module.exports = mongoose.model("Gallery", GallerySchema);