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
    date.addEventListener("change", checkDate);
    month.addEventListener("change", checkDate);
    year.addEventListener("change", checkDate);
      function checkDate() {
      let startDate = Date.parse(
        year.value + "-" + month.value + "-" + date.value
      );
      try {
        new EmployeePayrollData().startDate = startDate;
        dateError.textContent = "";
      } catch (e) {
        dateError.textContent = e;
      }
    }
  });
    const save = () => {
    try {
      let employeePayrollData = createEmployeePayroll();
      createAndUpdateStorage(employeePayrollData);
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