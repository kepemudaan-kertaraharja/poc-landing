import { defineConfig, devices } from '@playwright/test';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  fullyParallel: true,
  use: {
    baseURL: 'http://127.0.0.1:4173/rw-demo/',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    cwd: fileURLToPath(new URL('.', import.meta.url)),
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4173 --strictPort --base /rw-demo/',
    url: 'http://127.0.0.1:4173/rw-demo/',
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});
