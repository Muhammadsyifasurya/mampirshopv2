// products.test.ts
import {
  getDataResponse,
  updateData,
  deleteData,
  ProductData,
} from "../app/service/api";

// Mock environment variable
process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:3000/api";

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("getDataResponse", () => {
  it("should fetch data successfully", async () => {
    const mockData = { id: 1, title: "Test Product" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const result = await getDataResponse("/products/1");

    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/products/1");
    expect(result).toEqual(mockData);
  });

  it("should throw error on failed fetch", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(getDataResponse("/invalid-endpoint")).rejects.toThrow(
      "Failed to fetch data from /invalid-endpoint"
    );
  });
});

describe("updateData", () => {
  const mockProduct: ProductData = {
    title: "Updated Product",
    price: 200,
    description: "Updated description",
    categoryId: 2,
    images: ["new-image.jpg"],
  };

  it("should update data successfully", async () => {
    const mockResponse = { ...mockProduct, id: 1 };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await updateData("/products/1", mockProduct);

    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/products/1", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockProduct),
    });
    expect(result).toEqual(mockResponse);
  });

  it("should throw error on failed update", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(updateData("/products/1", mockProduct)).rejects.toThrow(
      "Failed to update data at /products/1"
    );
  });
});

describe("deleteData", () => {
  it("should delete data successfully", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
    });

    await deleteData("/products/1");

    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/products/1", {
      method: "delete",
    });
  });

  it("should throw error on failed deletion", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(deleteData("/products/999")).rejects.toThrow(
      "Failed to delete data from /products/999"
    );
  });
});
