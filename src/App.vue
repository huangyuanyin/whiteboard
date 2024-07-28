<template>
  <div class="hyy-container">
    <div class="hyy-toolbar">
      <el-radio-group v-model="currentType">
        <el-radio-button label="选择" value="selection" />
        <el-radio-button label="矩形" value="rectangle" />
      </el-radio-group>
    </div>
    <div class="hyy-canvasBox" ref="box">
      <canvas class="hyy-canvas" ref="canvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import App from './App'

// 当前操作类型
const currentType = ref('selection')
// 画布盒子
const box = ref(null)
// 画布
const canvas = ref(null)
// 应用实例
const app = new App()

onMounted(() => {
  app.init(box.value, canvas.value, currentType)
})
</script>

<style lang="less" scoped>
.hyy-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .hyy-toolbar {
    position: absolute;
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
    z-index: 2;
  }
  .hyy-canvasBox {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
