export class GenLogoUtil {
  logoList: any[]
  maxParallel: number
  constructor() {
    this.logoList = []
    this.maxParallel = 1000
  }

  pushArr(arr: any[]) {
    this.logoList = this.logoList.concat(arr)
  }
  getListLength() {
    return this.logoList.length
  }

  generateLogo(num: number) {
    return this.logoList.splice(0, num)
  }
  removeFirstLogo() {
    this.logoList.shift()
  }
}
