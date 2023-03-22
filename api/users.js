import axios from "axios";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(
      `https://moduleblocks.net/testing/Users.json`
    );
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
