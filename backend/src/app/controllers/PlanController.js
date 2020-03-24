import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll({
      attributes: ['id', 'title', 'price', 'duration'],
    });

    return res.json(plans);
  }

  async show(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    return res.json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { title, duration, price } = await Plan.create(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Invalid ID.' });
    }

    const planExists = await Plan.findByPk(id);

    if (!planExists) {
      return res.status(404).json({ error: 'Plan not found.' });
    }

    const { title, duration, price } = await planExists.update(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Invalid ID.' });
    }

    const plan = await Plan.findOne({
      where: { id },
    });

    if (!plan) {
      return res.status(404).json({ error: 'Plan not found.' });
    }

    try {
      await plan.destroy({
        where: { id },
      });

      return res.status(200).json({ success: 'Plan deleted with success.' });
    } catch (err) {
      return res.status(400).json({ error: 'Delete fails.' });
    }
  }
}

export default new PlanController();
