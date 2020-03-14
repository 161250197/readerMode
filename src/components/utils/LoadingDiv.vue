<template>
  <div class="loading-div-wrapper">
    <img
      class="day-mode-item"
      src="./../../assets/loading.png"
      alt="day mode loading icon"
    />
    <img
      class="night-mode-item"
      src="./../../assets/loading-night.png"
      alt="night mode loading icon"
    />
  </div>
</template>

<script>
export default {
  name: 'LoadingDiv'
}
</script>

<style lang="less" scoped>
.loading-div-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 2.5rem;
    animation: rotate 1.5s ease infinite;
  }
}
</style>
