<template>
  <div
    class="main-body-wrapper"
    @click.stop="onMainBodyClick"
  >
    <DeviceInfo />
    <div class="content-wrapper">
      <ErrorDiv
        v-if="loadingMainBodyContentFail"
        :retryCallback="loadMainBodyContent"
      />
      <LoadingDiv v-else-if="isLoadingMainBodyContent" />
      <UpDown v-else-if="readerMode === readerModeUpDown" />
      <LeftRight v-else-if="readerMode === readerModeLeftRight" />
      <ErrorDiv
        v-else
        :retryCallback="resetReaderMode"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import DeviceInfo from './components/DeviceInfo'
import LeftRight from './components/LeftRight'
import UpDown from './components/UpDown'
import LoadingDiv from './../utils/LoadingDiv'
import ErrorDiv from './../utils/ErrorDiv'

const { readerModeUpDown, readerModeLeftRight } = require('./../../utils/consts.js').default

export default {
  name: 'MainBody',
  components: {
    DeviceInfo,
    LeftRight,
    UpDown,
    LoadingDiv,
    ErrorDiv
  },
  computed: {
    ...mapState({
      isLoadingMainBodyContent: state => state.mainBody.isLoadingMainBodyContent,
      loadingMainBodyContentFail: state => state.mainBody.loadingMainBodyContentFail,
      readerMode: state => state.userConfig.readerMode
    })
  },
  data () {
    return {
      readerModeUpDown,
      readerModeLeftRight
    }
  },
  methods: {
    ...mapMutations([
      'loadMainBodyContent',
      'setReaderMode',
      'setCatalogShow'
    ]),
    /**
     * 响应主页点击
     * @param {MouseEvent} e
     */
    onMainBodyClick (e) {
      // TODO 具体响应处理
      console.log(e)
      this.showCatalog()
    },
    /**
     * 显示目录栏
     */
    showCatalog () {
      this.setCatalogShow(true)
    },
    /**
     * 重置阅读模式
     */
    resetReaderMode () {
      this.setReaderMode(readerModeUpDown)
    }
  }
}
</script>

<style lang="less" scoped>
.main-body-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .content-wrapper {
    width: 100%;
    flex: 1;
    overflow-y: scroll;
  }
}
</style>
