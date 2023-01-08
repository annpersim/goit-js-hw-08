import throttle from 'lodash.throttle';

const inputEmail = document.querySelector('[name="email"]');
const inputMessage = document.querySelector('[name="message"]');
const form = document.querySelector('.feedback-form');
const FORM_FEEDBACK_STATE = 'feedback-form-state';

window.addEventListener('load', event => {
  try {
    const formFeedback = getLocalStorage(FORM_FEEDBACK_STATE);
    inputEmail.value = formFeedback[inputEmail.name];
    inputMessage.value = formFeedback[inputMessage.name];
  } catch (error) {
    console.log(`can not find ${FORM_FEEDBACK_STATE} in localStorage`);
  }
});

form.addEventListener(
  'input',
  throttle(event => {
    addFormFeedbackToLocalStorage(event);
  }, 500)
);

form.addEventListener('submit', event => {
  event.preventDefault();
  const formFeedback = getLocalStorage(FORM_FEEDBACK_STATE);
  console.log(formFeedback);
  clearForm();
  addFormFeedbackToLocalStorage();
});

function addFormFeedbackToLocalStorage() {
  const formToFeedback = {};
  formToFeedback[inputEmail.name] = inputEmail.value;
  formToFeedback[inputMessage.name] = inputMessage.value;
  setLocalStorage(FORM_FEEDBACK_STATE, formToFeedback);
}

function clearForm() {
  inputEmail.value = '';
  inputMessage.value = '';
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key) {
  try {
    const getKey = localStorage.getItem(key);
    return JSON.parse(getKey);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}
