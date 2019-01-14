/**
 * Description of PatternsTable.
 *
 *
 * @author: Ilya Petrushenko <ilya.petrushenko@yandex.ru>
 * @since: 23.05.18 14:40
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { clone } from 'mobx-state-tree'
import { Button, Table, Tooltip } from 'antd'
import BaseModalWindow from '../../core/components/BaseModalWindow'
import PatternForm from './PatternForm'

@observer
class PatternsTable extends Component {
  constructor(props) {
    super(props)
    const me = this
    me.state = {
      isModalVisible: false,
      modalTitle: '',
      record: null,
    }
  }

  getColumns() {
    const me = this

    return [
      {
        title: 'Ид',
        dataIndex: 'id',
        align: 'center',
        width: 80,
      },
      {
        title: 'Название',
        dataIndex: 'name',
        width: 200,
      }, {
        title: 'Шаблон поиска',
        dataIndex: 'search',
      }, {
        title: 'Действия',
        dataIndex: 'actions',
        width: 100,
        align: 'center',
        render: (text, record) => {
          return (
            <div>
              <Button
                style={{ marginRight: 5 }}
                size="small"
                type="normal"
                icon="edit"
                onClick={() => me.showAddWindow(record)}
              />
              <Button
                size="small"
                type="danger"
                icon="delete"
                onClick={() => me.removePattern(record)}
              />
            </div>
          )
        },
      }]
  }

  getToolbar() {
    const me = this
    return (
      <div style={{ marginBottom: 5 }}>
        <Tooltip title="Добавить шаблон" overlay="">
          <Button
            style={{ marginRight: 5 }}
            type="normal"
            icon="file-add"
            onClick={() => me.showAddWindow()}
          />
        </Tooltip>
        <Tooltip title="Обновить" overlay="">
          <Button
            style={{ float: 'right' }}
            type="normal"
            icon="reload"
            onClick={me.refresh}
          />
        </Tooltip>
      </div>
    )
  }

  showAddWindow = (record) => {
    const me = this
    if (!record) {
      me.setState({
        isModalVisible: true,
        modalTitle: 'Добавление шаблона',
      })
    } else {
      me.setState({
        isModalVisible: true,
        modalTitle: 'Редактирование шаблона',
        record: clone(record),
      })
    }
  }

  savePattern = (values) => {
    const me = this
    const { patterns, categories } = me.props
    const category = categories.firstSelectItem

    if (category) {
      values.category = category.id

      if (me.state.record) {
        const item = patterns.firstSelectItem
        patterns.update(item, values).then(() => {
          me.closeModal()
        })
      } else {
        patterns.create(values).then(() => {
          me.closeModal()
        })
      }
    }
  }

  removePattern = (record) => {
    this.props.patterns.remove(record)
  }

  refresh = () => {
    this.props.patterns.load()
  }

  closeModal = () => {
    this.setState({
      isModalVisible: false,
      modalTitle: '',
      record: null,
    })
  }

  render() {
    const me = this

    const { patterns } = me.props

    return (
      <div>
        {me.getToolbar()}

        <Table
          rowKey="id"
          bordered={true}
          columns={me.getColumns()}
          dataSource={patterns.data.toJS()}
          loading={patterns.isLoading}
        />

        <BaseModalWindow
          title={me.state.modalTitle}
          isVisible={me.state.isModalVisible}
          onCancel={me.closeModal}
          onSave={me.savePattern}
        >
          {me.state.isModalVisible
          && <PatternForm record={me.state.record} />
          }
        </BaseModalWindow>

      </div>
    )
  }
}

PatternsTable.propTypes = {
  patterns: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
}

export default PatternsTable
