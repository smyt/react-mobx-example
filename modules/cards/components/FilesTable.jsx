/**
 * Description of FilesTable.
 *
 *
 * @author: Ilya Petrushenko <ilya.petrushenko@yandex.ru>
 * @since: 23.05.18 14:40
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Button, Table, Tooltip } from 'antd'
import { yesNoRenderer } from '../../../utils/columnRenderers'

@observer
class FilesTable extends Component {
  componentDidMount() {
    this.loadFiles()
  }

  componentDidUpdate(prevProps) {
    const me = this
    if (me.props.card !== prevProps.card) {
      this.loadFiles()
    }
  }

  getColumns() {
    const me = this

    return [
      {
        title: 'Ид',
        dataIndex: 'id',
        align: 'center',
      },
      {
        title: 'Название файла',
        dataIndex: 'filename',
        render: (text, record) => <a role="button" onClick={e => me.showFileOperations(e, record)}>{text}</a>,
      }, {
        title: 'Тип файла',
        dataIndex: 'mimeType',
        align: 'center',
      }, {
        title: 'Размер, Кб',
        dataIndex: 'size',
        align: 'center',
      }, {
        title: 'Дата загрузки',
        dataIndex: 'createdAt',
        align: 'center',
      }, {
        title: 'Сохранен?',
        dataIndex: 'isSaved',
        align: 'center',
        render: yesNoRenderer({ recordField: 'isSaved' }),
      }, {
        title: 'Кол-во операций',
        dataIndex: 'operationsCount',
        align: 'center',
      }]
  }

  getToolbar() {
    const me = this
    return (
      <div style={{ marginBottom: 5 }}>
        <Tooltip title="Удалить" overlay="">
          <Button
            style={{ marginRight: 5 }}
            type="danger"
            icon="delete"
            onClick={me.removeFiles}
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

  onSelect = (selectedRowKeys, selectedRows) => {
    const me = this
    me.props.cardFiles.select(selectedRows)
    me.forceUpdate()
  }

  removeFiles = () => {
    const me = this
    const { cardFiles } = me.props
    const item = cardFiles.firstSelectItem
    if (item) {
      cardFiles.remove(item)
    }
  }

  refresh = () => {
    this.loadFiles()
  }

  showFileOperations = (e, record) => {
    const me = this
    e.preventDefault()
    if (me.props.onShowOperations) {
      me.props.onShowOperations(record)
    }
  }

  loadFiles(reload = true) {
    const me = this
    const { card, cardFiles } = me.props
    cardFiles.setParam('id', card)
    cardFiles.load(reload)
  }

  render() {
    const me = this

    const { cardFiles } = me.props
    const selectedRowKeys = cardFiles.getSelection(true)

    const rowSelection = {
      selectedRowKeys,
      type: 'radio',
      columnWidth: 20,
      onChange: me.onSelect,
    }

    return (
      <div>
        {me.getToolbar()}
        <Table
          rowKey="id"
          bordered={true}
          columns={me.getColumns()}
          dataSource={cardFiles.data.toJS()}
          loading={cardFiles.isLoading}
          rowSelection={rowSelection}
        />
      </div>
    )
  }
}

FilesTable.propTypes = {
  cardFiles: PropTypes.object.isRequired,
  card: PropTypes.number.isRequired,
  onShowOperations: PropTypes.func,
}

export default FilesTable
