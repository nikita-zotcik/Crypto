import React, { Component } from "react";
import Modal from 'react-modal';
import "./Currencies.css";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import ModalWindowLink from '../ModalWindowLink';
import ModalReddit from '../ModalReddit';

class Currencies extends Component {
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
          headerName: "Exchanges number",
          field: "num_market_pairs",
          sortable: true,
          filter: true,
          width: 150
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
              p.className = 'text-link-with-modal';
              p.innerHTML = params.data.twitter;
              div.appendChild(p);
              div.addEventListener('click', this.openModalTwitter, false);

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
              let div = document.createElement('div');
              let p = document.createElement('p');
              p.className = 'text-link-with-modal';
              p.innerHTML = params.data.reddit;
              div.appendChild(p);
              div.addEventListener('click', this.openModalReddit, false);

              return div;
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
          filter: true,
          width: 100
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
        {
          headerName: "Circulating supply",
          field: "circulating_supply",
          sortable: true,
          filter: true,
          width: 150,
          cellRenderer: params => {
            let circulating = params.data.circulating_supply;
            if (circulating) {
              circulating = (circulating / 1000000000);
              let span = document.createElement("span");
              span.innerText = circulating < 1 ? (circulating * 100).toFixed(2) + 'm' : Math.ceil(circulating) + 'b';

              return span;
            }
            return 0;
          }
        },
        {
          headerName: "Total supply",
          field: "total_supply",
          sortable: true,
          filter: true,
          width: 150,
          cellRenderer: params => {
            let total = params.data.total_supply;
            if (total) {
              total = (total / 1000000000);
              let span = document.createElement("span");
              span.innerText = total < 1 ? (total * 100).toFixed(2) + 'm' : Math.ceil(total) + 'b';

              return span;
            }
            return 0;
          }
        },
        {
          headerName: "Max supply",
          field: "max_supply",
          sortable: true,
          filter: true,
          width: 150,
          cellRenderer: params => {
            let max = params.data.max_supply;
            if (max) {
              max = (max / 1000000000);
              let span = document.createElement("span");
              span.innerText = max < 1 ? (max * 100).toFixed(2) + 'm' : Math.ceil(max) + 'b';

              return span;
            }
            return 0;
          }
        },
        {
          headerName: "Exchanges",
          field: "exchanges_top",
          sortable: true,
          filter: true,
          height: 40,
          cellRenderer: params => {
            if(params.data.exchanges_top) {
              let div = document.createElement("div");
              params.data.exchanges_top.forEach(exchange => {
                let icon = document.createElement("img");
                icon.src = exchange.logo;
                icon.classList = "exchange-icon";
                let link = document.createElement('a');
                link.href = exchange.website;
                link.target = '_blank';
                link.className = 'exchanges-link';
                link.appendChild(icon);
                div.appendChild(link);
              });
              div.classList = "main-div-with-icon";
              return div;
            }
          }
        },
      ],
      rowData: [],
      modalIsOpenTwitter: false,
      modalIsOpenReddit: false,
      currentCoinTwitter: '',
      currentCoinReddit: ''
    };

    this.openModalTwitter = this.openModalTwitter.bind(this);
    this.openModalReddit = this.openModalReddit.bind(this);
    this.closeModalTwitter = this.closeModalTwitter.bind(this);
    this.closeModalReddit = this.closeModalReddit.bind(this);
  }

  openModalTwitter(e) {
    const currentCoinTwitter = e.target.innerText.replace('https://twitter.com/', '');
    this.setState({
      modalIsOpenTwitter: true,
      currentCoinTwitter
    });
  }

  closeModalTwitter() {
    this.setState({modalIsOpenTwitter: false});
  }

  openModalReddit(e) {
    const currentCoinReddit = e.target.innerText.replace('https://reddit.com/r/', '');
    this.setState({
      modalIsOpenReddit: true,
      currentCoinReddit
    });
  }

  closeModalReddit() {
    this.setState({modalIsOpenReddit: false});
  }

  render() {
    return (
      <div className="ag-theme-balham">
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
        />
        <Modal
          className="modal-window"
          isOpen={this.state.modalIsOpenTwitter}
          onRequestClose={this.closeModalTwitter}
          contentLabel="Example Modal"
        >
          <ModalWindowLink
            currentCoin={this.state.currentCoinTwitter}
          />
        </Modal>
        <Modal
          className="modal-window"
          isOpen={this.state.modalIsOpenReddit}
          onRequestClose={this.closeModalReddit}
          contentLabel="Example Modal"
        >
          <ModalReddit
            currentCoin={this.state.currentCoinReddit}
          />
        </Modal>
      </div>
    );
  }
}

export default Currencies;
