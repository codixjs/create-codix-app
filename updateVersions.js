const fs = require('fs-extra')
const path = require('path')

;(async () => {
  const pkgPath = path.join(__dirname, 'template', `package.json`)
  const pkg = require(pkgPath)
  pkg.devDependencies.vite = `^` + require('../vite/package.json').version
  await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2))
})()