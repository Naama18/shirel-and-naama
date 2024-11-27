const GetRequest = async (url) => {
  try {
    console.log("IM AT THE GET OF THE CLIENT");
    console.log("url: ", url);

    const response = await fetch(url);
    console.log("response: ", response);

    if (!response.ok) throw Error("something went wrong");
    const responseJSON = await response.json();

    console.log("responseJSON: ", responseJSON);
    return responseJSON;
  } catch (err) {
    console.log("here");
    return err.message;
  }
};
export default GetRequest;
