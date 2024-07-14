import UserModel from "../models/user.js";


const Getuser = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
};

const deletUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const checkAdmin = await UserModel.findById(userId);

    if (checkAdmin.role == "admin") {
      return res.status(409).json({ message: "you can not Delete Admin" });
    }
    const user = await UserModel.findByIdAndDelete(userId);
    // const remainingUsers = await user.find({});
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ message: "user delete successfully ", user });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
};

export { Getuser, deletUser };
