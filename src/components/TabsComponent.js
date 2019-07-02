import React, {Component, Fragment} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import Currencies from './Currencies/Currencies';
import Exchanges from './Exchanges/Exchanges';
import Transactions from './Transactions/Transactions';
import 'react-tabs/style/react-tabs.css';
import axios from "axios";


class TabsComponent extends Component {
    state = {
        auth: false
    };
    openTgInput = () => {
        this.setState({
            auth: !this.setState.auth
        })
    };
    sendAuthCode = ()=> {
        this.openTgInput();
        console.log(this.inputCode.value);
        axios(`http://localhost:5000/api/tgAuth?code=${this.inputCode.value}`)
            .then(result => {
                    this.setState({
                        auth: false
                    })
            })
            .catch(err => {
                console.debug(err.message);
                this.setState({
                    error: err.message
                })
            });
    };

  render() {
      const {auth} = this.state;
    return (
        <Fragment>
      <Tabs>
        <TabList>
          <Tab>Currencies</Tab>
          <Tab>Exchanges</Tab>
          <Tab>ICOs</Tab>
          <Tab>Teams</Tab>
          <Tab>News</Tab>
          <Tab>Transactions</Tab>

        </TabList>

        <TabPanel>
          <Currencies/>
        </TabPanel>
        <TabPanel>
          <Exchanges/>
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
            {!auth ? <button className='tg-auth' onClick={this.openTgInput}>Telegram auth</button> : <div><input ref={(input =>(this.inputCode = input))}/><button onClick={this.sendAuthCode}>send</button></div>}
        </Fragment>
    );
  }
}

export default TabsComponent;
