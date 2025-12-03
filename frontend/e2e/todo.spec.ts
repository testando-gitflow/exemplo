import { test, expect } from "@playwright/test";

test.describe("TODO App", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the header", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "TODO App" })).toBeVisible();
  });

  test("should display the subheader", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: "Gerencie suas tarefas diárias e organize-as por categoria.",
      })
    ).toBeVisible();
  });

  test("should display gitflow information", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Sobre o Gitflow" })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Branches" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Commits" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Pull Requests" })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Merges" })).toBeVisible();
  });

  test("should add a new todo", async ({ page }) => {
    const todoInput = page.getByTestId("todo-input");
    const addButton = page.getByTestId("add-todo-button");

    await todoInput.fill("Nova tarefa de teste");
    await addButton.click();

    await expect(page.getByText("Nova tarefa de teste")).toBeVisible();
  });

  test("should toggle todo completion", async ({ page }) => {
    // First add a todo
    const todoInput = page.getByTestId("todo-input");
    const addButton = page.getByTestId("add-todo-button");

    await todoInput.fill("Tarefa para completar");
    await addButton.click();

    // Wait for the todo to appear
    await expect(page.getByText("Tarefa para completar")).toBeVisible();

    // Find and click the checkbox for this todo
    const todoItem = page
      .locator('[data-testid^="todo-item-"]')
      .filter({ hasText: "Tarefa para completar" });
    const checkbox = todoItem.locator('[data-testid^="todo-checkbox-"]');

    await checkbox.click();

    // Verify the todo is marked as completed (has line-through style)
    await expect(todoItem.locator("span.line-through")).toBeVisible();
  });

  test("should delete a todo", async ({ page }) => {
    // First add a todo
    const todoInput = page.getByTestId("todo-input");
    const addButton = page.getByTestId("add-todo-button");

    await todoInput.fill("Tarefa para deletar");
    await addButton.click();

    // Wait for the todo to appear
    await expect(page.getByText("Tarefa para deletar")).toBeVisible();

    // Find and click the delete button
    const todoItem = page
      .locator('[data-testid^="todo-item-"]')
      .filter({ hasText: "Tarefa para deletar" });
    const deleteButton = todoItem.locator('[data-testid^="todo-delete-"]');

    await deleteButton.click();

    // Verify the todo is removed
    await expect(page.getByText("Tarefa para deletar")).not.toBeVisible();
  });

  test("should not add empty todo", async ({ page }) => {
    const addButton = page.getByTestId("add-todo-button");

    // Button should be disabled when input is empty
    await expect(addButton).toBeDisabled();
  });

  test("should display todo count", async ({ page }) => {
    // Wait for initial todos to load
    await page.waitForSelector('[data-testid="todo-list"]');

    // Check if count is displayed
    await expect(page.getByText(/de \d+ tarefas concluídas/)).toBeVisible();
  });
});
