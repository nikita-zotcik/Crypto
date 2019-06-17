import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import { spawn } from "child_process";

class App extends Component {
  componentDidMount() {
    axios("https://crypto-project-backend.herokuapp.com/api/getCoinsFromDb")
      .then(result => {
        return result.data.coins;
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
          headerName: "Id",
          field: "id",
          sortable: true,
          filter: true,
          width: 100
        },
        {
          headerName: "Name",
          field: "name",
          sortable: true,
          filter: true,
          width: 100,
          cellRenderer: params => {
            let icon = document.createElement("img");
            let name = document.createElement("span");
            icon.src = params.data.logo;
            name.innerHTML = params.data.name;
            icon.appendChild(name);
            return icon;
          }
        },
        {
          headerName: "Symbol",
          field: "symbol",
          sortable: true,
          filter: true,
          width: 100
        },
        {
          headerName: "Slug",
          field: "slug",
          sortable: true,
          filter: true,
          width: 100
        },
        {
          headerName: "Description",
          field: "description",
          sortable: true,
          filter: true
        },
        {
          headerName: "Website",
          field: "website",
          sortable: true,
          filter: true
        },
        {
          headerName: "Twitter",
          field: "twitter",
          sortable: true,
          filter: true
        },
        {
          headerName: "Reddit",
          field: "reddit",
          sortable: true,
          filter: true
        },
        {
          headerName: "Message Board",
          field: "message_board",
          sortable: true,
          filter: true
        },
        {
          headerName: "Explorer",
          field: "explorer",
          sortable: true,
          filter: true
        },
        {
          headerName: "Technical Doc",
          field: "technical_doc",
          sortable: true,
          filter: true
        },
        {
          headerName: "Tags",
          field: "tags",
          sortable: true,
          filter: true
        },
        {
          headerName: "Source Code",
          field: "source_code",
          sortable: true,
          filter: true
        },
        {
          headerName: "Date Added",
          field: "date_added",
          sortable: true,
          filter: true
        }
      ],
      rowData: []
    };
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: "900px",
          width: "100%"
        }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
        />
      </div>
    );
  }
}

export default App;
