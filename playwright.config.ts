import { defineConfig, devices } from "@playwright/test";

// Test di layout (npm run test:layout): build di produzione + next start su una porta propria.
const PORTA = 3210;

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: `http://localhost:${PORTA}`,
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: `npm run build && npx next start -p ${PORTA}`,
    url: `http://localhost:${PORTA}/a2/grammatica`,
    reuseExistingServer: false,
    timeout: 240_000,
  },
});
