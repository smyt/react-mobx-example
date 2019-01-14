/**
 * Description of QuickPeriodSwitcher.
 *
 *
 * @author: Ilya Petrushenko <ilya.petrushenko@yandex.ru>
 * @since: 09.07.18 9:08
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Tooltip } from 'antd'

export const MONTH = 'month'
export const YEAR = 'year'

function QuickPeriodSwitcher({
  onNext, onPrev, onCurrent, type,
}) {
  const tooltips = {
    month: {
      next: 'Следующий месяц',
      prev: 'Предыдущий месяц',
      current: 'Текущий месяц',
    },
    year: {
      next: 'Следующий год',
      prev: 'Предыдущий год',
      current: 'Текущий год',
    },
  }

  const messages = tooltips[type]

  return (
    <div style={{ display: 'inline-block' }}>
      <Tooltip title={messages.prev} overlay="">
        <Button
          style={{ marginRight: 5, marginLeft: 5 }}
          type="normal"
          icon="left-circle-o"
          onClick={onPrev}
        />
      </Tooltip>

      <Tooltip title={messages.current} overlay="">
        <Button
          style={{ marginRight: 5 }}
          type="normal"
          icon="calendar"
          onClick={onCurrent}
        />
      </Tooltip>

      <Tooltip title={messages.next} overlay="">
        <Button
          type="normal"
          icon="right-circle-o"
          onClick={onNext}
        />
      </Tooltip>
    </div>
  )
}

QuickPeriodSwitcher.defaultProps = {
  onNext: () => {
  },
  onPrev: () => {
  },
  onCurrent: () => {
  },
  type: MONTH,
}

QuickPeriodSwitcher.propTypes = {
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onCurrent: PropTypes.func,
  type: PropTypes.string,
}

export default QuickPeriodSwitcher
