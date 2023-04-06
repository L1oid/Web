import React from 'react';

import { Provider } from 'react-redux';
import Store from '../../redux/store.js';

import HomeworkTable from '../../component/HomeworkTable/component.js';
import ButtonsMenu from '../../composition/buttons-menu/component.js';

function HomeworkPage() {
    return (
        <Provider store = {Store} >
            <div>
                <ButtonsMenu />
                <HomeworkTable />
            </div>
        </Provider>       
    )
}

export default HomeworkPage;