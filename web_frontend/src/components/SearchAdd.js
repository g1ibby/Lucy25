import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {logout} from 'redux/modules/auth';
import ModalAdd from './ModalAdd';


@connect(
  null,
  {logout}
)
export default class Header extends Component {
  static propTypes = {
    logout: PropTypes.func
  };
  state = {
    isModal: false
  }
  openDialog = () => {
    this.setState({
      isModal: true
    });
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log('do validate');
      this.openDialog();
    }
    event.preventDefault();
  }

  render() {
    return (
      <form className="navbar-form open">
         <div className="form-group has-feedback">
           {
             this.state.isModal &&
             <ModalAdd
               isShow={this.state.isModal}
               onRequestHide={() => this.setState({isModal: false})} />
           }
            <input type="text" placeholder="Введите URL статьи или запрос для поиска"
              className="form-control"
              onKeyPress={this.handleKeyPress} />
            <div className="fa fa-times form-control-feedback"></div>
         </div>
      </form>
    );
  }
}
