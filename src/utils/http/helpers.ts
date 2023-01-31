import { useUserStore } from '@/store/user'

const WITHOUT_TOKEN_API = [{ url: '/blade-auth/token', method: 'POST' }]

export function isWithoutToken({ url = '', method = '' }) {
  return WITHOUT_TOKEN_API.some(item => item.url === url && item.method === method.toUpperCase())
}

export function addBaseParams(params: any) {
  if (!params.userId) {
    params.userId = useUserStore().userId
  }
}
