const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name:{
            type:string,
            required:true,
            maxlength:50,
        },
        email:{
            type:string,
            required:true,
            unique:true,
            minlength:5,
            maxlength:30,
        },
        mobile:{
            type:Number,
            require:true,
            unique:true,
            minlength:10,
            maxlength:15,
        },
        profiePic: {
            type: String,
            default:
              "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
          },
          role: {
            type: String,
            enum: ["user", "admin", "delivery"],
            default: "user",
          },
          address: [{ type: mongoose.Types.ObjectId, ref: "Address" }],
        },
        { timestamps: true }
      );
      
      const User = mongoose.model("User", userSchema);
      module.exports = User;  