import React, {Component, PropTypes} from 'react';
import Select from 'react-select';

class SelectTag extends Component {

  static propTypes = {
    value: PropTypes.number,
  };

  options = [
    { value: 1, label: 'Категория не выбрана' },
    { value: 2, label: 'ИТ' },
    { value: 3, label: 'Генетические алгоритмы' },
    { value: 4, label: 'Нейронные сети' },
    { value: 6, label: 'Реакт js' },
    { value: 7, label: 'Линукс' }
  ]

  render() {
    return (
      <Select
        allowCreate={false}
        clearable={false}
        options={this.options}
        value={1}/>
    );
  }
}

export default SelectTag;
