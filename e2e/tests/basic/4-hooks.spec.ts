import {test} from '@playwright/test';

// 1.
test.beforeAll(async () => {
  console.log('before-all');
})

// 2.
// 5.
test.beforeEach(async ({page}) => {
  console.log('before-each');
})

// 3.
test('TEST - 1', async ({page}) => {
  console.log('TEST - 1');
});

// 6.
test('TEST - 2', async ({page}) => {
  console.log('TEST - 2');
});

// 4.
// 7.
test.afterEach(async ({page}) => {
  console.log('after-each');
});

// 8.
test.afterAll(async () => {
  console.log('after-all');
});
