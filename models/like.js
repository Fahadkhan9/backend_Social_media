const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId
    },
    // ! this defines the object id of the like object
    likeable : {
        type : mongoose.Schema.ObjectId,
         require  : true,
         refpath :'onModel'
    },
    //! this field defines the type of the liked object Since this is a dynamic reference
    onModel : {
        type : String ,
        required : true,
        enum : ['Post','Comment']
    }
},{
    timestamps  : true
}
);

const Like = mongoose.model('Like',likeSchema);
module.exports = Like;