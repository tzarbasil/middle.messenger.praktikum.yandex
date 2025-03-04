import { Link } from '../MainButton';
import Block from '../../services/Block';
import { ErrorLayout } from './errorComponent';
import './styles.scss';

interface ErrorInterface {
  title: string;
  subtitle: string;
  link: Link;
}

export class Error extends Block {
  constructor(props: ErrorInterface) {
    super({
      ...props,
    });
  }

  override render() {
    return ErrorLayout;
  }
}
