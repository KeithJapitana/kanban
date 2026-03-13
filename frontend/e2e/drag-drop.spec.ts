import { expect, test } from '@playwright/test';

test('cards can move across columns and reorder within a column', async ({ page }) => {
  await page.goto('/');

  const todoColumn = page.getByRole('region', { name: 'To Do' });
  const doneColumn = page.getByRole('region', { name: 'Done' });
  const draggedCard = todoColumn.getByTestId('card-card-1');

  await draggedCard.dragTo(doneColumn);

  await expect(todoColumn.getByText('Shape the launch narrative')).toHaveCount(0);
  await expect(doneColumn.getByText('Shape the launch narrative')).toBeVisible();

  await todoColumn.getByTestId('card-card-3').dragTo(todoColumn.getByTestId('card-card-2'));
  const todoTitlesAfter = await todoColumn.locator('article h3').allTextContents();

  expect(todoTitlesAfter).toEqual(['Capture stakeholder feedback', 'Review onboarding friction']);
});

