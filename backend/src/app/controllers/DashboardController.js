import { Op } from 'sequelize';

import Plan from '../models/Plan';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';
import Registration from '../models/Registration';

class DashboardController {
  async index(req, res) {
    const students = await Student.count();
    const plans = await Plan.count();

    const registrations = await Registration.count({
      where: {
        end_date: {
          [Op.gte]: new Date(),
        },
      },
    });

    const helpOrders = await HelpOrder.count({
      where: {
        answer_at: null,
      },
    });

    return res.json({
      students,
      plans,
      registrations,
      helpOrders,
    });
  }
}

export default new DashboardController();
