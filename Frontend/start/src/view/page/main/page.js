import React from 'react';

import ButtonsMenu from '../../composition/ButtonsMenu/component.js';

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {

    }

    render() {
        return (
          <div>
            <ButtonsMenu></ButtonsMenu>
          </div>        
        );
      }
}

export default Page;