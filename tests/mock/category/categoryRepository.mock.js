import { vi } from "vitest";

export const mockCategoryRepository = {
  getAll: vi.fn(),
  getById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

export const createCategoryItem = (overrides = {}) => ({
  id: 1,
  name: "Test Category",
  description: "Test category description",
  status: "Active",
  ...overrides,
});

export const createCategoryListResponse = (items = [createCategoryItem()]) => ({
  data: { data: items },
});
