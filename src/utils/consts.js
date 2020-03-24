/** 夜间模式背景色 */
const nightModeBackgroundColor = '#1a1a18'
/** 背景色选项 */
const backgroundColors = [
  '#fff6e6',
  '#efcceb',
  '#deefd1',
  '#f2c5c5',
  '#ccdaef'
]
/** 默认背景色 */
const defaultBackgroundColor = backgroundColors[0]
/** 夜间模式字体色 */
const nightModeFontColor = '#666666'
/** 日间模式字体色 */
const dayModeFontColor = '#333333'

/** 预加载页数 */
const preloadPageCount = 5

/** 更新时间和电量间隔时间 */
const updateTimeAndBatteryIntervalTime = 60 * 1000

/** 上下翻页 */
const readerModeUpDown = 'upDown'
/** 左右翻页 */
const readerModeLeftRight = 'leftRight'
/** 字体大小选项 */
const fontSizes = [
  '0.5rem',
  '0.65rem',
  '0.8rem',
  '1rem'
]
/** 首行缩进选项 */
const textIndents = [
  '1rem',
  '1.3rem',
  '1.6rem',
  '2rem'
]
/** 行间距选项提示 */
const fontSizesPrompt = [
  '小',
  '默认',
  '大',
  '超大'
]
/** 默认字体大小 */
const defaultFontSize = fontSizes[1]
/** 默认首行缩进大小 */
const defaultTextIndent = textIndents[1]
/** 行间距选项 */
const rowSpaces = [
  '100%',
  '135%',
  '170%'
]
/** 行间距选项提示 */
const rowSpacePrompts = [
  '紧凑',
  '默认',
  '宽松'
]
/** 默认行高 */
const defaultRowSpace = rowSpaces[1]
/** 默认行间距选项提示 */
const defaultRowSpacePrompt = rowSpacePrompts[1]

export {
  nightModeBackgroundColor,
  backgroundColors,
  defaultBackgroundColor,
  nightModeFontColor,
  dayModeFontColor,
  preloadPageCount,
  updateTimeAndBatteryIntervalTime,
  readerModeUpDown,
  readerModeLeftRight,
  fontSizes,
  defaultFontSize,
  textIndents,
  defaultTextIndent,
  fontSizesPrompt,
  rowSpaces,
  rowSpacePrompts,
  defaultRowSpace,
  defaultRowSpacePrompt
}
