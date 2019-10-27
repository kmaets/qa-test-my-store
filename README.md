**1. User story:**
- As an existing client, I want to order a t-shirt and view my orders.

**2. Acceptance criteria and test scenarios:**
- can be found in ./test_docs/TestPlan.xls
-------------------------------------------------------------------

**Running E2E test with Cypress, TypeScript steps:**
- install npm packaged needed for tests
    - `npm install`
- with Cypress tests dashboard
    - `npm run cypress:open`
    - click "Run all specs" to run all tests
    - click single spec test under "Integration Test" to run it
- run directly using chrome browser
    - `npm run cypress:run`