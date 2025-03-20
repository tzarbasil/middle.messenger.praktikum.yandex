import { Form } from '../MainForm';
import { Link } from '../MainButton';
import { Block } from '../../services/Block';
import './styles.scss';
import { LoginForm } from './LoginForm';

interface LoginFormInterface {
  title: string;
  form: Form;
  link: Link;
}

export class Authorization extends Block {
  constructor(props: LoginFormInterface) {
    super({
      ...props,
    });
  }

  override render() {
    return LoginForm;
  }
}
