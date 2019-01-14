import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu as AntMenu, Icon } from 'antd'
import { inject, observer } from 'mobx-react'

const { SubMenu, Item: AntMenuItem } = AntMenu

@inject('appStore')
@observer
class Menu extends Component {
  componentDidMount() {
    const me = this
    const { menu } = me.props.appStore
    menu.initLocation()
  }

  getMenuItems() {
    const me = this

    const { menu } = me.props.appStore
    const style = { float: 'right' }

    return menu.items.map((item) => {
      let content = ''
      const itemStyle = item.right ? style : {}
      const { key } = item

      if (item.submenu.length > 0) {
        const items = item.submenu.map(subItem => (
          <AntMenuItem key={subItem.key}>
            <NavLink
              activeClassName="active"
              to={`${subItem.route}`}
              onClick={() => me.onClickMenuItem(subItem.key)}
            >
              {subItem.title}
            </NavLink>
          </AntMenuItem>
        ))

        content = <SubMenu
          activeClassName="active"
          key={item.key}
          title={<span><Icon type="setting" />{item.title}</span>}
        >
          {items}
        </SubMenu>
      } else {
        const logoutButton = (
          <AntMenuItem key={item.key} style={itemStyle}>
            <span onClick={me.onLogout}>Выход</span>
          </AntMenuItem>
        )

        const simpleButton = (
          <AntMenuItem key={item.key} style={itemStyle}>
            <NavLink
              activeClassName="active"
              to={`${item.route}`}
              onClick={() => me.onClickMenuItem(key)}
            >
              {item.title}
            </NavLink>
          </AntMenuItem>
        )

        content = item.isLogoutBtn ? logoutButton : simpleButton
      }

      return content
    })
  }

  onLogout = (e) => {
    e.preventDefault()
    const { appStore } = this.props
    appStore.auth.logout()
  }

  onClickMenuItem = (key) => {
    this.props.appStore.menu.changeLocation(key)
  }

  render() {
    const me = this
    const { menu } = me.props.appStore
    return (
      <div>
        <AntMenu
          theme="dark"
          mode="horizontal"
          selectedKeys={[menu.activeMenuKey]}
          style={{ lineHeight: '44px' }}
        >
          {me.getMenuItems()}
        </AntMenu>
      </div>
    )
  }
}

export default Menu
