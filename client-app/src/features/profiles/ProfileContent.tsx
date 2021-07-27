import { observer } from "mobx-react-lite";
import React from "react";
import { Tab, TabPane } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import ProfileAbout from "./ProfileAbout";
import ProfilePhotos from "./ProfilePhotos";

interface Props {
    profile: Profile;
}

export default observer(function ProfileContent({profile}: Props) {
    const panes = [
        {menuItem: 'About', render: () => <TabPane><ProfileAbout /></TabPane>},
        {menuItem: 'Photos', render: () => <TabPane><ProfilePhotos profile={profile} /></TabPane>},
        {menuItem: 'Events', render: () => <TabPane>Events content</TabPane>},
        {menuItem: 'Followers', render: () => <TabPane>Followers content</TabPane>},
        {menuItem: 'Following', render: () => <TabPane>Following content</TabPane>},
    ]

    return (
        <Tab 
            menu={{fluid: true, vertical: true}}
            menuPosition='right'
            panes={panes}
        />
    )
})