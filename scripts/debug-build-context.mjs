import { existsSync, readFileSync } from 'node:fs'
import { appendFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '..')
const workspaceRoot = resolve(projectRoot, '..')
const logPath = resolve(workspaceRoot, 'debug-507142.log')

function log(hypothesisId, message, data) {
  const entry = JSON.stringify({
    sessionId: '507142',
    runId: 'post-fix',
    hypothesisId,
    location: 'scripts/debug-build-context.mjs',
    message,
    data,
    timestamp: Date.now(),
  })
  appendFileSync(logPath, `${entry}\n`)
}

log('H1', 'cwd and package.json locations', {
  cwd: process.cwd(),
  packageJsonInCwd: existsSync(resolve(process.cwd(), 'package.json')),
  packageJsonInProject: existsSync(resolve(projectRoot, 'package.json')),
  packageJsonInWorkspace: existsSync(resolve(workspaceRoot, 'package.json')),
})

log('H2', 'shadcn dependency presence', {
  clsxInstalled: existsSync(resolve(projectRoot, 'node_modules/clsx/package.json')),
  tailwindMergeInstalled: existsSync(resolve(projectRoot, 'node_modules/tailwind-merge/package.json')),
})

log('H3', 'font assets presence', {
  geistSansFont: existsSync(resolve(projectRoot, 'src/app/fonts/GeistVF.woff')),
  geistMonoFont: existsSync(resolve(projectRoot, 'src/app/fonts/GeistMonoVF.woff')),
})

log('H4', 'tailwind and shadcn css compatibility', {
  tailwindVersion: existsSync(resolve(projectRoot, 'node_modules/tailwindcss/package.json'))
    ? JSON.parse(
        readFileSync(resolve(projectRoot, 'node_modules/tailwindcss/package.json'), 'utf8')
      ).version
    : null,
  globalsUsesV4Imports: readFileSync(resolve(projectRoot, 'src/app/globals.css'), 'utf8').includes(
    '@import "shadcn/tailwind.css"'
  ),
  radixSlotInstalled: existsSync(
    resolve(projectRoot, 'node_modules/@radix-ui/react-slot/package.json')
  ),
})
