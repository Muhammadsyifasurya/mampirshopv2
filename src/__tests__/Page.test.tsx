// Page.test.js
import { render, screen } from "@testing-library/react";
import Page from "@/app/page"; // Sesuaikan path sesuai struktur proyek Anda

// Mock the API calls
jest.mock("../app/service/api", () => ({
  getDataResponse: jest.fn(),
}));

// Mock the components
jest.mock("../components/products/FeaturedProducts", () => () => (
  <div>FeaturedProducts</div>
));
jest.mock("../components/categories/CategorySection", () => () => (
  <div>CategorySection</div>
));
jest.mock("../components/products/NewProducts", () => () => (
  <div>NewProducts</div>
));
jest.mock("../components/ui/Slider", () => () => <div>Slider</div>);

describe("Page Component", () => {
  const mockProducts = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
  ];

  const mockCategories = [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
  ];

  beforeEach(() => {
    // Mock the API responses
    require("../app/service/api").getDataResponse.mockImplementation(
      (endpoint: string) => {
        if (endpoint === "/products") {
          return Promise.resolve(mockProducts);
        }
        if (endpoint === "/categories") {
          return Promise.resolve(mockCategories);
        }
        return Promise.resolve([]);
      }
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Slider component", async () => {
    render(<Page />);
    expect(await screen.findByText("Slider")).toBeInTheDocument();
  });

  it("renders the FeaturedProducts component with products", async () => {
    render(<Page />);
    expect(await screen.findByText("FeaturedProducts")).toBeInTheDocument();
  });

  it("renders the CategorySection component with categories", async () => {
    render(<Page />);
    expect(await screen.findByText("CategorySection")).toBeInTheDocument();
  });

  it("renders the NewProducts component with products", async () => {
    render(<Page />);
    expect(await screen.findByText("NewProducts")).toBeInTheDocument();
  });
});
