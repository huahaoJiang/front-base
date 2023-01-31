import { defineConfig, presetAttributify, presetUno } from 'unocss'

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
  presets: [presetUno(), presetAttributify()]
})
