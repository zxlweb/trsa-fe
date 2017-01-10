# 0.1.0

+ initial release

# 0.1.1

+ 修改npm scripts
+ 通过HTMLwrap类暴露TAG_TYPE, 而不是直接通过模块暴露
+ 组件的initialData方法注入config参数
+ 暴露用户自定义style文件到framework外
+ storage依赖js-cookie,抛弃jquery.cookie
+ 服务器端错误将stack信息暴露到前端，方便在不监控服务器log情况下调试bug
+ 增加图片上传模块，图片存储服务依赖阿里云OSS
+ 允许配置跨域访问
+ 增加服务器端redirect策略

# 0.1.2

+ gulpfile watch webpack增加意外重启机制
+ reset.less和global.less由wrap引入
+ server端注入全局变量，并暴露__DIST__全局变量

# 0.1.3

+ 暴露__MOBILE__等变量到路由props中
+ css utils 调整respon方法的通用性
+ 修复路由空component导致的错误

# 0.1.4

+ 更新包依赖，主要React升级到0.14
+ action字段验证方案不再采用redux中间件，解决Promise先发出HTTP请求的问题

# 0.1.5

+ initialData方法注入renderProps
+ 修复404问题
+ 增加initialState编码和解码，避免JSON.parse字符串转义问题
+ validator中notEmptyValidator覆盖value是NaN的情况
+ 图片上传采用配置式，增加删除图片接口

# 0.1.6

+ retina默认2x
+ 更新依赖
+ 添加Redirect引用
+ 图片上传directory可自定义
+ 关掉cssnano自动rebase zindex
+ 调整静态initialData接口语义，更名为interceptor
+ 分离ajax和http的请求配置
+ 增加对微信认证和jsapi的支持

# 0.2.0

+ 更新依赖包，并相应调整代码结构
+ less工具包`#u`变为`#U`，方便输入
+ 重新引入`redux-validator`，并引入`redux-thunk`,调整redux data flow解决Promise先发请求的问题
+ 增加code split机制，减少首屏加载js文件大小
+ 所有服务器请求增加gzip，大幅降低文件传输size

# 0.2.1

+ 兼容ACE
+ 压缩图片后上传OSS，并修改生产环境图片路径
+ 去掉scoped方案，靠自觉
+ 调整retina默认倍数为可配置
