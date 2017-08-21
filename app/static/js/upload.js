// A reference to the <form> element
const form = document.querySelector('.upload-fraud-file');

const formWrapper = document.querySelector('.fraud-console');

// The "Choose a file" label
const uploadLabel = document.querySelector('.upload-wrapper label');

// The file picker element itself
const fileSelect = document.querySelector('.uploaded-file');

// The "problem on the backend" error message
const uploadError = document.querySelector('.upload-error');

const resultWrapper = document.querySelector('.fraud-result');
const resultText = document.querySelector('.result-text');

// All of the text used in the web app
const strings = {
  uploadNotStarted: 'Choose a file',
  uploadProcessing: 'Processing...'
};

// Hide an element from the UI
function hide(element) {
  element.classList.add('hidden');
}

// Show an element in the UI
function show(element) {
  element.classList.remove('hidden');
}

// Update the "Choose a file" button to say "Processing"
// so that the user knows something is happening
function setUploadProcessingStatus(isProcessing) {
  if (isProcessing) {
    uploadLabel.classList.add('upload-processing');
  } else {
    uploadLabel.classList.remove('upload-processing');
  }
}

// Show the "Problem on the backend" error message
function setUploadErrorStatus(hasError) {
  if (hasError) {
    show(uploadError);
  } else {
    hide(uploadError);
  }
}

function onUploadSuccess(message) {
  setUploadProcessingStatus(false);
  setUploadErrorStatus(false);

  uploadLabel.innerText = strings.uploadNotStarted;
  resultText.innerText = message;

  hide(formWrapper); // Hide upload form
  show(resultWrapper); // Show server result
}

function onUploadFailure(message) {
  setUploadProcessingStatus(false);
  setUploadErrorStatus(true);

  uploadLabel.innerText = strings.uploadNotStarted;
}

function onUploadProcessing() {
  uploadLabel.innerText = strings.uploadProcessing;
  uploadLabel.classList.add('upload-processing');
}

function sendUploadedFile(formData) {
  // Set up the AJAX request.
  const xhr = new XMLHttpRequest();

  // Open the connection.
  xhr.open('POST', '/upload', true);

  // Set up a handler for when the request finishes.
  xhr.onload = function () {
    if (xhr.status === 200) {
      onUploadSuccess(xhr.responseText);
    } else {
      onUploadFailure(xhr.responseText);
    }
  };
  // Send the Data
  xhr.send(formData);
}

function handleFormSubmission(event) {
  // Prevent the page from reloading. Some browsers do this by default
  // when a form is submitted
  event.preventDefault();

  // Create a new FormData object. We will use this to get the contents
  // of the uploaded file
  const formData = new FormData();
  const file = fileSelect.files[0];

   // Add the file to the request.
  formData.append('fraudFile', file, file.name);

  sendUploadedFile(formData);
  onUploadProcessing();
}

fileSelect.addEventListener('change', handleFormSubmission);

