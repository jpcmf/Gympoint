import { Op } from 'sequelize';
import { startOfWeek, endOfWeek } from 'date-fns';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Invalid ID.' });
    }

    const checkins = await Checkin.findAndCountAll({
      where: { student_id: { [Op.eq]: id } },
      order: [['created_at', 'DESC']],
      attributes: ['id', ['created_at', 'createdAt']],
      limit,
      offset: (page - 1) * limit,
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Invalid ID.' });
    }

    const searchDate = Number(new Date());

    const studentExists = await Student.findByPk(id);

    if (!studentExists) {
      return res.status(400).json({ error: 'Student not found.' });
    }

    const checkins = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: {
          [Op.between]: [startOfWeek(searchDate), endOfWeek(searchDate)],
        },
      },
    });

    if (checkins.length >= 5) {
      return res.status(400).json({
        error: 'Limit exceeded. You can only check 5 times in a week.',
      });
    }

    const { created_at } = await Checkin.create({ student_id: id });

    const { name, email } = studentExists;

    return res.json({
      name,
      email,
      checkin: created_at,
    });
  }
}

export default new CheckinController();
