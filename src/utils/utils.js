export const renderLoading = ({
  submitButton,
  submitText,
  disableSubmitButton,
  enableSubmitButton,
  promise,
  inputValues,
  closePopup
}) => {
  submitButton.textContent = submitText.process;
  disableSubmitButton();

  promise(inputValues)
  .then(() => {
    submitButton.textContent = submitText.accept;
    setTimeout(() => {closePopup()}, 200);
    setTimeout(() => {
      submitButton.textContent = submitText.default;
      enableSubmitButton();
    }, 700);
  })
  .catch(err => {
    submitButton.textContent = err;
    console.log(err);
    setTimeout(() => {submitButton.textContent = submitText.default;}, 1000);
  })
}
