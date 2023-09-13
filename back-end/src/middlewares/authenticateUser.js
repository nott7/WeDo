import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ data: {}, error: true, message: "Invalid token", token });
  }
};
