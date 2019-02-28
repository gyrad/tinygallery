module.exports = {
    plugins: [
        require('autoprefixer'),
        require('cssnano')({
            preset: 'default',
        }),
        require('postcss-nested'),
        require('postcss-mixins'),
        require('postcss-simple-vars')
    ]
}