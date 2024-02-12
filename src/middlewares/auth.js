const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const permissionModel = require("../models/permission.model");
const APIError = require("../utils/errors");

// Kullanıcıya JWT oluşturur ve yanıt olarak gönderir
const createToken = async (user, res) => {
  const payload = {
    sub: user._id,
    nam: user.name,
  };

  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return res.status(201).json({ success: true, token, message: "İşlem başarılı" });
};

// İsteğin üzerindeki tokenı kontrol eder ve kullanıcıyı doğrular
const tokenCheck = async (req, res, next) => {
  const headerToken = req.headers.authorization && req.headers.authorization.startsWith("Bearer ");

  if (!headerToken) throw new APIError("Geçersiz oturum lütfen giriş yapınız.", 401);

  const token = req.headers.authorization.split(" ")[1];

  await jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) throw new APIError("Geçersiz token.", 401);
    const userInfoPromise = await userModel
      .findById(decoded.sub)
      .collation({ locale: "en", strength: 2 })
      .select("_id name lastname email role");

    if (!userInfoPromise) throw new APIError("Geçersiz token.", 401);

    const permissionInfoPromise = await permissionModel
      .findOne({ role: userInfoPromise.role })
      .collation({ locale: "en", strength: 2 })
      .select("permission");

    const [userInfo, permissionInfo] = await Promise.all([userInfoPromise, permissionInfoPromise]);

    if (!permissionInfo || !permissionInfo.permission) throw new APIError("İzinler bulunamadı.", 403);

    const permissions = JSON.parse(permissionInfo.permission.replace(/'/g, '"'));

    req.user = {
      ...userInfo.toObject(),
      permissions: permissions,
    };
  });

  next();
};

const permissionsCheck = (permissions) => {
  return async (req, res, next) => {
    try {
      const userPermissions = req.user.permissions || []; // Kullanıcının izinlerini al, yoksa boş bir dizi kullan
      const isAdmin = req.user.role === "admin";

      // Eğer kullanıcı admin değilse ve gerekli izinlerden herhangi birine sahip değilse
      if (!isAdmin && !permissions.some((permission) => userPermissions.includes(permission))) {
        throw new APIError("Bu işlemi gerçekleştirmek için yeterli izniniz yok.", 403);
      }

      next();
    } catch (error) {
      next(error); // Hata varsa sonraki middleware'e iletilir
    }
  };
};

// Geçici bir JWT oluşturur ve döndürür
const createTemporaryToken = async (userId, email) => {
  const payload = {
    sub: userId,
    nam: email,
  };

  const token = await jwt.sign(payload, process.env.JWT_TEMPORARY_SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: process.env.JWT_TEMPORARY_EXPIRES_IN,
  });

  return "Bearer " + token;
};

// Geçici JWT'yi çözerek kullanıcıyı döndürür
const decodedTemporaryToken = async (temporaryToken) => {
  const token = temporaryToken.split(" ")[1];

  let userInfo;

  await jwt.verify(token, process.env.JWT_TEMPORARY_SECRET_KEY, async (err, decoded) => {
    if (err) throw new APIError("Geçersiz token.", 401);
    userInfo = await user
      .findById(decoded.sub)
      .collation({ locale: "en", strength: 2 })
      .select("_id name lastname email");

    if (!userInfo) throw new APIError("Geçersiz token.", 401);
  });
  return userInfo;
};

module.exports = {
  createToken,
  tokenCheck,
  permissionsCheck,
  createTemporaryToken,
  decodedTemporaryToken,
};
