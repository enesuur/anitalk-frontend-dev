import { test, expect } from '@playwright/test';

test('filterBlogs - Searching "a" returns multiple results', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const denyButton = page.getByRole('button', { name: 'Deny' });
  if (await denyButton.isVisible()) {
    await denyButton.click();
  }

  await page.getByRole('button', { name: 'Filter Blogs' }).click();

  await page.waitForTimeout(1000);

  const searchInput = page.getByRole('textbox', { name: 'Search blogs by title or' });
  await searchInput.fill('suppellex te');

  const blogItems = page.locator('#blogs-container > *');

  const count = await blogItems.count();

  expect(count).toBeGreaterThan(1);
});
