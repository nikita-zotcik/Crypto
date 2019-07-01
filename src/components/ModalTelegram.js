import React, {Component, Fragment} from "react";
import axios from "axios";
import tg from "../assets/img/tg_logo.png"

class ModalTelegram extends Component {
    state = {
        messages: [],
        link: null,
        error: null,
    };

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView();
    };

    componentDidUpdate() {
        this.scrollToBottom();
    };

    axiosRequest = (link) => {
        console.debug(link);

        axios(`http://localhost:5000/api/getTelegram?link=${link}`)
            .then(result => {
                if (result.data === "CODE#400 CHANNEL_INVALID") {
                    this.setState({
                        error: "Sorry, this chat is unavailable now"
                    })
                } else {
                    this.setState({
                        messages: result.data
                    })
                }
            })
            .catch(err => {
                console.debug(err.message);
                this.setState({
                    error: "Sorry, this chat is unavailable now"
                })
            });
    };

    stateLink = (link) => {
        this.setState({
            link: link,
        }, () => {
            this.axiosRequest(link)
        })
    };

    componentDidMount() {
        let inputLink = this.props.currentCoin.innerHTML;
        let shortTgLink = inputLink.match(/t.me/i);
        let tgLink = inputLink.match(/telegram.me/i);
        if (shortTgLink) {
            let finLink = shortTgLink.input.split("t.me/")[1];
            this.stateLink(finLink)
        }
        if (tgLink) {
            let finLink = tgLink.input.split("telegram.me/")[1];
            this.stateLink(finLink)
        }
        this.scrollToBottom();
    }


    render() {
        const {messages, link, error} = this.state;
        return <div className="modal-window-tg">
            <div className='modal-channel-name'>
                <img src={tg} className='tg-logo' alt='telegram-logo'/>
                {link} </div>
            {messages && messages.map((i) => {
                    return (i.item.message && <Fragment>
                        <div className='modal-message-row'>
                            <div className='modal-message-circle'/>
                            <div className='modal-message-item'>

                                <div className='modal-message-author'>
                                    <b> {
                                        i.user.username ?
                                            i.user.username :
                                            (i.user.first_name ?
                                                (i.user.last_name ?
                                                    `${i.user.first_name} ${i.user.last_name}`
                                                    : i.user.first_name)
                                                : null)
                                    }</b>
                                </div>
                                <div className='modal-message'> {i.item.message}</div>

                            </div>
                        </div>
                    </Fragment>)

                }
            )}
            {error && <div>{link} : <br/>{error}</div>}
            <div ref={(el) => {
                this.messagesEnd = el;
            }}/>
        </div>
    }
}

export default ModalTelegram;
