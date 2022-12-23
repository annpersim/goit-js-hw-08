import throttle from 'lodash.throttle';

const FORM_STATE = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const formData = {};

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(FORM_STATE, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  e.target.reset();

  const savedData = localStorage.getItem(FORM_STATE);
  if (savedData) {
    console.log(JSON.parse(savedData));
  }

  localStorage.removeItem(FORM_STATE);
}
