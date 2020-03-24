import * as Yup from 'yup';

import Registration from '../models/Registration';
import Student from '../models/Student';

class SessionStudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ error: 'Student does not exist.' });
    }

    const registration = await Registration.findOne({
      where: {
        student_id: id,
      },
    });

    if (!registration || !registration.active) {
      return res
        .status(401)
        .json({ error: 'Student does not have one active registration.' });
    }

    const { endDate } = registration;

    return res.json({
      student,
      currentContractEnd: endDate,
    });
  }
}

export default new SessionStudentController();
