const BASE_URI = 'http://localhost:5000/api/v1';

const create = async (user) => {
  try {
    const response = await fetch(`${BASE_URI}/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.log("error in create user react frontend:", error.message);
  }
};

const list = async (signal) => {
  try {
    const response = await fetch(`${BASE_URI}/users`, {
      method: "GET",
      signal: signal,
    });

    return await response.json();
  } catch (error) {
    console.log("error in list user react frontend:", error.message);
  }
};

const read = async (params, credentials, signal) => {
  try {
    const response = await fetch(`${BASE_URI}/users/${params.userId}` , {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    await response.json();
  } catch (error) {
    console.log("error in read user react frontend:", error.message);
  }
};

const update = async (params, credentials, user) => {
  try {
    const response = await fetch(`${BASE_URI}/users/${params.userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify(user),
    });

    await response.json();
  } catch (error) {
    console.log("error in update user react frontend:", error.message);
  }
};

const remove = async (params, credentials) => {
  try {
    const response = await fetch(`${BASE_URI}/users/${params.userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });

    await response.json();
  } catch (error) {
    console.log("error in delete user react frontend:", error.message);
  }
};

export { create, list, read, update, remove };
