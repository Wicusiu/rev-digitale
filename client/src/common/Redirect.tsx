import * as React from 'react' ;
import { browserHistory } from 'react-router' ;

export interface IRedirectProps {
    to : string;
}

export default class Redirect extends React.Component<IRedirectProps> {

    componentDidMount() {
        browserHistory.push(this.props.to) ;
    }

    render() {
        return <span /> 
    }
}