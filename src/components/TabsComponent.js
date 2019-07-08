import React, {Component} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import Currencies from './Currencies/Currencies';
import Exchanges from './Exchanges/Exchanges';
import Transactions from './Transactions/Transactions';
import ExchangesTagAddress from './ExchangesTagAddress/ExchangesTagAddress';
import 'react-tabs/style/react-tabs.css';

class TabsComponent extends Component {
  render() {
    return (
      <Tabs>
        <TabList>
          <Tab>Currencies</Tab>
          <Tab>Exchanges</Tab>
          <Tab>Exchanges Tag Address</Tab>
          <Tab>ICOs</Tab>
          <Tab>Teams</Tab>
          <Tab>News</Tab>
          <Tab>Transactions</Tab>
        </TabList>

        <TabPanel>
          <Currencies />
        </TabPanel>
        <TabPanel>
          <Exchanges />
        </TabPanel>
        <TabPanel>
          <ExchangesTagAddress />
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
        <TabPanel>
          <Transactions />
        </TabPanel>
      </Tabs>
    );
  }
}

export default TabsComponent;
