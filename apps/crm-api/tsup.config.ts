import { defineConfig } from 'tsup';

// `@zarco/contracts` é publicado como TypeScript; por isso é embutido no bundle.
export default defineConfig({
  entry: ['src/server.ts'],
  format: ['esm'],
  target: 'node24',
  platform: 'node',
  clean: true,
  noExternal: ['@zarco/contracts'],
});
