const registrationForm = document.getElementById('registration-form');
const userDataTable = document.getElementById('user-data');
const userDataTableBody = userDataTable.querySelector('tbody');
const dobInput = document.getElementById('dob');
const dobError = document.getElementById('dobError');

// dobInput.addEventListener('blur', () => {
//     if (dobInput.validity.valueMissing) {
//       dobError.style.display = 'block';
//     } else {
//       dobError.style.display = 'none';
//     }
//   });

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        dob: document.getElementById('dob').value,
        terms: document.getElementById('terms').checked
    };
// alert box for errors
    // if (validateUserData(userData)) {
    //     saveUserData(userData);
    //     updateUserDataTable();
    //     clearForm();
    // } else {
    //     alert('value must be 09/11/1967 or later');
    // }

// error msg repeated text
    if (!validateUserData(userData)) {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Value must be 09/11/1967 or later';
        errorMessage.classList.add('error-message');
        const dateField = document.getElementById('dob');
        dateField.parentNode.appendChild(errorMessage);
      } else {
        saveUserData(userData);
        updateUserDataTable();
        clearForm();
      }

});

function validateUserData(userData) {
    const minAge = 18;
    const maxAge = 55;

    const today = new Date();
    const birthDate = new Date(userData.dob);
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < minAge || age > maxAge) {
        return false;
    }

    return true;
}

function saveUserData(userData) {
    const userDataString = JSON.stringify(userData);
    localStorage.setItem('userData', userDataString);
}

function updateUserDataTable() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        const userDataRow = createUserDataTableRow(userData);
        userDataTableBody.appendChild(userDataRow);
    }

    userDataTable.classList.remove('hidden');
}

function createUserDataTableRow(userData) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${userData.name}</td>
        <td>${userData.email}</td>
        <td>${userData.password}</td>
        <td>${userData.dob}</td>
        <td>${userData.terms ? 'Yes' : 'No'}</td>
    `;
    return row;
}

function clearForm() {
    registrationForm.reset();
}
