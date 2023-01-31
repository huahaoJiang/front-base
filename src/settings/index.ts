export { default as themeSettings } from './theme.json'
import type { GlobalThemeOverrides } from 'naive-ui'
export const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#489DBA',
    primaryColorHover: '#489DBA',
    primaryColorPressed: '#2B4C59FF',
    primaryColorSuppl: '#316C7263'
  },
  Menu: {
    itemTextColor: 'rgba(236,245,254,0.7)',
    itemTextColorChildActiveHorizontal: '#FFF',
    itemTextColorChildActiveHoverHorizontal: '#FFF',
    itemTextColorActiveHorizontal: '#FFF',
    itemTextColorHoverHorizontal: '#FFF',
    itemTextColorActiveHoverHorizontal: '#FFF'
  },
  Card: {
    paddingMedium: '16px',
    boxShadow: '0px 6px 30px 5px rgba(0, 0, 0, 0.05)',
    borderRadius: '4px',
    titleFontSizeSmall: '14px'
  },
  DataTable: {
    tdPaddingMedium: '16px 6px',
    thPaddingMedium: '12px 6px',
    thPaddingSmall: '12px 8px',
    tdPaddingSmall: '8px',
    tdTextColor: '#666',
    thTextColor: '#333',
    tdColorHover: '#FBFBFB'
  },
  Button: {
    paddingSmall: '2px 8px',
    paddingMedium: '4px 8px',
    heightMedium: '28px',
    heightLarge: '36px'
  },
  Tag: {
    padding: '3px 4px',
    borderRadius: '4px',
    heightTiny: '18px',
    textColorWarning: '#E58F3A'
  },
  DatePicker: {},
  Rate: {
    itemColor: '#fff'
  },
  Input: {
    heightLarge: '44px'
  },
  Anchor: {
    linkFontSize: '14px'
  }
}
