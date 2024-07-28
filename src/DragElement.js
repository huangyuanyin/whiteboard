export default class DragElement {
  constructor(ctx, app) {
    this.ctx = ctx
    this.app = app
    this.drawShape = app.drawShape
    this.el = null // 当前拖拽元素
    this.element = null // 拖拽节点
    this.isInElement = false
    this.offset = 5
    this.size = 10
  }

  // 创建拖拽节点
  create(el) {
    if (!el) {
      this.delete()
      return
    }
    this.el = el
    let x = el.x - this.offset // 拖拽节点位置
    let y = el.y - this.offset
    let width = el.width + this.offset * 2 // 拖拽节点宽高
    let height = el.height + this.offset * 2
    this.element = {
      startX: 0,
      startY: 0,
      x,
      y,
      width,
      height,
    }
  }

  // 删除拖拽节点
  delete() {
    this.el = null
    this.element = null
  }

  // 渲染
  render() {
    if (!this.element) {
      return
    }
    let { x, y, width, height } = this.element
    this.drawShape.drawRect(x, y, width, height, {
      lineDash: [this.offset]
    })
    this.drawShape.drawRect(x - this.size, y - this.size, this.size, this.size)
    this.drawShape.drawRect(x + this.el.width + this.size, y - this.size, this.size, this.size)
    this.drawShape.drawRect(x + this.el.width + this.size, y + this.el.height + this.size, this.size, this.size)
    this.drawShape.drawRect(x - this.size, y + this.el.height + this.size, this.size, this.size)
    this.drawShape.drawCircle(x + this.el.width / 2, y - this.size * 2, this.size)
  }

  // 保存初始坐标
  savePos() {
    this.element.startX = this.element.x
    this.element.startY = this.element.y
  }

  // 更新坐标
  updatePos(x, y) {
    this.element.x = x
    this.element.y = y
  }

  // 偏移坐标
  offsetPos(ox, oy) {
    this.element.x = this.element.startX + ox
    this.element.y = this.element.startY + oy
  }

  // 检测是否在拖拽元素内部
  checkIsInDragElement(x, y) {
    if (!this.element) return false
    return (
      x >= this.element.x &&
      x <= this.element.x + this.el.width &&
      y >= this.element.y &&
      y <= this.element.y + this.el.height
    )
  }

  // 检测是否在拖拽元素的旋转按钮内部
  checkIsDragElementRotateBtn(x, y) { }
}