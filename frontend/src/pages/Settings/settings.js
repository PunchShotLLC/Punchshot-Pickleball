import * as React from 'react';
import { useState } from "react";
import { TabBox } from "../../components/Tabs/TabBox.js";
import General from "./general.js";
import Privacy from "./privacy.js";
import Blocking from "./blocking.js";
import Location from "./location.js";
import Other from './other.js';

export const Settings = () => {

    const color = '#9146D8'
    const [tabs] = useState([
    {name: 'General', id:0, comp: General},
    {name: 'Privacy & Security', id:1, comp: Privacy},
    {name: 'Blocking', id:2, comp: Blocking},
    {name: 'Location & Region', id:3, comp: Location},
    {name: 'Other', id:4, comp: Other}

  ])
    return (
        <TabBox data={tabs} color={color}/>
    );
}


