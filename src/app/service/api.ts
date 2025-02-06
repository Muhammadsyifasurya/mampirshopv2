export interface ProductData {
  title: string;
  price: number;
  description: string;
  categoryId: number | null;
  images: string[];
}

export const getDataResponse = async (endpoint: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }
  return await response.json();
};

export const updateData = async (endpoint: string, data: ProductData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
    {
      method: "put", // Bisa diubah ke "PATCH" jika API mendukung
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to update data at ${endpoint}`);
  }
  return await response.json();
};

export const deleteData = async (endpoint: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
    {
      method: "delete",
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to delete data from ${endpoint}`);
  }
};
