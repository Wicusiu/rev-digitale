import * as React from 'react'

export const routeParamsToProps = (propsToMap) => (Component) => (props) => {
    let routeParamsProps = {} ;
    if(props.routeParams) {
        if(!propsToMap) {
            routeParamsProps = {...props.routeParams};
        } else {
            propsToMap.forEach(prop => {
                if(props.routeParams.hasOwnProperty(prop))
                    routeParamsProps[prop] = props.routeParams[prop] ;
            });
        }
    }

    return <Component {...props} {...routeParamsProps} />
}