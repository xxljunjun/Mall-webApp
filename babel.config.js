module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  /*  vant引入方式一. 自动按需引入组件 (推荐)*/
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
