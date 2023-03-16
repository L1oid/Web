import React from 'react';

import RegisterWindow from '../../composition/RegisterWindow/component.js';

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
            <RegisterWindow />
          </div>        
        );
      }
}

export default Page;