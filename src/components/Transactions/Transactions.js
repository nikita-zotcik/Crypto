import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import moment from 'moment';
import { shortValue } from '../ShortValue';
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-grid.css";

class Transactions extends Component {
  componentDidMount() {
    axios("https://crypto-project-backend.herokuapp.com/api/getTransactionsFromDb")
    // axios("http://localhost:5000/api/getTransactionsFromDb")
      .then(result => {
        return result.data.transactions;
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
          headerName: "Date",
          field: "timestamp",
          sortable: true,
          filter: true,
          cellRenderer: params => {
            let span = document.createElement("span");
            span.innerText = moment(params.data.timestamp).format('MMMM Do YYYY, h:mm:ss a');
            return span;
          }
        },
        // {
        //   headerName: "Date",
        //   field: "timestamp",
        //   sortable: true,
        //   filter: true,
        //   cellRenderer: params => {
        //     let span = document.createElement("span");
        //     span.innerText = moment(params.data.timestamp * 1000).format('MMMM Do YYYY, h:mm:ss a');
        //     return span;
        //   }
        // },
        {
          headerName: "Coin",
          field: "coin",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Amount",
          field: "amount",
          sortable: true,
          filter: true,
          cellRenderer: params => shortValue(params.data.amount)
        },
        {
          headerName: "Amount USD",
          field: "amount_usd",
          sortable: true,
          filter: true,
          cellRenderer: params => shortValue(params.data.amount_usd)
        },
        // {
        //   headerName: "Sender",
        //   field: "sender",
        //   sortable: true,
        //   filter: true,
        // },
        // {
        //   headerName: "Receiver",
        //   field: "receiver",
        //   sortable: true,
        //   filter: true,
        // },
        {
          headerName: "Sender",
          field: "from.owner_type",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Receiver",
          field: "to.owner_type",
          sortable: true,
          filter: true,
        },
      ],
      rowData: [],
    };
  }

  render() {
    return (
      <div className="ag-theme-balham">
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          pagination={true}
        />
      </div>
    );
  }
}

export default Transactions;
