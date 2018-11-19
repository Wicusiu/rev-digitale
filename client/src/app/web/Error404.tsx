import * as React  from 'react';
import ErrorPage from 'app/web/ErrorPage';

export interface IError404Props {
  children?: any;
}

class Error404 extends React.Component<IError404Props> {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { children } = this.props;

    return (
      <ErrorPage errors={[{
        intent:'error',
        message: 'La page demandée est introuvable. Veuillez vérifier le chemin d\'accès à la ressource concernée',
      }]}>{children}</ErrorPage>
    );
  }
}

export default Error404;
