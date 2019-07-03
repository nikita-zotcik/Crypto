import React, { Component } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import Loader from "../Loader/Loader";

class ModalHolders extends Component {

  componentDidMount() {
    axios(`http://api.ethplorer.io/getTopTokenHolders/${this.props.token}?apiKey=freekey&start=${this.state.start}&limit=100`)
      .then(result => {
        return result.data.holders;
      })
      .then(rowData => {
        rowData.forEach((item, index) => {
          item.number = index + 1;
        });
        this.setState({ rowData });
      })
      .catch(err => err);
  }

  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: "",
          field: "number",
          sortable: true,
          filter: true
        },
        {
          headerName: "Address",
          field: "address",
          sortable: true,
          filter: true,
          width: 450
        },
        {
          headerName: "Balance",
          field: "balance",
          sortable: true,
          filter: true
        },
      ],
      rowData: [],
      frameworkComponents: {
        customNoRowsOverlay: Loader
      },
      noRowsOverlayComponent: "customNoRowsOverlay",
      divStyle: { width: '100%', height:'100%', background: 'white', opacity: '1'},
      start: 1,
    };
  }

  clickNext = () => {
    const { start } = this.state;

    this.setState({start: start + 100});
    axios(`http://api.ethplorer.io/getTopTokenHolders/${this.props.token}?apiKey=freekey&start=${start + 100}&limit=100`)
      .then(result => {
        return result.data.holders;
      })
      .then(rowData => {
        this.setState({ rowData });
      })
      .catch(err => err);
  };

  clickPrev = () => {
    const { start } = this.state;

    this.setState({start: start - 100});
    axios(`http://api.ethplorer.io/getTopTokenHolders/${this.props.token}?apiKey=freekey&start=${start - 100}&limit=100`)
      .then(result => {
        return result.data.holders;
      })
      .then(rowData => {
        this.setState({ rowData });
      })
      .catch(err => err);
  };

  render() {
    const {
      columnDefs,
      rowData,
      frameworkComponents,
      noRowsOverlayComponent,
      divStyle,
      start
    } = this.state;
    
    return (
      <div style={divStyle}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          frameworkComponents={frameworkComponents}
          noRowsOverlayComponent={noRowsOverlayComponent}
        />
        {/*<button onClick={() => this.clickPrev()} disabled={start < 1}>prev</button>*/}
        {/*<button onClick={() => this.clickNext()}>next</button>*/}
      </div>
    )
  }
}

export default ModalHolders;
