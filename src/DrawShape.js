export default class DrawShape {
  constructor(ctx) {
    this.ctx = ctx;
  }

  // 绘制矩形
  drawRect(x, y, width, height, styles = {}) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    if (styles.lineDash) { // 虚线
      this.ctx.setLineDash(styles.lineDash); // 虚线样式
    }
    this.ctx.stroke() // 绘制矩形边框
    this.ctx.closePath() // 闭合路径
    this.ctx.restore(); // 恢复状态
  }

  // 绘制圆形
  drawCircle(x, y, r) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  }
}