module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'network': '@/network',
                'utils': '@/utils',
                'views': '@/views'
            }
        }
    },

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: []
        }
    },


    devServer: {
        proxy: {
            "/api": {
                target: "http://127.0.0.1:3007",
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            },
            "/my": {
                target: "http://127.0.0.1:3007",
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    "^/my": ""
                }
            }
        }
    },

    outputDir: __dirname + '/../bxxt-api/web',
    // publicPath: process.env.NODE_ENV === 'production' ?
    //     '/' :
    //     '/'
}