/**
 * Fetch localhost for data in the parameter body.
 * @file Fetcher.tsx
 * @description Fetcher for the UWC app.
 * @param {string} path - The path to the localhost excluding http://localhost:3000
 * @param {object} body - The body of the fetch request.
 */
export const UwcFetchToJSON = async (
  path: string,
  method: string,
  body: { [value: string]: string } | undefined = undefined,
  bearerToken: string = ""
) => {
  let options: RequestInit = {
    method: method,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + bearerToken,
    },
    body: undefined ? undefined : JSON.stringify(body),
  };

  try {
    const resp = await fetch("http://localhost:3000" + path, options);

    if (!resp.ok) {
      throw new Error("Invalid fetch request, STATUS:" + resp.status);
    }

    const json = await resp.json();
    if (json["result"] === "success") {
      return json;
    } else {
      return undefined;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
