import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductList from "@/components/products/ProductList"; // Sesuaikan path ini
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/AuthContext";

// Mock hooks
jest.mock("../context/CartContext.tsx", () => ({
  useCart: jest.fn(),
}));
jest.mock("../context/AuthContext.tsx", () => ({
  useUser: jest.fn(),
}));

describe("ProductList Component", () => {
  const mockHandleImage = jest.fn((src) => src);
  const mockOnAddToCart = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({ handleImage: mockHandleImage });
    (useUser as jest.Mock).mockReturnValue({
      user: { role: "admin" },
      isLoggedIn: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const productProps = {
    id: 1,
    title: "Test Product",
    price: 1000,
    description: "This is a test description for the product.",
    images: ["https://i.imgur.com/N1GkCIR.jpeg"],
    onAddToCart: mockOnAddToCart,
    onEdit: mockOnEdit,
    onDelete: mockOnDelete,
  };

  it("renders product information correctly", () => {
    render(<ProductList {...productProps} />);

    // Check if the title, price, and description are displayed
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText(/\$\s?\d{1,3}(,\d{3})*/)).toBeInTheDocument();
    expect(
      screen.getByText("This is a test description for the product.")
    ).toBeInTheDocument();

    // Check if the image is displayed
    expect(screen.getByAltText("Test Product")).toHaveAttribute("src");
  });

  it("calls onAddToCart when Add to Cart button is clicked", () => {
    render(<ProductList {...productProps} />);

    const addToCartButton = screen.getByText("Add to Cart");
    fireEvent.click(addToCartButton);

    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
  });

  it("shows admin buttons and calls appropriate functions on click", () => {
    render(<ProductList {...productProps} />);

    // Check if Edit and Delete buttons are displayed
    const editButton = screen.getByText("Edit");
    const deleteButton = screen.getByText("Delete");

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    // Simulate clicks on the buttons
    fireEvent.click(editButton);
    expect(mockOnEdit).toHaveBeenCalledWith(1);

    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it("does not show admin buttons if user is not an admin", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { role: "user" },
      isLoggedIn: true,
    });

    render(<ProductList {...productProps} />);

    // Check if Edit and Delete buttons are not displayed
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
  });
});
