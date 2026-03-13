import { expect, test } from '@playwright/test';

test('board loads with five columns and seeded cards', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('board-container')).toBeVisible();
  await expect(page.getByRole('region')).toHaveCount(5);
  await expect(page.getByRole('region', { name: 'To Do' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'In Progress' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Review' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Testing' })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Done' })).toBeVisible();
  await expect(page.getByText('Shape the launch narrative')).toBeVisible();
  await expect(page.getByText('Approve color system')).toBeVisible();
});
