import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import legacy from '@vitejs/plugin-legacy'
import compressPlugin from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import'
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueSetupExtend(),
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    compressPlugin({
      verbose: false, // 是否在控制台输出压缩结果
      disable: false, // 是否禁用
      threshold: 10240, // 文件容量大于这个值进行压缩，它将被压缩，单位为b
      algorithm: 'gzip', // 压缩算法 可选 ['gzip','brotliCompress' ,'deflate','deflateRaw']
      ext: '.gz' // 生成的压缩包后缀
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 20
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    }),
    Components({
      dirs: ['src/components'],
      resolvers: [VantResolver()],
      // 组件的有效文件扩展名。
      extensions: ['vue'],
      // 允许子目录作为组件的命名空间前缀。
      directoryAsNamespace: false,
      deep: true
    }),
    createStyleImportPlugin({ resolves: [VantResolve()] }),
    AutoImport({
      imports: ['vue'],
      resolvers: [VantResolver({ importStyle: false })]
    })
  ],
  build: {
    /**
     * 类型： string | string[]
     * 默认: modules
     * 设置最终构建的浏览器兼容目标
     */
    target: 'es2015',
    /**
     * 类型： string
     * 默认: dist
     * 指定输出路径（相对于 项目根目录）
     */
    outDir: 'dist',
    /**
     * 类型： string
     * 默认: assets
     * 指定生成静态资源（js、css、img、fonts）的存放路径（相对于 build.outDir）。
     */
    assetsDir: 'static/assets',
    /**
     * 类型： number
     * 默认： 4096 (4kb)
     * 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
     */
    assetsInlineLimit: 4096,
    /**
     * 类型： boolean
     * 默认: true
     * 启用/禁用 CSS 代码拆分。如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
     */
    cssCodeSplit: true,
    /**
     * 类型： boolean | 'inline' | 'hidden'
     * 默认： false
     * 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件。
     * 如果为 'inline' source map 将作为一个 data URI 附加在输出文件中。
     * 如果为 'hidden' 的工作原理与 'true' 相似，只是 bundle 文件中相应的注释将不被保留。
     */
    sourcemap: false,
    /**
     * 类型： RollupOptions
     * 自定义底层的 Rollup 打包配置。这与从 Rollup 配置文件导出的选项相同，并将与 Vite 的内部 Rollup 选项合并。
     */
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [],
      // 指定文件输出的配置
      output: {
        chunkFileNames: `static/js/[name]-[hash].js`,
        entryFileNames: `static/js/[name]-[hash].js`,
        assetFileNames: `static/[ext]/[name]-[hash].[ext]`,
        manualChunks(id: any) {
          if (id.includes('node_modules')) {
            return 'vendor' //代码分割为第三方包
          }
        }
      }
    },
    terserOptions: {
      // 打包后移除console和注释
      compress: {
        keep_infinity: true,
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info']
      }
    },
    /**
     * 类型： boolean
     * 默认： true
     * 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
     */
    brotliSize: false,
    /**
     * 类型： number
     * 默认: 500
     * chunk 大小警告的限制（以 kbs 为单位）。
     */
    chunkSizeWarningLimit: 2000
  }
})
