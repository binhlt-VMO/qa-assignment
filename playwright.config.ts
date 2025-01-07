import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout : 36*1000,
  testDir: './tests',
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
