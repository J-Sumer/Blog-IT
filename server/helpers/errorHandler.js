exports.handleError = (err) => {
  if (!err) return undefined;
  if (err === "jwt expired")
    return "This link has been expired. Please follow the process of registering again";
};
