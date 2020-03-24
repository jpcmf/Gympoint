import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class UserController {
  async index(req, res) {
    const users = await User.findAll({
      where: { permission_level: 'admin' },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const userExistis = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExistis) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { id, name, email, permission_level, provider } = await User.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      permission_level,
      provider,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExistis = await User.findOne({
        where: { email },
      });

      if (userExistis) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    // const { id, name, permission_level, provider } = await user.update(
    //   req.body
    // );

    await user.update(req.body);

    const {
      id,
      name,
      permission_level,
      provider,
      avatar,
    } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      permission_level,
      provider,
      avatar,
    });
  }
}

export default new UserController();
