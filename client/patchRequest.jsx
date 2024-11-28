const patchRequest = async (url, thingToUpdate) => {
  console.log("url: ", url);
  const updateOption = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(thingToUpdate),
  };
  try {
    const response = await fetch(url, updateOption);

    if (response.ok) {
      alert("updated!");
      return "updated!";
    } else {
      alert("something went wrong");
    }
  } catch (error) {
    return error;
  }
};
export default patchRequest;
