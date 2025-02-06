import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Popup from "@/components/ui/Popup"; // Sesuaikan path ini

describe("Popup Component", () => {
  const mockOnClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when visible and type is 'success'", () => {
    render(
      <Popup
        message="Operation completed successfully."
        isVisible={true}
        type="success"
        onClose={mockOnClose}
      />
    );

    // Check if the popup is displayed
    expect(screen.getByText("Success!")).toBeInTheDocument();
    expect(
      screen.getByText("Operation completed successfully.")
    ).toBeInTheDocument();
  });

  it("renders correctly when visible and type is 'error'", () => {
    render(
      <Popup
        message="An error occurred."
        isVisible={true}
        type="error"
        onClose={mockOnClose}
      />
    );

    // Check if the popup is displayed
    expect(screen.getByText("Error!")).toBeInTheDocument();
    expect(screen.getByText("An error occurred.")).toBeInTheDocument();
  });

  it("does not render when isVisible is false", () => {
    render(
      <Popup
        message="This message should not appear."
        isVisible={false}
        onClose={mockOnClose}
      />
    );

    // Check if the popup is not displayed
    expect(
      screen.queryByText("This message should not appear.")
    ).not.toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    render(
      <Popup
        message="Click the close button."
        isVisible={true}
        type="success"
        onClose={mockOnClose}
      />
    );

    // Simulate clicking the close button
    const closeButton = screen.getByRole("button", { name: "✕" });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
