export const getDataResponse = async (endpoint: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }
  return await response.json();
};
