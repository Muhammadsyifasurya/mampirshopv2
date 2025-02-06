// Filter.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "@/components/ui/Filter";
import { useCart } from "@/context/CartContext";

// Mock useCart hook
jest.mock("../context/CartContext", () => ({
  useCart: jest.fn(),
}));

describe("Filter Component", () => {
  const mockCartContext = {
    minPrice: 0,
    maxPrice: 1000,
    setMinPrice: jest.fn(),
    setMaxPrice: jest.fn(),
    fetchFilteredProducts: jest.fn(),
    setSelectedCategoryFilter: jest.fn(),
    selectedCategoryFilter: null,
    fetchCategories: jest.fn(),
    categories: [
      { id: 1, name: "Electronics" },
      { id: 2, name: "Clothing" },
    ],
    searchQuery: "",
    setSortOrder: jest.fn(),
    sortOrder: "",
  };

  // Mock useCart with the correct type
  const mockUseCart = useCart as jest.Mock;

  beforeEach(() => {
    mockUseCart.mockReturnValue(mockCartContext);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders all filter controls", () => {
    render(<Filter />);

    expect(screen.getByPlaceholderText("Min Price")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Max Price")).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "categories" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "sort by" })
    ).toBeInTheDocument();
  });

  it("updates min price correctly", () => {
    render(<Filter />);
    const minInput = screen.getByPlaceholderText("Min Price");

    fireEvent.change(minInput, { target: { value: "100" } });
    expect(mockCartContext.setMinPrice).toHaveBeenCalledWith(100);
  });

  it("updates max price correctly", () => {
    render(<Filter />);
    const maxInput = screen.getByPlaceholderText("Max Price");

    fireEvent.change(maxInput, { target: { value: "500" } });
    expect(mockCartContext.setMaxPrice).toHaveBeenCalledWith(500);
  });

  it("handles category selection", () => {
    render(<Filter />);
    const categorySelect = screen.getByRole("combobox", { name: "categories" });

    fireEvent.change(categorySelect, { target: { value: "1" } });
    expect(mockCartContext.setSelectedCategoryFilter).toHaveBeenCalledWith(1);
  });

  it('handles "All Category" selection', () => {
    render(<Filter />);
    const categorySelect = screen.getByRole("combobox", { name: "categories" });

    fireEvent.change(categorySelect, { target: { value: "" } });
    expect(mockCartContext.setSelectedCategoryFilter).toHaveBeenCalledWith(0);
  });

  it("handles sort order change", () => {
    render(<Filter />);
    const sortSelect = screen.getByRole("combobox", { name: "sort by" });

    fireEvent.change(sortSelect, { target: { value: "asc" } });
    expect(mockCartContext.setSortOrder).toHaveBeenCalledWith("asc");
  });

  it("displays categories correctly", () => {
    render(<Filter />);

    expect(screen.getByText("All Category")).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("Clothing")).toBeInTheDocument();
  });

  it("calls fetchCategories on mount", () => {
    render(<Filter />);
    expect(mockCartContext.fetchCategories).toHaveBeenCalledTimes(1);
  });

  it("calls fetchFilteredProducts when dependencies change", () => {
    mockCartContext.searchQuery = "test";
    render(<Filter />);

    expect(mockCartContext.fetchFilteredProducts).toHaveBeenCalled();
  });
});
