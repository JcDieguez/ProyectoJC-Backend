import jwt from 'jsonwebtoken';


export const executePolicies = (policies) => {
  return (req, res, next) => {
    if (policies[0] === "PUBLIC") return next();
    const token = req.cookies[process.env.JWT_COOKIE];
    if (!token) return res.redirect('/login');
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      if (policies[0] === "AUTHENTICATED" || policies.includes(user.role.toUpperCase())) {
        return next();
      } else {
        res.redirect('/login');
      }
    } catch (error) {
      res.clearCookie(process.env.JWT_COOKIE).status(401).send({ status: "error", error: "Not authenticated" })
    }
  }
}
