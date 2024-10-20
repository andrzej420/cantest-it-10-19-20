import { test } from '@playwright/test';

test('TEST - 1', async () => {
  console.log('TEST - 1');
});

// test.only('TEST - only', async () => {
//   console.log('TEST - only');
// })

test.skip('TEST - skip', async () => {
  console.log('TEST - skip');
});

test.describe('TEST - describe', async () => {
  test('TEST - describe - 1', async () => {
    console.log('TEST - describe - 1');
  });

  test('TEST - describe - 2', async () => {
    console.log('TEST - describe - 2');
  });
})
