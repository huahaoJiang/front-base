import fs from 'fs'
import path from 'path'

const httpsReg = /^https:\/\//

export function wrapperEnv(envOptions: any) {
  if (!envOptions) return {}
  const ret = {}

  for (const key in envOptions) {
    let val = envOptions[key]
    if (['true', 'false'].includes(val)) {
      val = val === 'true'
    }
    if (['VITE_PORT'].includes(key)) {
      val = +val
    }
    if (key === 'VITE_PROXY' && val && typeof val === 'string') {
      try {
        val = JSON.parse(val.replace(/'/g, '"'))
      } catch (error) {
        val = ''
      }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ret[key] = val
    if (typeof val === 'string') {
      process.env[key] = val
    } else if (typeof val === 'object') {
      process.env[key] = JSON.stringify(val)
    }
  }
  return ret
}

export function createProxy(list: any[] = []) {
  const ret = {}
  for (const [prefix, target] of list) {
    const isHttps = httpsReg.test(target)

    // https://github.com/http-party/node-http-proxy#options
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path: any) => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {})
    }
  }
  return ret
}

/**
 * 获取当前环境下生效的配置文件名
 */
/*function getConfFiles() {
  const script = <string>process.env.npm_lifecycle_script
  const reg = new RegExp('--mode ([a-z_\\d]+)')
  const result = reg.exec(script)
  if (result) {
    const mode = result[1]
    return ['.env', '.env.local', `.env.${mode}`]
  }
  return ['.env', '.env.local', '.env.production']
}*/

export function getRootPath(...dir: any[]) {
  return path.resolve(process.cwd(), ...dir)
}

const clearReturn = /(\r)|(\n)/g

export function handleSvgFile(dir: string) {
  const res = loadSvgFiles(dir)
  const content = `export default ${JSON.stringify(res, null, 2)}`
  fs.writeFile(getRootPath('public', '') + '/icons.ts', content, err => {
    if (err) {
      throw new Error(`Handler Icons Err: "${err}"`)
    }
  })
  return res
}
function loadSvgFiles(dir: string): Record<string, string> {
  let svgRes: Record<string, string> = {}
  const dirChildren = fs.readdirSync(dir, {
    withFileTypes: true
  })
  for (const dirent of dirChildren) {
    if (dirent.isDirectory()) {
      svgRes = { ...svgRes, ...loadSvgFiles(dir + dirent.name + '/') }
    } else {
      if (dirent.name.endsWith('.svg')) {
        let svg = fs
          .readFileSync(dir + dirent.name)
          .toString()
          .replace(clearReturn, '')

        // 彩色图标颜色无法更改
        if (svg.match(/(fill)/g)!.length > 2) {
          svg = svg.replace(/^(fill="#\w{3,6}")/, 'fill="currentColor"')
        } else {
          svg = svg.replace(/(fill="\w{3,6}")|(fill="#\w{3,6}")/g, 'fill="currentColor"')
        }

        svgRes[toLowerLine(dirent.name.replace(/(.svg)/, ''))] = svg
      }
    }
  }
  return svgRes
}
function toLowerLine(str: string) {
  let temp = str.replace(/[A-Z]/g, function (match) {
    return '-' + match.toLowerCase()
  })
  if (temp.slice(0, 1) === '-') {
    temp = temp.slice(1)
  }
  return temp
}
