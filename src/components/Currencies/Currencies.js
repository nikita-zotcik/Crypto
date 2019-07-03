import React, { Component } from "react";
import Modal from 'react-modal';
import "./Currencies.css";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import ModalWindowLink from '../Modals/ModalWindowLink';
import ModalReddit from '../Modals/ModalReddit';
import ModalHolders from '../Modals/ModalHolders';
import { shortValue } from '../ShortValue';
import ModalTelegram from '../ModalTelegram';
import Loader from '../Loader/Loader';

class Currencies extends Component {
  componentWillMount() {
    Modal.setAppElement('body');
  }

  // modalTelegram=()=> {
  //   let div = document.createElement('div');
  //
  //   return (<div className='modal-window-tg'>fff</div>)
  // };

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
          headerName: "Description",
          field: "description",
          sortable: true,
          filter: true
        },
        {
          headerName: "Market Cap",
          field: "market_cap",
          sortable: true,
          filter: true,
          width: 150,
          cellRenderer: params => shortValue(params.data.market_cap)
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

              let div = document.createElement('div');

              let p = document.createElement('p');
              // link.href = params.data.chat;
              // link.innerText = params.data.chat;
              // link.target = "_blank";
              p.className = 'text-link-with-modal';
              p.innerHTML = params.data.chat;

              div.appendChild(p);
              div.addEventListener('click', this.openModalTelegram, false);
              return div;
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
          filter: true,
          cellRenderer: params => {
            if (params.data.explorer) {
              let div = document.createElement('div');
              let p = document.createElement('p');
              p.className = 'text-link-with-modal';
              p.innerHTML = params.data.explorer;
              div.appendChild(p);
              let flag = false;
              params.data.explorer.forEach(item => {
                const temp = item.split('/');
                if(temp[2] === 'etherscan.io') flag = true;
              });
              if(flag) div.addEventListener('click', this.openModalHolders, false);

              return div;
            }
          }
        },
        {
          headerName: "Holders",
          field: "holdersCount",
          sortable: true,
          filter: true,
          cellRenderer: params => {
            let span = document.createElement("span");
            span.innerText = 'holdersCount' in params.data ? params.data.holdersCount : '';
            return span;
          }
        },
        {
          headerName: "Transfers",
          field: "transfersCount",
          sortable: true,
          filter: true,
          cellRenderer: params => {
            let span = document.createElement("span");
            span.innerText = 'transfersCount' in params.data ? params.data.holdersCount : '';
            return span;
          }
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
          cellRenderer: params => shortValue(params.data.circulating_supply)
        },
        {
          headerName: "Total supply",
          field: "total_supply",
          sortable: true,
          filter: true,
          width: 150,
          cellRenderer: params => shortValue(params.data.total_supply)
        },
        {
          headerName: "Max supply",
          field: "max_supply",
          sortable: true,
          filter: true,
          width: 150,
          cellRenderer: params => shortValue(params.data.max_supply)
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
                if(exchange) {
                  let icon = document.createElement("img");
                  icon.src = exchange.logo;
                  icon.classList = "exchange-icon";
                  let link = document.createElement('a');
                  link.href = exchange.website;
                  link.target = '_blank';
                  link.className = 'exchanges-link';
                  link.appendChild(icon);
                  div.appendChild(link);
                }
              });
              div.classList = "main-div-with-icon";
              return div;
            }
          }
        },
      ],
      rowData: [],
      modalIsOpenTwitter: false,
      modalIsOpenTelegram: false,
      modalIsOpenReddit: false,
      modalIsOpenHolders: false,
      holdersToken: '',
      currentCoinTwitter: '',
      currentCoinReddit: '',
      currentCoinTelegram: '',
      frameworkComponents: {
        customNoRowsOverlay: Loader
      },
      noRowsOverlayComponent: "customNoRowsOverlay",
    };

    this.openModalTwitter = this.openModalTwitter.bind(this);
    this.openModalHolders = this.openModalHolders.bind(this);
    this.openModalTelegram = this.openModalTelegram.bind(this);
    this.openModalReddit = this.openModalReddit.bind(this);
    this.closeModalTwitter = this.closeModalTwitter.bind(this);
    this.closeModalReddit = this.closeModalReddit.bind(this);
    this.closeModalHolders = this.closeModalHolders.bind(this);
  }

  openModalTwitter(e) {
    const currentCoinTwitter = e.target.innerText.replace('https://twitter.com/', '');
    this.setState({
      modalIsOpenTwitter: true,
      currentCoinTwitter
    });
  }

  openModalTelegram(e) {
    const currentCoinTelegram = e.target;
    this.setState({
      modalIsOpenTelegram: true,
      currentCoinTelegram
    });
  }

  closeModalTwitter() {
    this.setState({modalIsOpenTwitter: false});
  }

  closeModalTelegram = ()=> {
    this.setState({modalIsOpenTelegram: false});
  };

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

  openModalHolders(e) {
    let holdersToken = '';
    e.target.innerText.split(',').forEach(item => {
      const temp = item.split('/');
      if(temp[2] === 'etherscan.io') holdersToken = temp[4];
    });
    this.setState({
      modalIsOpenHolders: true,
      holdersToken
    });
  }

  closeModalHolders() {
    this.setState({modalIsOpenHolders: false});
  }

  render() {
    const {
      columnDefs,
      rowData,
      frameworkComponents,
      noRowsOverlayComponent,
      modalIsOpenTwitter,
      currentCoinTwitter,
      modalIsOpenTelegram,
      currentCoinTelegram,
      modalIsOpenReddit,
      currentCoinReddit,
      modalIsOpenHolders,
      holdersToken
    } = this.state;

    return (
      <div className="ag-theme-balham">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={true}
          frameworkComponents={frameworkComponents}
          noRowsOverlayComponent={noRowsOverlayComponent}
        />
        <Modal
          className="modal-window"
          isOpen={modalIsOpenTwitter}
          onRequestClose={this.closeModalTwitter}
          contentLabel="Example Modal"
        >
          <ModalWindowLink
            currentCoin={currentCoinTwitter}
          />
        </Modal>
        <Modal
          className="modal-window"
          isOpen={modalIsOpenTelegram}
          onRequestClose={this.closeModalTelegram}
          contentLabel="Telegram Modal"
        >
          <ModalTelegram
            currentCoin={currentCoinTelegram}
          />
        </Modal>
        <Modal
          className="modal-window"
          isOpen={modalIsOpenReddit}
          onRequestClose={this.closeModalReddit}
          contentLabel="Example Modal"
        >
          <ModalReddit
            currentCoin={currentCoinReddit}
          />
        </Modal>
        <Modal
          className="modal-window holders"
          isOpen={modalIsOpenHolders}
          onRequestClose={this.closeModalHolders}
          contentLabel="Example Modal"
        >
          <ModalHolders
            token={holdersToken}
          />
        </Modal>
      </div>
    );
  }
}

export default Currencies;
