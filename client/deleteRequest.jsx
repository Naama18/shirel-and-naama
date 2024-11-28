const deleteRequest = async (url) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("todo deleted");
      return "todo deleted";
    } else {
      alert("something went wrong");

      throw Error("something went wrong");
    }
  } catch (error) {
    return error;
  }
};

export default deleteRequest;
