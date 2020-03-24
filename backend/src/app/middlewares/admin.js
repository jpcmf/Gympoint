export default async (req, res, next) => {
  if (req.userPermission !== 'admin') {
    return res
      .status(401)
      .send({ error: 'Only admin can execute this request.' });
  }

  return next();
};
