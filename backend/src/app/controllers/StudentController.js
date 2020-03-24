import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';
import File from '../models/File';

class StudentController {
  async index(req, res) {
    const { page = 1, quantity = 20, q: query = '' } = req.query;

    const { rows: students, count } = await Student.findAndCountAll({
      limit: quantity,
      offset: (page - 1) * quantity,
      where: {
        name: {
          [Op.iLike]: `%${query}%`,
        },
      },
      order: ['name'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.set({ total_pages: Math.ceil(count / quantity) }).json(students);
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    return res.json(student);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .positive()
        .max(100)
        .required(),
      weight: Yup.number()
        .positive()
        .required(),
      height: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists.' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number()
        .positive()
        .max(100),
      weight: Yup.number().positive(),
      height: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;

    const studentExists = await Student.findOne({ where: { id } });

    if (!studentExists) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    if (req.body.email && req.body.email !== studentExists.email) {
      const studentEmailExists = await Student.findOne({
        where: { email: req.body.email },
      });

      if (studentEmailExists) {
        return res.status(400).json({ error: 'Student already exists.' });
      }
    }

    const { name, email, age, weight, height } = await studentExists.update(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Invalid ID.' });
    }

    const student = await Student.findOne({
      where: { id },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    try {
      await student.destroy({
        where: { id },
      });

      return res.status(400).json({ success: 'Student deleted with success.' });
    } catch (err) {
      return res.status(400).json({ error: 'Delete fails.' });
    }
  }
}

export default new StudentController();
