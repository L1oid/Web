import React from 'react';

import HomeworkTable from '../../component/HomeworkTable/component.js';
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
            <ButtonsMenu></ButtonsMenu>
            <HomeworkTable></HomeworkTable>
          </div>        
        );
      }
}

export default Page;