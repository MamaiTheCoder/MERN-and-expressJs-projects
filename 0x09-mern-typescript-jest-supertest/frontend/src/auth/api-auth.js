const BASE_URI = 'http://localhost:5000/api/v1';

const signin = async (user) => {
  try {
    const response = await fetch(`${BASE_URI}/auth/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.log("error in signin user react frontend:", error.message);
    return { error: error.message };
  }
};

const signout = async () => {
  try {
    let response = await fetch(`${BASE_URI}/auth/signout/`, { method: "GET" });
    return await response.json();
  } catch (error) {
    console.log("error in signout user react frontend:", error.message);
  }
};

export {signin, signout};
