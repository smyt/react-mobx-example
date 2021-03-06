/**
 * Description of UserCategoriesTags.
 *
 *
 * @author: Ilya Petrushenko <ilya.petrushenko@yandex.ru>
 * @since: 04.07.18 18:55
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd'

const { CheckableTag } = Tag

class UserCategoriesTags extends Component {
  handleChange = (item, checked) => {
    const me = this
    if (me.props.onCheck) {
      me.props.onCheck(item, checked)
    }
  }

  render() {
    const me = this
    const {
      title, categories, selection, exclude,
    } = me.props

    const tags = categories.map((item) => {
      const checked = selection.indexOf(item.id) === -1 && exclude
      return (
        <CheckableTag
          style={{ marginTop: 2 }}
          key={item.id}
          checked={checked}
          onChange={isChecked => me.handleChange(item, isChecked)}
        >
          {item.name}
        </CheckableTag>
      )
    })

    return (
      <div>
        <h4>{title}</h4>
        {tags}
      </div>
    )
  }
}

UserCategoriesTags.defaultProps = {
  title: 'Список категорий пользователя',
  exclude: true,
}

UserCategoriesTags.propTypes = {
  title: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  selection: PropTypes.array.isRequired,
  exclude: PropTypes.bool.isRequired,
  onCheck: PropTypes.func,
}

export default UserCategoriesTags
