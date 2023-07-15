import jwt from "jsonwebtoken";


const tokenGenerate = (payload,timeExpire=3000) => {
  return jwt.sign(payload, "topScret", {
    expiresIn: timeExpire,
    algorithm: "HS256",
  });
};

const generateAccessToken = (user) => tokenGenerate(user);

const generateRefreshToken = (user,timeExpire) => tokenGenerate(user,timeExpire);

export { generateAccessToken, generateRefreshToken };
