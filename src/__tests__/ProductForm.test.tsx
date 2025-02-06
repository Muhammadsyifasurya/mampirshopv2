import { render, screen, fireEvent } from "@testing-library/react";
import ProductForm from "@/components/products/ProductForm"; // Pastikan path ini sesuai
import "@testing-library/jest-dom";

describe("ProductForm", () => {
  let mockOnInputChange: jest.Mock;
  let mockOnImageChange: jest.Mock;
  let mockOnAddImage: jest.Mock;
  let mockOnRemoveImage: jest.Mock;
  let mockOnSubmit: jest.Mock;
  let mockOnCancel: jest.Mock;

  beforeEach(() => {
    mockOnInputChange = jest.fn();
    mockOnImageChange = jest.fn();
    mockOnAddImage = jest.fn();
    mockOnRemoveImage = jest.fn();
    mockOnSubmit = jest.fn();
    mockOnCancel = jest.fn();
  });

  const formData = {
    title: "Sample Product",
    price: 100,
    description: "A sample product description",
    categoryId: 1,
    images: ["https://example.com/image1.jpg"],
  };

  test("renders form fields with correct initial values", () => {
    render(
      <ProductForm
        formData={formData}
        onInputChange={mockOnInputChange}
        onImageChange={mockOnImageChange}
        onAddImage={mockOnAddImage}
        onRemoveImage={mockOnRemoveImage}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Check if form fields are rendered correctly
    expect(screen.getByLabelText(/Title/)).toHaveValue(formData.title);
    expect(screen.getByLabelText(/Price/)).toHaveValue(formData.price);
    expect(screen.getByLabelText(/Description/)).toHaveValue(
      formData.description
    );
    expect(screen.getByLabelText(/Category ID/)).toHaveValue(
      formData.categoryId
    );
    expect(screen.getByPlaceholderText(/Enter image URL/)).toHaveValue(
      formData.images[0]
    );
  });

  test("calls onInputChange when input values change", () => {
    render(
      <ProductForm
        formData={formData}
        onInputChange={mockOnInputChange}
        onImageChange={mockOnImageChange}
        onAddImage={mockOnAddImage}
        onRemoveImage={mockOnRemoveImage}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Simulate typing into input fields
    fireEvent.change(screen.getByLabelText(/Title/), {
      target: { value: "Updated Title" },
    });
    expect(mockOnInputChange).toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText(/Price/), {
      target: { value: "200" },
    });
    expect(mockOnInputChange).toHaveBeenCalled();
  });

  test("calls onAddImage when adding a new image", () => {
    render(
      <ProductForm
        formData={formData}
        onInputChange={mockOnInputChange}
        onImageChange={mockOnImageChange}
        onAddImage={mockOnAddImage}
        onRemoveImage={mockOnRemoveImage}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Simulate adding an image
    fireEvent.click(screen.getByRole("button", { name: /\+ Add Image/ }));
    expect(mockOnAddImage).toHaveBeenCalled();
  });

  test("calls onRemoveImage when removing an image", () => {
    render(
      <ProductForm
        formData={formData}
        onInputChange={mockOnInputChange}
        onImageChange={mockOnImageChange}
        onAddImage={mockOnAddImage}
        onRemoveImage={mockOnRemoveImage}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Simulate removing an image
    fireEvent.click(screen.getByText("✕"));
    expect(mockOnRemoveImage).toHaveBeenCalled();
  });

  test("calls onSubmit when the form is submitted", () => {
    render(
      <ProductForm
        formData={formData}
        onInputChange={mockOnInputChange}
        onImageChange={mockOnImageChange}
        onAddImage={mockOnAddImage}
        onRemoveImage={mockOnRemoveImage}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Simulate form submission
    fireEvent.submit(screen.getByRole("form"));
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  test("calls onCancel when cancel button is clicked", () => {
    render(
      <ProductForm
        formData={formData}
        onInputChange={mockOnInputChange}
        onImageChange={mockOnImageChange}
        onAddImage={mockOnAddImage}
        onRemoveImage={mockOnRemoveImage}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Simulate cancel button click
    fireEvent.click(screen.getByText(/Cancel/));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
