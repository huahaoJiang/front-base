import { resolveToken } from '../utils'

const users = {
  admin: {
    id: 1,
    name: '管理员(admin)',
    avatar: 'https://assets.qszone.com/images/avatar.jpg',
    email: 'admin@163.com',
    role: ['admin']
  },
  guest: {
    id: 3,
    name: '访客(guest)',
    avatar: 'https://assets.qszone.com/images/avatar.jpg',
    role: []
  }
}
export default [
  {
    url: '/api/user',
    method: 'get',
    response: ({ headers }) => {
      const token = resolveToken(headers?.authorization)
      return {
        code: 200,
        data: {
          ...(users[token] || users.guest)
        }
      }
    }
  }
]
