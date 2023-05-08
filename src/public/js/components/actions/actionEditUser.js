export const actionEditUser = async (params) => {
  try {
    const userFetch = await fetch("/api/users/", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username: params.username }),
    });
    console.log(await userFetch.json());
  } catch (error) {
    console.log({ error });
  }
};
