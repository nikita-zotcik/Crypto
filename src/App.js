import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Currencies from './components/Currencies/Currensies';
import "react-tabs/style/react-tabs.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="ag-theme-balham">
        <Tabs>
          <TabList>
            <Tab>Currencies</Tab>
            <Tab>Exchanges</Tab>
            <Tab>ICOs</Tab>
            <Tab>Teams</Tab>
            <Tab>News</Tab>
          </TabList>

          <TabPanel>
            <Currencies />
          </TabPanel>
          <TabPanel>
            <h2>Exchanges Table</h2>
          </TabPanel>
          <TabPanel>
            <h2>ICOs component</h2>
          </TabPanel>
          <TabPanel>
            <h2>Teams component</h2>
          </TabPanel>
          <TabPanel>
            <h2>News component</h2>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default App;
