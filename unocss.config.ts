import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

import { getRootPath, handleSvgFile } from './build/utils'

const customIconPath = getRootPath('src', 'assets/icons')

export default defineConfig({
  shortcuts: [
    ['f-c-c', 'flex justify-center items-center'],
    ['text-ellipsis', 'truncate'],
    ['wh-full', 'w-full h-full']
  ],
  rules: [
    [/^bc-(.+)$/, ([, color]) => ({ 'border-color': `#${color}` })],
    ['color-primary', { color: 'var(--primaryColor)' }],
    ['bgc-primary', { backgroundColor: 'var(--primaryColor)' }],
    // ['card-shadow', { 'box-shadow': '0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017' }],
    ['card-shadow', { 'box-shadow': '0px, 6px rgba(0, 0, 0, 0.05)' }],
    ['linear', { transition: 'all .15s linear' }],
    ['cursor', { cursor: 'pointer' }]
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      },
      collections: {
        antd: () => import('@iconify-json/ant-design').then(i => i.icons as any),
        tj: handleSvgFile(customIconPath + '/')
      }
    })
  ]
})
