import { Header } from "../../components/Header/header.js";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import * as React from 'react';
import { useState } from "react";
import { TabBox } from "../../components/Tabs/TabBox.js";
import AllFriends from "./AllFriends.js";
import FindFriends from "./FindFriends.js";
import FriendRequests from "./FriendRequests.js";
import NearMe from "./NearMe.js";
import RecentlyAdded from "./RecentlyAdded.js";


export const Friends = () => {
    const color = '#9146D8'
    const [tabs] = useState([
    {name: 'All Friends', id:0, comp: AllFriends},
    {name: 'Recently Added', id:1, comp: RecentlyAdded},
    {name: 'Near Me', id:2, comp: NearMe},
    {name: 'Friend Requests', id:3, comp: FriendRequests},
    {name: 'Find Friends', id:4, comp: FindFriends}

  ])
    return (
        <TabBox data={tabs} color={color}/>
    );
}