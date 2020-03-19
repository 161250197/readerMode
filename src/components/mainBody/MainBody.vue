<template>
  <div
    class="main-body"
    @click.stop="onMainBodyClick"
  >
    <DeviceInfo />
    <div class="content">
      <ErrorDiv
        v-if="loadingMainBodyContentFail"
        :retryCallback="loadMainBodyContent"
      />
      <LoadingDiv v-else-if="isLoadingMainBodyContent" />
      <UpDown
        :ref="readerModeUpDown"
        v-else-if="readerMode === readerModeUpDown"
      />
      <LeftRight
        :ref="readerModeLeftRight"
        v-else-if="readerMode === readerModeLeftRight"
      />
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
import { readerModeUpDown, readerModeLeftRight } from './../../utils/consts.js'

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
      deviceHeight: state => state.deviceData.deviceSize.height,
      deviceWidth: state => state.deviceData.deviceSize.width,
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
      'setUserMenuShow'
    ]),
    /**
     * 翻至下一页
     */
    goNextPage () {
      if (!this.$refs[this.readerMode]) {
        console.log('[INFO] goNextPage not ready return')
        return
      }
      this.$refs[this.readerMode].goNextPage()
    },
    /**
     * 翻至上一页
     */
    goPrevPage () {
      if (!this.$refs[this.readerMode]) {
        console.log('[INFO] goPrevPage not ready return')
        return
      }
      this.$refs[this.readerMode].goPrevPage()
    },
    /**
     * 响应主页点击
     * @param {MouseEvent} e
     */
    onMainBodyClick (e) {
      const { clientX, clientY } = e
      const oneThirdWidth = this.deviceWidth / 3
      const twoThirdsWidth = oneThirdWidth * 2
      const oneSixthHeight = this.deviceHeight / 6
      const fiveSixthsHeight = oneSixthHeight * 5
      if ((clientX < oneThirdWidth && clientY < fiveSixthsHeight) || (clientX < twoThirdsWidth && clientY < oneSixthHeight)) {
        this.goPrevPage()
      } else if ((clientX >= oneThirdWidth && clientY >= fiveSixthsHeight) || (clientX >= twoThirdsWidth && clientY >= oneSixthHeight)) {
        this.goNextPage()
      } else {
        this.setUserMenuShow(true)
      }
    },
    /**
     * 重置阅读模式
     */
    resetReaderMode () {
      this.setReaderMode(readerModeUpDown)
    }
  },
  mounted () {
    window.__readerModeObject = {
      ...window.__readerModeObject,
      goNextPage: this.goNextPage,
      goPrevPage: this.goPrevPage
    }
  }
}
</script>

<style lang="less" scoped>
.main-body {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    width: 100%;
    flex: 1;
    overflow-y: hidden;
  }
}
</style>
