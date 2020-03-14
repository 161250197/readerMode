<template>
  <div class="error-div-wrapper" @click.stop="retryCallback">
    <img
      class="day-mode-item"
      src="./../../assets/error.png"
      alt="day mode error icon"
    />
    <img
      class="night-mode-item"
      src="./../../assets/error-night.png"
      alt="night mode error icon"
    />
  </div>
</template>

<script>
export default {
  name: 'ErrorDiv',
  props: {
    retryCallback: {
      type: Function,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.error-div-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 2.5rem;
  }
}
</style>
