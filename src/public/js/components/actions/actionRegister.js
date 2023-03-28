export const actionRegister = async (params) => {
  try {
    const sol = await fetch('/auth/register', {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(params)
    })

    return await sol.json()
  } catch (error) {
    
  }
};
