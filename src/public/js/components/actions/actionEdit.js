export const actionEdit = async (params) => {
  const res = await fetch("/api/products/", {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      id: parseInt(params.token),
      name: params.name,
      descrip: params.descrip,
    }),
  });
  return await res.json();
};
