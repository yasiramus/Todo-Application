const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({

    firstName: {
        type: String,
        required: [true,'enter first name'],
        minlength: [3, 'first name character should not be below 2.'],
        maxlength: [10, 'first name character should not exceed 9.']
    },

    lastName: {
        type: String,
        required: [true,'enter last name'],
        minlength: [3, 'last name character should not be below 2.'],
        maxlength: [15, 'last name character should not exceed 14.']
    },

    otherName: {
        type: String,
        maxlength: [10, 'other name character should not exceed 9.']
    },

    email: {
        type: String,
        required: [true,'enter email'],
        maxlength: [30, 'email character should not exceed 29.'],
        lowercase: true,
        trim:true,
        unique: true
    },

    password: {
        type: String,
        required:[true, 'enter password'],
        minlength: [5, 'password should be above 5 characters.'],
    },
    todos: [
        {
            type: Schema.Types.ObjectId,
            ref:'Todo'
        }
    ],
    resetToken: {
        type:String 
    }
},
    {
        timestamps: true
    }
);

// hashing of password before it get save to the database 
userSchema.pre( 'save', async function (next) {
    
    if (this.password.length > 50 ) {
        next()
    } else {
        const salt = await bcrypt.genSalt(); //generate salt

        this.password = await bcrypt.hash(this.password, salt);
    
        next();
    }

    // if (this.password.length > 50 ) {
    //     return
    // } else {
    //     const salt = await bcrypt.genSalt(); //generate salt

    //     this.password = await bcrypt.hash(this.password, salt);
    
    // }
    // next();
})

const User = mongoose.model('User', userSchema);

module.exports = { User };
