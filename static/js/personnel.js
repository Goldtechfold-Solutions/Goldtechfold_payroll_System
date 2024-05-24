function displaySnackBar(message, danger) {
  var x = document.getElementById("add_dialog_snackbar");
  x.style.display = "block";
  x.style.backgroundColor = danger ? "#d32f2f" : "#004660";
  x.style.zIndex = 99;
  x.classList.add("show");
  x.innerHTML = message;

  setTimeout(function () {
    x.style.display = "none";
    x.classList.remove("show");
  }, 3000);
}

function displayIndexSnackBar(message, danger) {
  var x = document.getElementById("index_snackbar");
  x.style.display = "block";
  x.style.backgroundColor = danger ? "#d32f2f" : "#004660";
  x.style.zIndex = 99;
  x.classList.add("show");
  x.innerHTML = message;

  setTimeout(function () {
    x.style.display = "none";
    x.classList.remove("show");
  }, 3000);
}



function isLoading(check) {
  const loadingBar = document.getElementById("loading_bar");
  if (check) {
    loadingBar.style.display = "block";
  } else {
    loadingBar.style.display = "none";
  }
}

function closeAllModals() {
  // get modals
  const modals = document.getElementsByClassName("modal");

  // on every modal change state like in hidden modal
  for (let i = 0; i < modals.length; i++) {
    modals[i].classList.remove("show");
    modals[i].setAttribute("aria-hidden", "true");
    modals[i].setAttribute("style", "display: none");
  }

  // get modal backdrops
  const modalsBackdrops = document.getElementsByClassName("modal-backdrop");

  // remove every modal backdrop
  for (let i = 0; i < modalsBackdrops.length; i++) {
    document.body.removeChild(modalsBackdrops[i]);
  }
}


window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("add_personnel_btn")?.addEventListener("click", () => {
    isLoading(true);
    fetch("/view_permission_group_api")
      .then((res) => res.json())
      .then((response) => {
        isLoading(false);
        openAddUserModal(response.user_groups);
      })
      .catch((error) => {
        isLoading(false);
        displaySnackBar("Could not load user groups data", true);
      });
  });
  document.getElementById('add_personnel_form')?.addEventListener('submit', function(e){
    e.preventDefault()
    let checkComplete = true

    if(!this?.first_name?.value){
      displaySnackBar("Please first name", true)
      checkComplete = false
    }

    if(!this?.email?.value){
      displaySnackBar("Please email address", true)
      checkComplete = false
    }

    if(!this?.group_id?.value){
      displaySnackBar("Please select permission group", true)
      checkComplete = false
    }

    if(checkComplete){
      closeAllModals()
      isLoading(true)
      this.submit();
    }
  })

  document.getElementById('edit_personnel_form')?.addEventListener('submit', function(e){
    e.preventDefault()
    let checkComplete = true

    if(!this?.first_name?.value){
      displaySnackBar("Please first name", true)
      checkComplete = false
    }

    if(!this?.email?.value){
      displaySnackBar("Please email address", true)
      checkComplete = false
    }

    if(!this?.group_id?.value){
      displaySnackBar("Please select permission group", true)
      checkComplete = false
    }

    if(checkComplete){
      closeAllModals()
      isLoading(true)
      this.submit();
    }

  })

});

function openAddUserModal(user_groups) {
  const list = document.getElementById("add_group_id");
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  const first_row = document.createElement("option");
  first_row.value = ""
  first_row.innerHTML = "--Select Role Group--"
  list.appendChild(first_row)

  for (let i = 0; i < user_groups.length; i++) {
    const group = user_groups[i];

    const row = document.createElement("option");
    row.value = group.id
    row.innerHTML = group.name
    list.appendChild(row)
  }

  var myModal = new bootstrap.Modal(document.getElementById("addModal"));
  myModal.show();
}

function openEditUserModal(details) {
  const {personnel, user_groups} = details

  const list = document.getElementById("edit_group_id");
  console.log(user_groups);
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  const first_row = document.createElement("option");
  first_row.value = ""
  first_row.innerHTML = "--Select Role Group--"
  list.appendChild(first_row)

  for (let i = 0; i < user_groups.length; i++) {
    const group = user_groups[i];

    const row = document.createElement("option");
    row.value = group.id
    row.innerHTML = group.name
    if(group.id === personnel.permission_group.id)
      row.selected = true
    list.appendChild(row)
  }

  document.getElementById('personnel_id').value = personnel.id
  document.getElementById('personnel_first_name').value = personnel.first_name
  document.getElementById('personnel_last_name').value = personnel.last_name
  document.getElementById('personnel_email').value = personnel.user.email
  document.getElementById('personnel_phone').value = personnel.phone
  document.getElementById('person_user_name').value = personnel.username

  var myModal = new bootstrap.Modal(document.getElementById("editModal"));
  myModal.show();

}


function fetchPersonnelDetails(personnel_id) {
  isLoading(true)
  fetch(`/fetch_personnel?personnel_id=${personnel_id}`).then(res=> res.json()).then(response => {
    isLoading(false)
    openEditUserModal(response);
  }).catch(error=> {
    isLoading(false)
    displayIndexSnackBar("Could not fetch personnel details", true)
  })
}
