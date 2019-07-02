import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import moment from 'moment';
import { shortValue } from '../ShortValue';
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import './Transactions.css';
import Loader from "../Loader/Loader";

class Transactions extends Component {
  componentDidMount() {
    axios("https://crypto-project-backend.herokuapp.com/api/getTransactionsFromDb")
    // axios("http://localhost:5000/api/getTransactionsFromDb")
      .then(result => {
        return result.data;
      })
      .then( data => {
        const { transactions, countRecords } = data;
        this.setState({
          rowData: transactions,
          countRecords: countRecords,
          lastIdTransaction: transactions[transactions.length - 1]._id,
          previousIdTransaction: [transactions[0]._id],
        });
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
            span.innerText = moment(params.data.timestamp * 1000).format('MMMM Do YYYY, h:mm:ss a');
            return span;
          }
        },
        {
          headerName: "Coin",
          field: "blockchain",
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
        {
          headerName: "Sender",
          field: "from.owner",
          sortable: true,
          filter: true,
          cellRenderer: params => {
            let span = document.createElement("span");
            span.innerHTML = 'owner' in params.data.from ? params.data.from.owner : 'unknown';
            return span;
          }
        },
        {
          headerName: "Receiver",
          field: "to.owner",
          sortable: true,
          filter: true,
          cellRenderer: params => {
            let span = document.createElement("span");
            span.innerHTML = 'owner' in params.data.to ? params.data.to.owner : 'unknown';
            return span;
          }
        },
      ],
      rowData: [],
      countRecords: 0,
      lastIdTransaction: '',
      previousIdTransaction: [],
      pageNumber: 1,
      frameworkComponents: {
        customNoRowsOverlay: Loader
      },
      noRowsOverlayComponent: "customNoRowsOverlay",
    };
  }

  nextPage = () => {
    const { lastIdTransaction, pageNumber, previousIdTransaction } = this.state;
    this.setState({rowData: []});

    axios(`https://crypto-project-backend.herokuapp.com/api/getTransactionsFromDb?id=${lastIdTransaction}`)
    // axios(`http://localhost:5000/api/getTransactionsFromDb?id=${lastIdTransaction}`)
      .then(result => {
        return result.data.transactions;
      })
      .then( data => {
        if(previousIdTransaction.indexOf(data[0]._id) < 0) previousIdTransaction.push(data[0]._id);
        this.setState({
          rowData: data,
          lastIdTransaction: data[data.length - 1]._id,
          previousIdTransaction: previousIdTransaction,
          pageNumber: pageNumber + 1
        });
      })
      .catch(err => err);
  };

  prevPage = () => {
    const { previousIdTransaction, pageNumber } = this.state;
    this.setState({rowData: []});

    axios(`https://crypto-project-backend.herokuapp.com/api/getTransactionsFromDb?id=${previousIdTransaction[pageNumber - 2]}`)
    // axios(`http://localhost:5000/api/getTransactionsFromDb?id=${previousIdTransaction[pageNumber - 2]}`)
      .then(result => {
        return result.data.transactions;
      })
      .then( data => {
        previousIdTransaction.pop();
        this.setState({
          rowData: data,
          lastIdTransaction: data[data.length - 1]._id,
          previousIdTransaction: previousIdTransaction,
          pageNumber: pageNumber - 1,
        });
      })
      .catch(err => err);
  };

  render() {
    const {
      pageNumber,
      countRecords,
      frameworkComponents,
      rowData,
      columnDefs,
      noRowsOverlayComponent
    } = this.state;

    return (
      <div className="ag-theme-balham">
        <div className="table-transactions">
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            frameworkComponents={frameworkComponents}
            noRowsOverlayComponent={noRowsOverlayComponent}
          />
        </div>
        <div className="pagination-button">
          <button onClick={() => this.prevPage()} disabled={pageNumber === 1}>prev</button>
          <button onClick={() => this.nextPage()} disabled={Math.ceil(countRecords/100) === pageNumber}>next</button>
        </div>
      </div>
    );
  }
}

export default Transactions;
