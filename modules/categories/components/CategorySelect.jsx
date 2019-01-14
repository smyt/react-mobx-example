/**
 * Description of CategorySelect.
 *
 *
 * @author: Ilya Petrushenko <ilya.petrushenko@yandex.ru>
 * @since: 11.05.18 17:13
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Form, Select } from 'antd'
import Rules from '../../../utils/fieldRules'

const FormItem = Form.Item
const { Option } = Select.Option
const { requiredRule } = Rules

class CategorySelect extends React.Component {
  renderToForm() {
    let initialValue = 0
    const me = this
    const {
      name,
      label,
      layout,
      form,
      style = {},
      selectOptions,
      categories,
      required,
    } = me.props

    if (categories.length > 0) {
      initialValue = categories[0].id
    }

    const rules = required ? [requiredRule] : []

    return (
      <FormItem
        style={style}
        {...layout}
        label={label}
      >
        {form.getFieldDecorator(name, {
          initialValue,
          rules,
        })(
          <Select {...selectOptions}>
            {me.renderItems()}
          </Select>,
        )}
      </FormItem>
    )
  }

  renderSelect() {
    const me = this
    const { type, onSelect } = this.props
    return (
      <Select defaultValue={type} onSelect={value => onSelect(value)}>
        {me.renderItems()}
      </Select>
    )
  }

  renderItems() {
    const me = this
    return me.props.categories.map(item => <Option key={`cat-${item.id}`} value={item.id}>{item.name}</Option>)
  }

  render() {
    const me = this
    return (me.props.form ? me.renderToForm() : me.renderSelect())
  }
}


CategorySelect.defaultProps = {
  name: 'category',
  label: 'Категория',
  form: null,
  layout: {},
  style: {},
  initValue: 0,
  selectOptions: {},
  required: true,
  onSelect: () => {
  },
}

CategorySelect.propTypes = {
  categories: PropTypes.array.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  form: PropTypes.object,
  layout: PropTypes.object,
  style: PropTypes.object,
  initValue: PropTypes.number,
  selectOptions: PropTypes.object,
  required: PropTypes.bool,
  onSelect: PropTypes.func,
}

export default CategorySelect
