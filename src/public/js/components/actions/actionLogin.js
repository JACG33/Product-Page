export const actionLogin = async (params) => {
  try {
    const sol = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(params),
    });
    return await sol.json();
  } catch (error) {}
};
