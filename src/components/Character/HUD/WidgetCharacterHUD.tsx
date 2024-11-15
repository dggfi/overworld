import React from 'react';
import { DimensionalWidget, } from '../../../../types/user-space';
import CharacterProfilePicture from './ProfilePicture/CharacterProfilePicture';
import { v4 as uuidv4 } from 'uuid';
import TransformableFrame from '../../Transformable/TransformableFrame';

export interface IWidgetCharacterHUDRecord extends DimensionalWidget {
    authorId: 'DGGFi',
    kind: 'DGGFiCharacterHudOriginal',
    profileShape?: 'round' | 'square',
    profileSrc?: string,
    profileUserWidth?: number,
    profileUserHeight?: number,
    profileBordered?: boolean,
    profileBorderColor?: string,
    profileBorderType?: 'simple' | 'custom',
    profileBorderProvision?: React.ReactNode
}

export const createWidgetCharacterHUD = (ownerId: string): IWidgetCharacterHUDRecord => ({
    id: uuidv4(),
    authorId: 'DGGFi',
    kind: 'DGGFiCharacterHudOriginal',
    ownerId,
    active: true,
    x: 0,
    y: 0,
    defaultX: 0,
    defaultY: 0,
    defaultWidth: 0,
    defaultHeight: 0,
    width: 0,
    height: 0,
    profileShape: 'round',
    profileSrc: '',
    profileBorderType: 'simple',
    profileBordered: true,
    profileUserWidth: 72,
    profileUserHeight: 72,
    profileBorderColor: 'red'
})

const tempWidgetRecord = createWidgetCharacterHUD('tempOwnerId');

const WidgetCharacterHUD: React.FC = () => {

    return (
        <TransformableFrame>
            <CharacterProfilePicture
                src={tempWidgetRecord.profileSrc || ''}
                userHeight={tempWidgetRecord.profileUserHeight || 0}
                userWidth={tempWidgetRecord.profileUserWidth || 0}
            />
        </TransformableFrame>
    )
}

export default WidgetCharacterHUD;