export const actionDelete = async (param) => {
  const res = await fetch(`/api/products/${param.token}`, { method: "DELETE" });
  return await res.json();
};
