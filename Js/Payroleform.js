window.addEventListener('DOMContentLoaded', (event) => {
  const name = document.querySelector('#name');
  const nameError = document.querySelector('.text-error');
  name.addEventListener('input', function () {
    if (name.value.length == 0) {
      nameError.textContent = "";
      return;
    }
    try {
      (new EmployeePayroleData()).name = name.value;
      nameError.textContent = "";
    }
    catch (e) {
      nameError.textContent = e;
    }
  });
  const salary = document.querySelector('#salary');
  const output = document.querySelector('.salary-output');
  output.textContent = salary.value;
  salary.addEventListener('input', function () {
    output.textContent = salary.value;
  });
  var date = document.getElementById("day");
  var month = document.getElementById("month");
  var year = document.getElementById("year");
  const dateError = document.querySelector(".date-error");
  date.addEventListener("input", validateDate);
  month.addEventListener("input", validateDate);
  year.addEventListener("input", validateDate);

  function validateDate() {
    let startDate = Date.parse(
      year.value + "-" + month.value + "-" + date.value
    );
    try {
      new EmployeePayroleData().startDate = startDate;
      dateError.textContent = "";
    } catch (e) {
      dateError.textContent = e;
    }
  }
});
const save = () => {
  try {
    let employeePayroleData = createEmployeePayrole();
    createAndUpdateStorage(employeePayroleData);
  }
  catch (e) {
    return;
  }
}
const createEmployeePayrole = () => {
  let employeePayroleData = new EmployeePayroleData();
  try {
    employeePayroleData.name = getInputValueById('#name');
  }
  catch (e) {
    setTextValue('text-error', e);
    throw e;
  }
  employeePayroleData.profileImage = getSelectedValues('[name=profile]').pop();
  employeePayroleData.gender = getSelectedValues('[name=gender]').pop();
  employeePayroleData.department = getSelectedValues('[name=department]');
  employeePayroleData.salary = getInputValueById("#salary");
  employeePayroleData.notes = getInputValueById("#notes");
  let date = getInputValueById("#year") + "-" + getInputValueById("#month") + "-" + getInputValueById("#day");
  employeePayroleData.startDate = new Date(Date.parse(date));

  alert(employeePayroleData.toString());
  return employeePayroleData;
}
const getSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  let selItems = [];
  allItems.forEach((item) => {
    if (item.checked) selItems.push(item.value);
  });
  return selItems;
};
const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
};
const getInputElementValue = (id) => {
  let value = document.getElementById(id).value;
  return value;
};
function createAndUpdateStorage(employeePayroleData) {
  let employeePayroleList = JSON.parse(localStorage.getItem("EmployeePayroleList"));
  if (employeePayroleList != undefined) {
      employeePayroleList.push(employeePayroleData);
  } else {
      employeePayroleList = [employeePayroleData];
  }
  alert(employeePayroleList.toString());
  localStorage.setItem("EmployeePayroleList", JSON.stringify(employeePayroleList));
}

const resetForm = () => {
  setValue('#name', '');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValue('#salary', '');
  setTextValue('.salary-output', 400000);
  setValue('#day', '1');
  setValue('#month', 'January');
  setValue('#year', '2021');
  setValue('#notes', '');
}
const unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
      item.checked = false;
  });
}
const setTextValue = (id, value) => {
  const element = document.querySelector(id);
  element.textContent = value;
}
const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
}