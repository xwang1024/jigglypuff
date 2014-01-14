fs = require "fs"
path = require "path"
_ = require "lodash"

env = process.env.NODE_ENV or "dev"

# default config
config =
  serverPort: 8080
  filesHome: "public"
  viewsHome: "public/views"
  componentsHome: "public/components"
  extraHelpers: []

cwdPath = process.cwd()
configFile = path.resolve cwdPath, "jiggly.json"
if fs.existsSync configFile
  outerConfig = require configFile
  _.assign config, outerConfig
  delete config.env
  if envConfig = outerConfig.env?[env]
    _.assign config, envConfig

# resolve all relative path to absolute path
config.filesHome = path.resolve cwdPath, config.filesHome
config.viewsHome = path.resolve cwdPath, config.viewsHome
config.componentsHome = path.resolve cwdPath, config.componentsHome
config.extraHelpers = _.map config.extraHelpers, (helperFile) ->
  path.resolve cwdPath, helperFile

console.log "Config loaded:"
console.log config

module.exports = config
