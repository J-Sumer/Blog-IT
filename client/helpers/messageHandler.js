export const showSuccessMessage = (message) => {
  return <div className="alert alert-success">{message}</div>;
};

export const showErrorMessage = (message) => {
  return <div className="alert alert-danger">{message}</div>;
};
