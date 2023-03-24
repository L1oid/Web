import React from 'react';

import HomeworkTable from '../../component/HomeworkTable/component.js';

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
            <HomeworkTable></HomeworkTable>
          </div>        
        );
      }
}

export default Page;