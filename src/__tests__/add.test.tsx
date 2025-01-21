import { render, screen, fireEvent } from "@testing-library/react";
import Add from "../components/Add"; // Adjust the import path as necessary

// Mock function for onAddToCart
const mockAddToCart = jest.fn();

describe("Add Component", () => {
  beforeEach(() => {
    mockAddToCart.mockClear(); // Clear previous calls to the mock function before each test
  });

  it("renders correctly with an initial quantity of 1", () => {
    render(<Add onAddToCart={mockAddToCart} />);

    // Check if the initial quantity is displayed as 1
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("decreases quantity when '-' button is clicked", () => {
    render(<Add onAddToCart={mockAddToCart} />);

    const decreaseButton = screen.getByLabelText("Decrease quantity");
    fireEvent.click(decreaseButton);

    // After clicking decrease, quantity should remain 1 because it's the minimum
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("increases quantity when '+' button is clicked", () => {
    render(<Add onAddToCart={mockAddToCart} />);

    const increaseButton = screen.getByLabelText("Increase quantity");
    fireEvent.click(increaseButton);

    // After clicking increase, quantity should be 2
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("disables the '-' button when quantity is 1", () => {
    render(<Add onAddToCart={mockAddToCart} />);

    const decreaseButton = screen.getByLabelText("Decrease quantity");

    // Ensure the '-' button is disabled when quantity is 1
    expect(decreaseButton).toBeDisabled();
  });

  it("disables the '+' button when quantity is 5", () => {
    render(<Add onAddToCart={mockAddToCart} />);

    // Set the quantity to 5
    const increaseButton = screen.getByLabelText("Increase quantity");
    for (let i = 0; i < 4; i++) {
      fireEvent.click(increaseButton); // Increase the quantity to 5
    }

    // Ensure the '+' button is disabled when quantity is 5
    expect(increaseButton).toBeDisabled();
  });

  it("calls onAddToCart with the correct quantity when 'Add to Cart' button is clicked", () => {
    render(<Add onAddToCart={mockAddToCart} />);

    // Increase quantity to 3
    const increaseButton = screen.getByLabelText("Increase quantity");
    for (let i = 0; i < 2; i++) {
      fireEvent.click(increaseButton);
    }

    // Click the Add to Cart button
    const addToCartButton = screen.getByText("Add to Cart");
    fireEvent.click(addToCartButton);

    // Ensure onAddToCart is called with the correct quantity (3)
    expect(mockAddToCart).toHaveBeenCalledWith(3);
  });
});
