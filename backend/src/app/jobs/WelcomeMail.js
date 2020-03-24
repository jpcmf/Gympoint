import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class WelcomeMail {
  get key() {
    return 'WelcomeMail';
  }

  async handle({ data }) {
    const { studentExists, planExists, start_date, end_date } = data;

    // console.log('A fila andou...');

    await Mail.sendMail({
      to: `${studentExists.name} <${studentExists.email}>`,
      subject: 'Bem-vindo ao Gympoint',
      // text: `Bem vindo ao Gympoint ${studentExists.name}`,
      template: 'welcome',
      context: {
        student: studentExists.name,
        plan_title: planExists.title,
        plan_duration: planExists.duration,
        start_date: format(parseISO(start_date), "dd'/'MM'/'yy", {
          locale: pt,
        }),
        end_date: format(parseISO(end_date), "dd'/'MM'/'yy", {
          locale: pt,
        }),
      },
    });
  }
}

export default new WelcomeMail();
