import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import Loader from "../Loader/Loader";
import {shortValue} from "../ShortValue";

class ExchangesTagAddress extends Component {
  componentDidMount() {
    axios("https://crypto-project-backend.herokuapp.com/api/getExchangesTagAddressFromDb")
    // axios("http://localhost:5000/api/getExchangesTagAddressFromDb")
      .then(result => {
        return result.data.records;
      })
      .then(rowData => {
        this.setState({ rowData });
      })
      .catch(err => err);
  }

  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: "Address",
          field: "address",
          sortable: true,
          filter: true,
          width: 350
        },
        {
          headerName: "Name Tag",
          field: "tag",
          sortable: true,
          filter: true,
          width: 150,
        },
        // {
        //   headerName: "Blockchain",
        //   field: "tag",
        //   sortable: true,
        //   filter: true,
        // },
        // {
        //   headerName: "Balance",
        //   field: "balance",
        //   sortable: true,
        //   filter: true,
        //   width: 150,
        //   cellRenderer: params => shortValue(params.data.balance)
        // },
        // {
        //   headerName: "Txn Count",
        //   field: "count_txn",
        //   sortable: true,
        //   filter: true,
        //   width: 150,
        //   cellRenderer: params => shortValue(params.data.count_txn)
        // },
      ],
      rowData: [],
      modalIsOpenTwitter: false,
      currentExchangesTwitter: '',
      frameworkComponents: {
        customNoRowsOverlay: Loader
      },
      noRowsOverlayComponent: "customNoRowsOverlay",
    };
  }

  render() {
    const {
      columnDefs,
      rowData,
      frameworkComponents,
      noRowsOverlayComponent,
    } = this.state;

    return (
      <div className="ag-theme-balham">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          frameworkComponents={frameworkComponents}
          noRowsOverlayComponent={noRowsOverlayComponent}
          pagination={true}
        />
      </div>
    );
  }
}

export default ExchangesTagAddress;
