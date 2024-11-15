import React from 'react';
import '../../styles/styles';
import WidgetCharacterHUD from '../Character/HUD/WidgetCharacterHUD';
import { Provider } from 'react-redux';
import store from '../../store/store';

const NewComponentStage: React.FC = () => {
    return (
        <Provider store={store}>
            <div className='w-dvh h-dvh relative flex'>
                <WidgetCharacterHUD />
            </div>
        </Provider>
    )
}

export default NewComponentStage;