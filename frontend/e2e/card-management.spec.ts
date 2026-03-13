import { expect, test } from '@playwright/test';

test('add, delete, and rename flows work', async ({ page }) => {
  await page.goto('/');

  const todoColumn = page.getByRole('region', { name: 'To Do' });
  await todoColumn.getByRole('button', { name: '+ Add Card' }).click();

  const titleInput = page.getByLabel('Title');
  const detailsInput = page.getByLabel('Details');
  await expect(titleInput).toBeVisible();
  await expect(detailsInput).toBeVisible();

  const titleColor = await titleInput.evaluate((element) => window.getComputedStyle(element).color);
  const detailsColor = await detailsInput.evaluate((element) => window.getComputedStyle(element).color);
  expect(titleColor).not.toBe('rgb(255, 255, 255)');
  expect(detailsColor).not.toBe('rgb(255, 255, 255)');

  await titleInput.fill('New Test Card');
  await detailsInput.fill('Readable details for the new card.');
  await page.getByRole('dialog').getByRole('button', { name: 'Add Card' }).click();

  await expect(todoColumn.getByText('New Test Card')).toBeVisible();

  const newCard = todoColumn.getByTestId(/card-/).filter({ hasText: 'New Test Card' });
  await newCard.getByRole('button', { name: 'Delete New Test Card' }).click();
  await expect(newCard.getByText('Delete this card?')).toBeVisible();
  await newCard.getByRole('button', { name: 'Yes' }).click();
  await expect(todoColumn.getByText('New Test Card')).toHaveCount(0);

  const reviewColumn = page.getByRole('region', { name: 'Review' });
  await reviewColumn.getByRole('button', { name: 'Rename column Review' }).dblclick();
  const renameInput = reviewColumn.getByLabel('Rename Review');
  await renameInput.fill('Code Review');
  await renameInput.press('Enter');
  await expect(page.getByRole('region', { name: 'Code Review' })).toBeVisible();
});
