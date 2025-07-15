import { reset, seed } from 'drizzle-seed'
import { db, sql } from './connection'
import { schema } from './schema/index'

reset(db, schema)

seed(db, schema).refine((f) => {
  return {
    rooms: {
      count: 5,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
    },
    questions: {
      count: 20,
    },
  }
})

sql.end()

// biome-ignore lint/suspicious/noConsole: only used in dev
console.log('Database seeded')