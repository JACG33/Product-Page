export const actionCreate = async (params) => {
  const res = await fetch("/api/products/", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ name: params.name, descrip: params.descrip }),
  });
  return await res.json();
};
