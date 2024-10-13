var validator = require('validator');
const validateSignupData = (req)=>{
    const {firstName,lastName,email,password}= req.body;

    if(!firstName || !lastName){
        throw new Error("First name and last name are required");
    }
    else if(firstName.length<4 || lastName.length<4){
        throw new Error("First name and last name should be at least 4 characters long");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Invalid email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character");
    }
};

module.exports = {validateSignupData};