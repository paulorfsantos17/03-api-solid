import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    include: ['./src/**/*.spec.ts'],
    environmentMatchGlobs: [
      ['./src/http/controller/**.spec.ts', './src/vitest-environment/prisma'],
    ],
  },
})
