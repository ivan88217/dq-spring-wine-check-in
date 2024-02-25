import axios from "axios";

export const getAccessToken = async () => {
  const secret = process.env.SECRET;
  const scriptId = process.env.SCRIPT_ID;

  const { data } = await axios.get(
    `https://script.google.com/macros/s/${scriptId}/exec?secret=${secret}`,
  );

  return data.token as string;
};
