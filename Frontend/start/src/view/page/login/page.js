import React from 'react';

import LoginWindow from '../../composition/LoginWindow/component.js';

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
            <LoginWindow />
          </div>        
        );
      }
}

export default Page;