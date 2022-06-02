const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const verificationTokenSchema = new Schema({
    
    owner: {
        // in storing object id inside mongodb
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    token: {
        type:String,
        // required:true 
    },
    createdAt: {
        type: Date,
        expires: "2m", //3600:16mins 1800:8mins
        default:Date.now //will be assigned whenever a user create an account
    }
}
);

// hashing of token before it get save to the database 
verificationTokenSchema.pre( 'save', async function (next) {
    // if (!this.token) {
    //     next()
    // }
     if (this.isModified("token")) {

        const hash = await bcrypt.hash(this.token, 8);

        this.token = hash
    } 
    
        next();
    
})

// caring of tokens 
verificationTokenSchema.methods.compareToken = async function (tokens) {

    const result = await bcrypt.compare(tokens, this.token);

    return result;
    
}

const verifyToken = mongoose.model('verifyToken', verificationTokenSchema);

module.exports = { verifyToken };
