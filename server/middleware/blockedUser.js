const isUserBlocked = (req, res, next) => {
  const currentTime = new Date();
  if (req.user.blockedUntil && currentTime < new Date(req.user.blockedUntil)) {
    return res.status(403).json({ error: "User is temporarily blocked." });
  }
  next();
};

module.exports = isUserBlocked;
