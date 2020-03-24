import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class HelpOrderMail {
  get key() {
    return 'HelpOrderMail';
  }

  async handle({ data }) {
    const { helpOrder } = data;

    // console.log('A fila andou...');

    await Mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: 'Gympoint: Sua dúvida foi respondida.',
      template: 'answer',
      context: {
        student: helpOrder.student.name,
        question: helpOrder.question,
        orderNumber: helpOrder.id,
        answer: helpOrder.answer,
        answer_at: format(parseISO(helpOrder.answer_at), "dd'/'MM'/'yy", {
          locale: pt,
        }),
      },
    });
  }
}

export default new HelpOrderMail();
