import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET || "default_access_secret"
    );
    req.user = decoded; // Contains { _id: "..." }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
