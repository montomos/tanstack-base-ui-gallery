//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    ignores: ['**/routeTree.gen.ts', 'src/routeTree.gen.ts'], // ★この行を追加
  },
]
