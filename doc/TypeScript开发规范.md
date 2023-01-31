# Typescript 编写注意事项

## 类型

> src/types/\*

这里放的都是全局的 `typescript` 类型定义，一般为以下情况：

- 某些外部模块的不规范类型定义，需要进行修正
- 拓展某些全局定义
- 定义公共的全局定义
- 按照业务模块定义的具有可代表性、可公用的定义

### 背景

项目中会存在一些具有统一业务含义的类型定义，比如说：用户信息、订单信息等。

这些信息往往存在以下一些**特征**：

1. 统一维护

   > 假如维护多份：
   >
   > 1. 更新成本大，每次更新需要确保找到所有的地方（可能命名还都不一样）
   > 2. 出现差异化，同一个业务含义，本身不应该出现差异，就是因为部分地方更新不及时进而导致了差异，这种差异被视为是一种错误
   > 3. 含义不明，相同含义的地方，使用同一个类型定义，表明他们不仅仅是格式相同，更意味着本质上就是一个东西。如果是不同的类型，哪怕有相同的定义，在逻辑上他们也不是一个东西。如果不统一维护，那么你遇到两个定义一样的类型，他们到底是不是同一个东西呢，如果不完整的了解业务（那成本也太大了），只有天知道了。

2. 方便引用 - 因为项目中可能各处都需要用到

3. 明确的含义 - 命名空间

4. 有时候是否公用的界限有些模糊

### 规范

1. 这些类型都在 `src/types` 下面使用 `*.d.ts` 定义

2. 通过目录划分业务区域(`src/types/tz`)

   ```shell
   src
    |-- types
       |-- tz // 业务相关
         |-- api // 接口定义
            |-- auth.d.ts // 以auth开头的接口
            |-- front
              |-- event.d.ts // 以/tz-front/event/开头的接口
         |-- model // 通用类型模型
         |-- util // 常用的业务类型方法
   ```

   其中`src/types/tz`目录下有三个目录，`api`、`model`和`util`，各自的定义如下：

   `api`:用于声明接口返回的值和参数类型，该文件下的文件名或者文件的相对路径，用来表示对应接口 url 的 path 前缀，当文件内容过大的时，可继续向下拆分。简单的返回类型可在文件内直接书写。对于一些比较通用的类型，可抽象成 model 文件，存放在`src/types/tz/model`中进行引用。

   `model`:存放一些比较通用或者说复用程度较高的类型定义（有具体的含义，并不是完全根据接口的返回值来定义）。

   `util`: 项目中一些常见的类型函数

3. 为了方便统一使用，我们将这些类型定义设置为全局类型定义，通过具体的业务划分命名空间，方便索引。

> .d.ts 文件顶层声明必须以 declare 或 export 修饰符开头。
> declare 声明的类型、变量、模块、命名空间，type、interface 可以不用 declare，在 tsconfig 钟 include 的范围内都可以直接被引用，不需要 import，
> .d.tsz 中如果需要 import/export 则需要手动 declare global

### 示例

命名规范统一使用大驼峰命名

> src/types/tz/api/test.d.ts

```typescript
// 对应业务相关目录
declare namespace Tz {
  // 接口定义
  namespace Api {
    // 对应接口/test/xxxx 的path层级
    namespace Test {
      // 对应接口/test/login 的path层级
      namespace Login {
        // 对应接口方法
        namespace Post {
          // 接口的请求参数类型
          interface Req {
            password: string
            account: string
          }
          // 接口的相应参数类型
          type Res = {}
        }
      }

      // 对应接口/test/list 的path层级
      namespace List {
        namespace Get {
          // 接口的请求参数类型
          type Req = Tz.Utils.Request.Pagination.Params & {}
          // 接口的相应参数类型 返回Utils中声明的公共分页类型
          type Res = Tz.Utils.Response.Pagination.Data<{}>
        }
      }
    }
  }
}
```

## 接口 类型定义

```typescript
import { request } from '@utils/http'

/**
 * 示例：返回结果的类型定义
 * 如果不定义范围结果，那么结果的类型会变成 any
 */
export function getTrackTableData(params: Tz.Api.Front.TrackAll.List.Get.Req) {
  return request<Tz.Api.Front.TrackAll.List.Get.Res>({
    url: '/tz-front/trackall/list',
    method: 'get',
    params
  })
}

/**
 * 示例：入参的类型定义
 * 1. 通用的分页参数：current，size，可选的时候通过 Partical 使用
 * 2. 通用分页参数之外的参数可以使用 & （交叉类型）实现
 * 3. 通用的分页返回类型，只需要定义 list 单个 item 的类型传入 Tz.Utils.Response.Pagination.Data 即可
 * 4. 通常来说可以将上述一并写入声明文件中Req、Res
 */
export const requestList = (params: Partial<Tz.Utils.Request.Pagination.Params> & { test: string }) => {
  return request<Tz.Utils.Response.Pagination.Data<{ id: string; num: number }>>({
    url: 'tset',
    method: 'get',
    params
  })
}
```

## store

```typescript
const store = defineStore('example', {
  // 推荐使用箭头函数 所有这些属性都将自动推断其类型
  state: () => ({
    count: 0
  }),
  // getters中不推荐使用this
  getters: {
    // 会自动推导返回值类型
    doubleCount(state) {
      return state.count * 2
    },
    // getters内部使用this时，store实例上访问getter将不存在该属性 需要手动添加返回值类型
    doublePlusOne() {
      return this.count * 2 + 1
    },
    // 返回类型必须明确设置
    doublePlus(): number {
      return this.count * 2 + 2
    }
  }
})
```
