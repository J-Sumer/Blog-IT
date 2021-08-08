export const showSuccessMessage = (message) => {
  return <div className="alert alert-success alert-box">{message}</div>;
};

export const showErrorMessage = (message) => {
  return <div className="alert alert-danger alert-box">{message}</div>;
};
