import React from 'react';

import { Provider } from 'react-redux';
import Store from '../../redux/store.js';

import ButtonsMenu from '../../component/buttons-menu/component.js';

function MainPage() {
    return (
        <Provider store = {Store} >
            <div>
                <ButtonsMenu />
            </div>
        </Provider>        
    )
}

export default MainPage;