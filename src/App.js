import React, { Component } from "react";
import TabsComponent from './components/TabsComponent'
import "react-tabs/style/react-tabs.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="ag-theme-balham">
        <TabsComponent />
      </div>
    );
  }
}

export default App;
