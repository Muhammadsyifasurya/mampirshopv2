import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Untuk matcher tambahan
import Popup from "../components/Popup"; // Adjust the path based on your file structure

describe("Popup Component", () => {
  test("renders correctly when visible", () => {
    render(
      <Popup message="Test Message" isVisible={true} onClose={jest.fn()} />
    );

    // Pastikan elemen popup ditampilkan
    expect(screen.getByText("Succes!")).toBeInTheDocument();
    expect(screen.getByText("Test Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /✕/i })).toBeInTheDocument();
  });

  test("does not render when not visible", () => {
    const { container } = render(
      <Popup message="Test Message" isVisible={false} onClose={jest.fn()} />
    );

    // Pastikan popup tidak dirender ges
    expect(container.firstChild).toBeNull();
  });

  test("calls onClose when close button is clicked", () => {
    const mockOnClose = jest.fn();
    render(
      <Popup message="Test Message" isVisible={true} onClose={mockOnClose} />
    );

    const closeButton = screen.getByRole("button", { name: /✕/i });
    fireEvent.click(closeButton);

    // Pastikan onClose dipanggil
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
