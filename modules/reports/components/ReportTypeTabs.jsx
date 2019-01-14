/**
 * Description of ReportTypeTabs.
 *
 *
 * @author: Ilya Petrushenko <ilya.petrushenko@yandex.ru>
 * @since: 10.07.18 20:25
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'

const { TabPane } = Tabs

function ReportTypeTabs({ list, activeKey, onChange }) {
  const items = list.map(item => (<TabPane tab={item.title} key={item.key}>{item.report}</TabPane>))
  function changeHandle(activeKeyId) {
    if (onChange) {
      onChange(activeKeyId)
    }
  }
  return (
    <Tabs tabPosition="left" onChange={changeHandle} activeKey={activeKey}>
      {items}
    </Tabs>
  )
}

ReportTypeTabs.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    report: PropTypes.element.isRequired,
  })).isRequired,
  activeKey: PropTypes.string.isRequired,
  onChange: PropTypes.func,
}

export default ReportTypeTabs
