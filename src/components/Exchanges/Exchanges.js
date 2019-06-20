import React, { Component } from "react";
import Modal from 'react-modal';
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import ModalWindowLink from '../ModalWindowLink';
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "./Exchanges.css";

class Exchanges extends Component {
  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentDidMount() {
    axios("https://crypto-project-backend.herokuapp.com/api/getExchangesFromDb")
    // axios("http://localhost:5000/api/getExchangesFromDb")
      .then(result => {
        return result.data.exchanges;
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
        // {
        //   headerName: "Id",
        //   field: "id",
        //   sortable: true,
        //   filter: true,
        //   width: 100
        // },
        // {
        //   headerName: "Slug",
        //   field: "slug",
        //   sortable: true,
        //   filter: true,
        //   width: 100
        // },
        {
          headerName: "Name",
          field: "name",
          sortable: true,
          filter: true,
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
          headerName: "Adj.Vol(24h)*",
          field: "volume_24h_adjusted",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Volume(24h)",
          field: "volume_24h",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Volume(7d)",
          field: "volume_7d",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Volume(30d)",
          field: "volume_30d",
          sortable: true,
          filter: true,
        },
        {
          headerName: "No. Markets",
          field: "num_market_pairs",
          sortable: true,
          filter: true
        },
        {
          headerName: "Change(24h)",
          field: "percent_change_volume_24h",
          sortable: true,
          filter: true,
          cellRenderer: params => {
            if (params.data.percent_change_volume_24h !== 0) {
              let span = document.createElement("span");
              span.innerText = `${params.data.percent_change_volume_24h.toFixed(2)}%`;

              return span;
            }
            return 0;
          }
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
          headerName: "Blog",
          field: "blog",
          sortable: true,
          filter: true,
          cellRenderer: params => {
            if (params.data.blog) {
              let link = document.createElement("a");
              link.href = params.data.blog;
              link.innerText = params.data.blog;
              link.target = "_blank";

              return link;
            }
          }
        },
        {
          headerName: "Fee",
          field: "fee",
          sortable: true,
          filter: true,
          cellRenderer: params => {
            if (params.data.fee) {
              let link = document.createElement("a");
              link.href = params.data.fee;
              link.innerText = params.data.fee;
              link.target = "_blank";

              return link;
            }
          }
        },
      ],
      rowData: [],
      modalIsOpenTwitter: false,
      currentExchangesTwitter: '',
    };

    this.openModalTwitter = this.openModalTwitter.bind(this);
    this.closeModalTwitter = this.closeModalTwitter.bind(this);
  }

  openModalTwitter(e) {
    const currentExchangesTwitter = e.target.innerText.replace('https://twitter.com/', '');
    this.setState({
      modalIsOpenTwitter: true,
      currentExchangesTwitter
    });
  }

  closeModalTwitter() {
    this.setState({modalIsOpenTwitter: false});
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
            currentCoin={this.state.currentExchangesTwitter}
          />
        </Modal>
      </div>
    );
  }
}

export default Exchanges;
