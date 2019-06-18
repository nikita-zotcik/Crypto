import React, { Component } from "react";
import Modal from 'react-modal';
import "./App.css";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import ModalWindowLink from './ModalWindowLink';

class App extends Component {
  componentWillMount() {
    Modal.setAppElement('body');
  }
  componentDidMount() {
    axios("https://crypto-project-backend.herokuapp.com/api/getCoinsFromDb")
    // axios("http://localhost:5000/api/getCoinsFromDb")
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
          filter: true,
          cellRenderer: params => {
            if (params.data.website) {
              let link = document.createElement("a");
              link.href = params.data.website;
              link.innerText = params.data.website;
              link.target = "_blank";

              return link;
            }
          }
        },
        {
          headerName: "Twitter",
          field: "twitter",
          sortable: true,
          filter: true,
          cellRenderer: params => {
            if (params.data.twitter) {
              let div = document.createElement('div');
              let p = document.createElement('p');
              p.className = 'twitter-text';
              p.innerHTML = params.data.twitter;
              div.appendChild(p);
              div.addEventListener('click', this.openModal, false);

              // let link = document.createElement("a");
              // link.href = params.data.twitter;
              // link.innerText = params.data.twitter;
              // link.target = "_blank";

              return div;
            }
          }
        },
        {
          headerName: "Chat",
          field: "chat",
          sortable: true,
          filter: true,
          cellRenderer: params => {
            if (params.data.chat) {
              let link = document.createElement("a");
              link.href = params.data.chat;
              link.innerText = params.data.chat;
              link.target = "_blank";

              return link;
            }
          }
        },
        {
          headerName: "Reddit",
          field: "reddit",
          sortable: true,
          filter: true,
          cellRenderer: params => {
            if (params.data.reddit) {
              let link = document.createElement("a");
              link.href = params.data.reddit;
              link.innerText = params.data.reddit;
              link.target = "_blank";

              return link;
            }
          }
        },
        {
          headerName: "Message Board",
          field: "message_board",
          sortable: true,
          filter: true,
          cellRenderer: params => {
            if (params.data.message_board) {
              let link = document.createElement("a");
              link.href = params.data.message_board;
              link.innerText = params.data.message_board;
              link.target = "_blank";

              return link;
            }
          }
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
          filter: true,
          cellRenderer: params => {
            if (params.data.technical_doc) {
              let link = document.createElement("a");
              link.href = params.data.technical_doc;
              link.innerText = params.data.technical_doc;
              link.target = "_blank";

              return link;
            }
          }
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
          filter: true,
          cellRenderer: params => {
            if (params.data.source_code) {
              let link = document.createElement("a");
              link.href = params.data.source_code;
              link.innerText = params.data.source_code;
              link.target = "_blank";

              return link;
            }
          }
        },
        // {
        //   headerName: "Date Added",
        //   field: "date_added",
        //   sortable: true,
        //   filter: true
        // },
        {
          headerName: "Circulating supply",
          field: "circulating_supply",
          sortable: true,
          filter: true
        },
        {
          headerName: "Total supply",
          field: "total_supply",
          sortable: true,
          filter: true
        },
        {
          headerName: "Max supply",
          field: "max_supply",
          sortable: true,
          filter: true
        },
      ],
      rowData: [],
      modalIsOpen: false,
      currentCoin: ''
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(e) {
    const currentCoin = e.target.innerText.replace('https://twitter.com/', '');
    this.setState({
      modalIsOpen: true,
      currentCoin
    });
  }

  closeModal() {
    this.setState({modalIsOpen: false});
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
        <Modal
          className="twitter-modal"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >
            <ModalWindowLink
              currentCoin={this.state.currentCoin}
            />
        </Modal>
      </div>
    );
  }
}

export default App;
