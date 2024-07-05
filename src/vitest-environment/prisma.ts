import { env } from '@/env'
import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'

import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDatabaseUrl(schema: string) {
  if (!env.DATABASE_URL) {
    throw new Error('Missing DATABASE_URL environment variable')
  }

  const url = new URL(env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDatabaseUrl(schema)

    process.env.DATABASE_URL = databaseURL
    execSync('pnpm prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },

  transformMode: 'ssr',
}
