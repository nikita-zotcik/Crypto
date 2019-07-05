import React, { Component } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import Loader from "../Loader/Loader";

class ModalHolders extends Component {

  componentDidMount() {
    axios(`https://api.ethplorer.io/getTopTokenHolders/${this.props.token}?apiKey=freekey&start=${this.state.start}&limit=100`)
      .then(result => {
        return result.data.holders;
      })
      .then(rowData => {
        axios(`https://api.ethplorer.io/getTokenInfo/${this.props.token}?apiKey=freekey`)
          .then(result => {
            rowData.forEach((item, index) => {
              item.number = index + 1;
            });
            if('error' in result.data) {
              axios(`https://api.ethplorer.io/getAddressInfo/${this.props.token}?apiKey=freekey`)
                .then(response => {
                  const total = 'tokens' in response.data ? response.data.tokens[0].tokenInfo.totalSupply : response.data.tokenInfo.totalSupply;
                  this.setState({ rowData: rowData, totalSupply: total});
                })
            } else {
              this.setState({ rowData: rowData, totalSupply: result.data.totalSupply});
            }
          })
          .catch(err => err)
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
          headerName: "Quantity",
          field: "balance",
          sortable: true,
          filter: true,
          cellRenderer: params => {
            if (params.data.balance) {
              let span = document.createElement("span");
              span.innerText = (params.data.balance).toString();

              return span;
            }
          }
        },
        {
          headerName: "Percentage",
          field: "balance",
          sortable: true,
          filter: true,
          cellRenderer: params => {
            if (this.state.totalSupply) {
              let span = document.createElement("span");
              span.innerText = ((params.data.balance * 100) / this.state.totalSupply).toFixed(4) + '%';
              return span;
            }
          }
        },
      ],
      rowData: [],
      frameworkComponents: {
        customNoRowsOverlay: Loader
      },
      noRowsOverlayComponent: "customNoRowsOverlay",
      divStyle: { width: '100%', height:'100%', background: 'white', opacity: '1'},
      start: 1,
      totalSupply: '',
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
