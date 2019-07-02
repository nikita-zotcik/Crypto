import React, {Component} from 'react';
import RingLoader from 'react-spinners/RingLoader';

export default class Loader extends Component {
  render() {
    return(<RingLoader sizeUnit={"px"} size={100} color={'black'} loading={true} />)
  }
}