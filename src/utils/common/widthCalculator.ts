export class WidthCalculator {
  span: HTMLSpanElement
  defaultWidth: number
  constructor(fontSize: string = '14px', fontFamily: string = 'PingFangSC-Regular, sans-serif') {
    this.span = document.createElement('span')
    this.defaultWidth = this.span.offsetWidth
    this.span.style.visibility = 'hidden'
    this.span.style.fontSize = fontSize
    this.span.style.fontFamily = fontFamily
    this.span.style.display = 'inline-block'
    document.body.appendChild(this.span)
  }
  append(text: string): number {
    const str = this.span.textContent
    this.span.innerText = str + text
    return parseFloat(window.getComputedStyle(this.span).width) - this.defaultWidth
  }
  remove() {
    this.span.remove()
  }
}

export function isLargerSpan(str: string, maxWidth: number) {
  const calculator = new WidthCalculator()
  if (calculator.append(str) > maxWidth) {
    calculator.remove()
    return true
  } else {
    calculator.remove()
    return false
  }
}
