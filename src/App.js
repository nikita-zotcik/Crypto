import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-grid.css";

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
              let div = document.createElement("div");
              let icon = document.createElement("img");
              icon.src = params.data.logo;
              icon.classList = "crypto-icon";
              div.appendChild(icon);
              div.classList = "main-div-with-icon";
              let name = document.createElement("span");
              name.innerHTML = params.data.name;

              icon.after(name);
              return div;
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
