let empPayroleList;
window.addEventListener('DCMContentLoaded', (event) => {
      empPayroleList = getEmployeeParroleDataFromStorage();
      document.querySelector(".emp-count").textContent = empPayroleList.length;
      createInnerHtml();
      localStorage.removeItem('editEmp');
});