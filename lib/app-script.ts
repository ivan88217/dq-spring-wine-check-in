import axios from "axios";
import { getAccessToken } from "./google-auth";

export const callScript = async (functionName: string, parameters: any) => {
  const token = await getAccessToken();
  const scriptId = process.env.SCRIPT_ID;
  const { data } = await axios.post(
    `https://script.googleapis.com/v1/scripts/${scriptId}:run`,
    {
      function: functionName,
      parameters,
      devMode: true,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (data.error) {
    const errorMessage = data.error?.details[0]?.errorMessage || "no Message";
    throw new Error(errorMessage);
  }

  return data.response.result;
};
