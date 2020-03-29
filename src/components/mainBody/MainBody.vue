<template>
  <div
    class="main-body"
    @click.stop="onMainBodyClick"
  >
    <DeviceInfo />
    <div
      class="content"
      :style="{
        fontSize: fontSize
      }"
    >
      <ErrorDiv
        v-if="loadMainBodyContentFail"
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
      fontSize: state => state.userConfig.fontSize,
      volumeKeyOn: state => state.userConfig.volumeKeyOn,
      volumeKeySupport: state => state.deviceData.volumeKeySupport,
      deviceSize: state => state.deviceData.deviceSize,
      isLoadingMainBodyContent: state => state.mainBody.isLoadingMainBodyContent,
      loadMainBodyContentFail: state => state.mainBody.loadMainBodyContentFail,
      readerMode: state => state.userConfig.readerMode
    })
  },
  data () {
    return {
      oneThirdWidth: 0,
      twoThirdsWidth: 0,
      oneSixthHeight: 0,
      fiveSixthsHeight: 0,
      readerModeUpDown,
      readerModeLeftRight
    }
  },
  watch: {
    /**
     * 设备尺寸更新时需要更新尺寸数据
     */
    deviceSize () {
      this.updateDeviceSizeData()
    }
  },
  methods: {
    ...mapMutations([
      'loadMainBodyContent',
      'setReaderMode',
      'setUserMenuShow'
    ]),
    /**
     * 音量键翻页功能是否开启
     */
    isVolumeKeyOn () {
      return this.volumeKeySupport && this.volumeKeyOn
    },
    /**
     * 音量键翻至下一页
     */
    volumeKeyGoNextPage () {
      if (this.isVolumeKeyOn()) {
        this.goNextPage()
      }
    },
    /**
     * 音量键翻至上一页
     */
    volumeKeyGoPrevPage () {
      if (this.isVolumeKeyOn()) {
        this.goPrevPage()
      }
    },
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
      if (
        clientX < this.oneThirdWidth ||
        (clientX < this.twoThirdsWidth && clientY < this.oneSixthHeight)
      ) {
        this.goPrevPage()
      } else if (
        (clientX >= this.oneThirdWidth && clientY >= this.fiveSixthsHeight) ||
        clientX >= this.twoThirdsWidth
      ) {
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
    },
    /**
     * 更新尺寸数据
     */
    updateDeviceSizeData () {
      this.oneThirdWidth = this.deviceSize.width / 3
      this.twoThirdsWidth = this.oneThirdWidth * 2
      this.oneSixthHeight = this.deviceSize.height / 6
      this.fiveSixthsHeight = this.oneSixthHeight * 5
    }
  },
  mounted () {
    this.updateDeviceSizeData()
    window.__readerModeObject = {
      ...window.__readerModeObject,
      goNextPage: this.volumeKeyGoNextPage,
      goPrevPage: this.volumeKeyGoPrevPage
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

<style lang="less">
.main-body {
  .content {
    p {
      text-align: justify;
      margin-block-start: 0.5em;
      margin-block-end: 0.5em;
    }
  }
}
</style>
