import mongoose from "mongoose";

const AdminsRoles = new mongoose.Schema({
  RoleName: {
    type: String,
    required: true,
  },
  Permissions: {
    type: [String],
    required: true,
  },
});

const AdminRoleModel = mongoose.model("Roles", AdminsRoles);
export default AdminRoleModel;
