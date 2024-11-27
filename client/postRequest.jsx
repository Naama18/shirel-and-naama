const postRequest = async (obj, url) => {
  const postOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  };
  try {
    console.log("url: ", url);
    const response = await fetch(url, postOptions);
    console.log("response: ", response);

    if (!response.ok) throw Error("something went wrong");
    const responseJSON = await response.json();

    console.log("requestJSON: ", responseJSON);
    return responseJSON;
  } catch (err) {
    return err.message;
  }
};
export default postRequest;
