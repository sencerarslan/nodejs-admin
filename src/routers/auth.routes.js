const router = require("express").Router();
const {
  login,
  register,
  me,
  allUsers,
  getUser,
  forgetPassword,
  resetCodeCheck,
  resetPassword,
  updateUser,
  deleteUser,
} = require("../controllers/auth.controller");

// Auth validation middleware'inden giriş ve kayıt işlemleri için doğrulamayı al
const authValidation = require("../middlewares/validations/auth.validation");
// Auth middleware'inden token doğrulamasını al
const { tokenCheck, permissionsCheck } = require("../middlewares/auth");

// Group Route
const lg = "/lg";

// Rotaları tanımla
router.post(`${lg}/login`, authValidation.login, login);
router.post(`${lg}/register`, authValidation.register, register);
router.get(`${lg}/me`, tokenCheck, me);
router.post(`${lg}/forget-password`, forgetPassword);
router.post(`${lg}/reset-code-check`, resetCodeCheck);
router.post(`${lg}/reset-password`, resetPassword);

router.get(`${lg}/all-users`, tokenCheck, permissionsCheck(["read"]), allUsers);
router.post(`${lg}/user`, tokenCheck, getUser);
router.post(`${lg}/update-user`, tokenCheck, permissionsCheck(["write"]), updateUser);
router.post(`${lg}/delete-user`, tokenCheck, permissionsCheck(["delete"]), deleteUser);

module.exports = router;
