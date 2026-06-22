import jwt from "jsonwebtoken";

export const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { _id: userId },
    process.env.JWT_ACCESS_SECRET || "default_access_secret",
    { expiresIn: "15m" } // 15 minutes
  );

  const refreshToken = jwt.sign(
    { _id: userId },
    process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
    { expiresIn: "7d" } // 7 days
  );

  return { accessToken, refreshToken };
};
