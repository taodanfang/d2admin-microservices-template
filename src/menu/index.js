import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

export const menuHeader = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '页面',
    icon: 'folder-o',
    children: [
      { path: '/page13', title: '页面 13' },
    ]
  }
])

export const menuAside = supplementPath([
  // { path: '/index', title: '首页', icon: 'home' },

  {
    title: '示例页面',
    icon: 'folder-o',
    children: [


      // 微服务 demo
      // ------------------------------------------
      { path: '/page13', title: '页面 13' },
      // ------------------------------------------

    ]
  }
])
