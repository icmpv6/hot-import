import * as assert  from 'assert'
import * as fs      from 'fs'
import * as path    from 'path'

import hotImport  from '../'

// import { log } from 'brolog'
// log.level('silly')

async function main() {
  const MODULE_CODE_42 = 'export = () => 42'
  const MODULE_CODE_17 = 'export default () => 17'

  const MODULE_FILE = path.join(__dirname, 't.ts')

  fs.writeFileSync(MODULE_FILE, MODULE_CODE_42)
  const hotMod = await hotImport(MODULE_FILE)

  const fourtyTwo = hotMod()
  console.log('fourtyTwo =', fourtyTwo)  // Output: fourtyTwo = 42
  assert(fourtyTwo === 42, 'first get 42')

  fs.writeFileSync(MODULE_FILE, MODULE_CODE_17)
  await new Promise(setImmediate) // wait io event loop finish

  const sevenTeen = hotMod()
  console.log('sevenTeen =', sevenTeen)  // Output sevenTeen = 17
  assert(sevenTeen === 17, 'get 17 after file update & hot reloaded')

  await hotImport(MODULE_FILE, false) // stop hot watch
}

main()
.catch(console.error)
