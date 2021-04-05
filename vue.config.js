module.exports={
    // publicPath，这与项目上线时部署在服务器中的哪个目录有关。
    // filenameHashing: false,  打包就没有hash值，最好不要关
    // pages: {
  //     index: {
  //       entry: 'src/main.js',
  //       template: 'public/index.html',
  //       filename: 'index.html',
  //       title: '首页',
  //       chunks: ['chunk-vendors', 'chunk-common', 'index']
  //     },
     //  news: {
     //    entry: 'src/news.js',
     //    template: 'public/news.html',
     //    filename: 'news.html',
     //    title: '新闻中心',
     //    chunks: ['chunk-vendors', 'chunk-common', 'index']
     //  },
     //  about: {
     //    entry: 'src/about.js',
     //    template: 'public/about.html',
     //    filename: 'about.html',
     //    title: '关于我们',
     //    chunks: ['chunk-vendors', 'chunk-common', 'index']
     //  }
  //   }

    devServer:{
        port:8090,//改变端口号
        open:true,//启动服务器自动打开浏览器
        proxy:{
            '/api':{
                target:'http://10.20.158.29:9000',
                ws:true,
                changeOrigin: true
                //   http://10.20.158.29:9000      
                //   后端提供的api接口：/api/v1/user/login
            }
        }
    }
}