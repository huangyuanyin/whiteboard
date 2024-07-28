import MouseEvent from './MouseEvent'
import DrawShape from './DrawShape'
import Elements from './Elements'
import DragElement from './DragElement'

export default class App {
  constructor() {
    this.wrapEl = null
    this.canvasEl = null
    this.currentType = null
    this.ctx = null
    this.elements = null
    this.drawShape = null
    this.dragElement = null
    this.mouseEvent = null
    this.canvasWidth = 0
    this.canvasHeight = 0
  }

  // 初始化
  init(wrapEl, canvasEl, currentType) {
    this.wrapEl = wrapEl
    this.canvasEl = canvasEl
    this.currentType = currentType
    // 获取画布上下文
    this.ctx = this.canvasEl.getContext('2d')
    // 获取画布宽高
    let { width, height } = this.wrapEl.getBoundingClientRect()
    this.canvasWidth = width
    this.canvasHeight = height
    // 设置显示大小(css像素)
    this.canvasEl.width = width + 'px'
    this.canvasEl.height = height + 'px'
    let scale = window.devicePixelRatio // 在视网膜屏幕上更改为1，可以看到模糊的画布
    this.canvasEl.width = Math.floor(width * scale)
    this.canvasEl.height = Math.floor(height * scale)
    // 规范化坐标系以使用css像素
    this.ctx.scale(scale, scale)

    // 鼠标事件类
    this.mouseEvent = new MouseEvent(
      this,
      this.onMousedown,
      this.onMousemove,
      this.onMouseup
    )
    // 绘制图形类
    this.drawShape = new DrawShape(this.ctx, this)
    // 元素类
    this.elements = new Elements(this.ctx, this)
    // 拖拽元素类
    this.dragElement = new DragElement(this.ctx, this)
  }

  // 清除画布
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
  }

  // 鼠标按下事件
  onMousedown(e, mouseEvent) {
    // 当前存在选中及拖拽元素
    if (this.dragElement.element) {
      if (this.dragElement.checkIsInDragElement(mouseEvent.mousedownPos.x, mouseEvent.mousedownPos.y)) {
        this.dragElement.isInElement = true
        this.dragElement.savePos()
        this.elements.saveActiveElementPos()
      }
    }
  }

  // 鼠标移动事件
  onMousemove(e, mouseEvent) {
    // 鼠标按下状态
    if (mouseEvent.isMousedown) {
      let offsetX = mouseEvent.mouseOffset.x
      let offsetY = mouseEvent.mouseOffset.y

      // 当前是选中模式
      if (this.currentType.value === 'selection') {
        // 按住了拖拽元素内部
        if (this.dragElement.isInElement) {
          this.dragElement.offsetPos(offsetX, offsetY)
          this.dragElement.offsetActiveElementPos(offsetX, offsetY)
          this.elements.render()
        }
      }
      // 当前是绘制矩形模式
      else if (this.currentType.value === 'rectangle') {
        // 当前没有激活元素，那么创建一个新元素
        if (!this.elements.activeElement) {
          let element = {
            type: 'rectangle',
            x: mouseEvent.mousedownPos.x,
            y: mouseEvent.mousedownPos.y,
            width: 0,
            height: 0,
          }
          this.elements.addElement(element)
          this.elements.activeElement = element
        }
        this.elements.setActiveElementSize(offsetX, offsetY)
        this.elements.render()
      }
    }
  }

  // 鼠标抬起事件
  onMouseup(e, mouseEvent) {
    this.currentType.value = 'selection'
    // 拖拽元素结束
    if (this.dragElement.isInElement) {
      this.dragElement.isInElement = false
    } else {
      this.elements.activeElement = null
      // 判断是否选中元素
      let el = this.elements.checkElementAtPos(e.clientX, e.clientY)
      this.elements.activeElement = el
      this.dragElement.create(el)
      this.elements.render()
    }
  }
}