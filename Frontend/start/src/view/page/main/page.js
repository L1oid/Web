import React from 'react';

import ButtonsMenu from '../../composition/ButtonsMenu/component.js';

class Page extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        status: null
      }
    }

    render() {
        return (
          <div>
            <ButtonsMenu />
          </div>        
        );
      }
}

export default Page;