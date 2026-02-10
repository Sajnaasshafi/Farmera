import User from "../Models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    const existingmail = await User.findOne({ email: req.body.email });
    if (existingmail) {
      return res.status(400).json("Mail already exists");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userData = {
      name: req.body.name,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      farmname: req.body.farmname,
      farmlocation: req.body.farmlocation,
      farmaddress: req.body.farmaddress,
      userrole: req.body.userrole,
      password: hashedPassword,

      // ✅ CLOUDINARY IMAGE URL
      farmerimage: req.file ? req.file.path : null,
    };

    const newuser = new User(userData);
    const saveduser = await newuser.save();

    res.status(201).json(saveduser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred during register" });
  }
};

export const login = async(req,res)=>{
    const {email, password} = req.body;
    try{
        let response = await User.findOne({email: email});
        if(!response){
            console.log('user not found')
            return res.status(404).json('user not found')
        }
        let matchepassword = await bcrypt.compare(password,response.password)
        console.log(matchepassword)
        if(!matchepassword){
            console.log('Invalid Password');
            return res.status(401).json('Invalid Password')
        }
        const token = jwt.sign(
            {
                userId: response._id,
                email: response.email,
            },
            "abc",
            { expiresIn: "1h"}
        );
        
        return res.status(201).json({message: "Login Successfully",
            token: token,
            _id: response._id,
            name: response.name,
            email: response.email,
            phonenumber: response.phonenumber,
            userrole: response.userrole,
            farmerimage: response.farmerimage,
            farmname: response.farmname
        });
    }
    catch(error){
        console.error('Error during login:', error)
        res.status(500).json({message:'An error occur during login'})
    }
}
