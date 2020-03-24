import * as Yup from 'yup';
import Queue from '../../lib/Queue';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';
import HelpOrderMail from '../jobs/HelpOrderMail';

class HelpOrderController {
  async index(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Invalid ID.' });
    }

    const studentExists = await Student.findByPk(id);

    if (!studentExists) {
      return res.status(400).json({ error: 'Student not found.' });
    }

    const helpOrders = await HelpOrder.findAndCountAll({
      where: { student_id: id },
      order: [['created_at', 'DESC']],
      attributes: [
        'id',
        'question',
        'answer',
        'answer_at',
        ['created_at', 'createdAt'],
      ],
      limit,
      offset: (page - 1) * limit,
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const { id } = req.params;
    const { question } = req.body;

    const studentExists = await Student.findByPk(id);

    if (!studentExists) {
      return res.status(400).json({ error: 'Student not found.' });
    }

    const helpOrder = {
      student_id: id,
      question,
    };

    await HelpOrder.create(helpOrder);

    return res.json(helpOrder);
  }

  async update(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Invalid ID.' });
    }

    const helpOrders = await HelpOrder.findByPk(Number(id), {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!helpOrders) {
      return res.status(400).json({ error: 'Help order not found.' });
    }

    helpOrders.answer_at = new Date();

    const helpOrder = await helpOrders.update(req.body);

    await Queue.add(HelpOrderMail.key, {
      helpOrder,
    });

    const { answer, answer_at } = helpOrder;

    // console.log('....');
    // console.log(id, question, studentExists, helpOrders);
    // console.log(req.body);

    return res.json({
      answer,
      answer_at,
    });
  }

  async show(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: { answer: null },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [['created_at']],
    });

    return res.json(helpOrders);
  }
}

export default new HelpOrderController();
