<template>
  <div class="loading-div">
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
    <div class="prompt">
      {{ prompt }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingDiv',
  props: {
    prompt: {
      type: String,
      default: '加载中……'
    }
  }
}
</script>

<style lang="less" scoped>
.loading-div {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 2rem;
    height: 2rem;
    animation: rotate 1.5s ease infinite;
  }
  .prompt {
    margin-top: 0.5rem;
    text-align: center;
  }
}
</style>
