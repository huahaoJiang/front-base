// import { RouteRecordRaw } from 'vue-router'
// import { renderMenuIcon } from '@utils/icon'
import type { RouteLocationNormalized } from 'vue-router'

export interface IRoute {
  name: string
  path: string
  component: any
  isHidden?: boolean
  meta?: IMeta
  redirect?: string
  children?: IRoute[]
  beforeEnter?: (to: RouteLocationNormalized, from: RouteLocationNormalized) => void
}
// export type IRouter = IRoute | RouteRecordRaw
export interface IMeta {
  title: string
  icon?: string
  role?: string[]
  index?: number
  keepAlive?: boolean
  highlight?: string
  isTop?: boolean
}
export interface IMenuItem {
  label: string
  key: string
  code?: string
  path: string
  icon: any
  index: number
  isShow?: boolean
  children?: IMenuItem[]
}
