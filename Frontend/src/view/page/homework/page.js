import React from 'react';

import HomeworkTable from '../../component/homework-table/component.js';
import ButtonsMenu from '../../component/buttons-menu/component.js';

function HomeworkPage() {
    return (
        <div>
            <ButtonsMenu />
            <HomeworkTable />
        </div>     
    )
}

export default HomeworkPage;