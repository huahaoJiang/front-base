// import { RouteRecordRaw } from 'vue-router'
import { renderMenuIcon } from '@utils/icon'
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

export const DetailMenu = {
  label: '赛道详情',
  key: '赛道详情',
  path: '/track',
  icon: null,
  index: -1,
  children: [
    {
      label: '概览',
      key: '概览',
      path: '/track/overview',
      icon: renderMenuIcon('overview'),
      index: -1
    },
    {
      label: '概览',
      key: '概览',
      path: '/track/static-overview',
      icon: renderMenuIcon('overview'),
      index: -1
    },
    {
      label: '简述',
      key: '简述',
      path: '/track/sketch',
      icon: renderMenuIcon('Sketch'),
      index: 0
    },
    {
      label: '市场分析',
      key: '市场分析',
      path: '/track/market',
      icon: renderMenuIcon('Market'),
      index: 1
    },
    {
      label: '政策分析',
      key: '政策分析',
      path: '/track/policy',
      icon: renderMenuIcon('Policy'),
      index: 2
    },
    {
      label: '支付方分析',
      key: '支付方分析',
      path: '/track/analyze',
      icon: renderMenuIcon('Analyze'),
      index: 3
    },
    {
      label: '二级市场分析',
      key: '二级市场分析',
      path: '/track/secondaryMarket',
      icon: renderMenuIcon('secondaryMarketAnalysis'),
      index: 3
    },
    {
      label: '相关资讯',
      key: '相关资讯',
      path: '/track/information',
      icon: renderMenuIcon('Policy'),
      index: 3
    },
    {
      label: '图谱',
      key: '图谱',
      path: '/track/allTrack',
      icon: renderMenuIcon('Track'),
      index: 4
    },
    {
      label: '临床试验',
      key: '临床试验',
      path: '/track/clinical-trials',
      icon: renderMenuIcon('clinicalTrials'),
      index: 5
    },
    {
      label: '论文',
      key: '论文',
      path: '/track/thesis',
      icon: renderMenuIcon('thesis'),
      index: 6
    },
    {
      label: '产品',
      key: '产品',
      path: '/track/product',
      icon: renderMenuIcon('product'),
      index: 8
    },
    {
      label: '投资事件',
      key: '投资事件',
      path: '/track/allEvents',
      icon: renderMenuIcon('AllEvents'),
      index: 9
    },
    {
      label: '企业',
      key: '企业',
      path: '/track/company',
      icon: renderMenuIcon('AllCompany'),
      index: 9,
      children: [
        {
          label: '全部企业',
          key: '全部企业',
          path: '/track/allCompany',
          icon: null,
          index: 90
        },
        {
          label: '上市企业',
          key: '上市企业',
          path: '/track/ipoCompany',
          icon: null,
          index: 91
        },
        {
          label: '独角兽',
          key: '独角兽',
          path: '/track/unicornCompany',
          icon: null,
          index: 92
        },
        {
          label: '极速融资',
          key: '极速融资',
          path: '/track/fastCompany',
          icon: null,
          index: 93
        },
        {
          label: '中国企业',
          key: '中国企业',
          path: '/track/CNCompany',
          icon: null,
          index: 94
        },
        {
          label: '美国企业',
          key: '美国企业',
          path: '/track/USACompany',
          icon: null,
          index: 95
        },
        {
          label: '欧洲企业',
          key: '欧洲企业',
          path: '/track/EUCompany',
          icon: null,
          index: 96
        }
      ]
    },
    {
      label: '投资机构',
      key: '投资机构',
      path: '/track/organization',
      icon: renderMenuIcon('AllOrg'),
      index: 8
    },
    {
      label: '主要投资方',
      key: '主要投资方',
      path: '/track/trackInvest',
      icon: renderMenuIcon('TrackInvest'),
      index: 10
    },
    {
      label: '科研参与方',
      key: '科研参与方',
      path: '/track/scientific-research-institution',
      icon: renderMenuIcon('scientificResearchInstitution'),
      index: 11
    },
    {
      label: '科研专家',
      key: '科研专家',
      path: '/track/specialist',
      icon: renderMenuIcon('specialist'),
      index: 12
    }
  ]
}
