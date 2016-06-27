import React, {Component, PropTypes} from 'react';
import {Modal} from 'react-bootstrap';
import SelectTag from './SelectTag';

class ModalAdd extends Component {

  static propTypes = {
    onSelect: PropTypes.func,
    onRequestHide: PropTypes.func,
    isShow: PropTypes.bool
  };
  handleClick = () => {
    window.open('http://ya.ru/', '_blank');
  }

  render() {
    const { isShow, onRequestHide } = this.props;

    return (
      <Modal show={isShow} onHide={onRequestHide} lg>
        <Modal.Header closeButton>
          <Modal.Title>Лекция 11: Методы классификации и прогнозирования. Нейронные сети</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>Описание:</b><br />
          <p>Аннотация: В лекции описывается метод нейронных сетей. Рассмотрены элементы и архитектура,
            процесс обучения и явление переобучения нейронной сети. Описана такая модель нейронной сети как персептрон.
            Приведен пример решения задачи при помощи аппарата нейронных сетей.</p>
          <b>URL:</b><br />
          <a url="#">http://www.intuit.ru/studies/courses/6/6/lecture/178</a>
          <br />
          <br />
          <SelectTag />
        </Modal.Body>
        <Modal.Footer>
          <span className="input-group-btn">
              <button className="btn btn-default" onClick={this.handleClick}>
                <i className="fa fa-cog" /> Сохранить
              </button>
            </span>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalAdd;
