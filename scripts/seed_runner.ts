import { seed } from './seed_objects'

// @ts-ignore - Wrangler injects DB in local env via pages dev, but here we open local file.
async function main() {
  // Use Wrangler CLI to run this normally. In sandbox, we can import wrangler? No.
  // Instead, expose an endpoint or seed via a temporary Worker route.
  console.error('Run seeding via the /admin/seed endpoint in dev mode')
}

main()
