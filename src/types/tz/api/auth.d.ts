declare namespace Tz {
  namespace Api {
    namespace Auth {
      namespace Token {
        namespace Post {
          type Req = {
            account?: string
            password?: string
            refreshToken: boolean
            code?: string
          }

          type Res = {
            account: string
            accessToken: string
            userId: string
            authority: string
            avatar: string
            expiresIn: number
            license: string
            oauthId: string
            refreshToken: string
            tenantId: string
            tokenType: string
            userName: string
          }
        }
      }

      namespace RefreshToken {
        namespace Post {
          type Res = {
            token: string
          }
        }
      }
    }
  }
}
