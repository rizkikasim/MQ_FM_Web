import { vi } from "vitest";

export const mockAudioRepository = {
  getAll: vi.fn(),
  getById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

export const createAudioItem = (overrides = {}) => ({
  audio_id: 1,
  title: "Test Audio",
  artist: "Test Artist",
  description: "Test description",
  file_path: "uploads/audios/test.mp3",
  duration: 0,
  status: "active",
  category_id: 1,
  thumbnail: "test.jpg",
  dominant_color: null,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
  ...overrides,
});

export const createAudioListResponse = (items = [createAudioItem()]) => ({
  data: { data: items },
});
