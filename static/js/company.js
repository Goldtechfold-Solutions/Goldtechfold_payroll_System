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

function createCitiesRow(cities) {
  
  const list = document.getElementById('company_city_select_edit')
  list.value = ''
 
  while (list.firstElementChild) {
    list.removeChild(list.firstElementChild);
}
const first_row = document.createElement("option");
first_row.innerHTML = '-- Select City --'
first_row.value = ''
list.appendChild(first_row)
for (let i = 0; i < cities.length; i++) {
  const city = cities[i];
  const row = document.createElement("option");
  row.innerHTML = city?.city_name??''
  row.value = city.id
  list.appendChild(row)
}
}

 function formatInputDate(mdate) {
  var date = new Date(mdate);

  var day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  var monthIndex = date.getMonth() + 1;
  var month = monthIndex < 10 ? `0${monthIndex}` : monthIndex;
  var year = date.getFullYear();

  return year + "-" + month + "-" + day;
}

window.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("add_subcompany_form")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();

      let checkAuth = true;

      if (!this?.name?.value) {
        displaySnackBar("Please enter value of Subcompany name", true);
        checkAuth = false;
      }

      if (!this?.email?.value) {
        displaySnackBar(`Please enter value of Subcompany email`, true);
        checkAuth = false;
      }

      if (!this?.nature?.value) {
        displaySnackBar(
          `Please enter value of Subcompany business nature`,
          true
        );
        checkAuth = false;
      }

      if (!this?.address?.value) {
        displaySnackBar(
          `Please enter value of Subcompany physical address`,
          true
        );
        checkAuth = false;
      }

      if (checkAuth) {
        closeAllModals();
        isLoading();
        this.submit();
      }
    });

    document.getElementById('company_select_edit')?.addEventListener('change', (e)=> {
      const country_id = e?.target?.value
      isLoading(true);
      fetch(`/view_cities_api?country_id=${country_id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }).then(res=>res.json()).then(response=>{
        isLoading(false);
        createCitiesRow(response?.cities??[])
      }).catch(error=> {
      
        isLoading(false);
        displayIndexSnackBar("Could not load country citites", true);
      })
    })

    document.getElementById('edit_subcompany_form')?.addEventListener('submit', function(e) {
           e.preventDefault();

      let checkAuth = true;

      if (!this?.name?.value) {
        displaySnackBar("Please enter value of sub-company name", true);
        checkAuth = false;
      }

      if (!this?.email?.value) {
        displaySnackBar("Please enter value of sub-company email", true);
        checkAuth = false;
      }

      if (!this?.nature?.value) {
        displaySnackBar(
          "Please enter value of sub-company business nature",
          true
        );
        checkAuth = false;
      }

      if (!this?.address?.value) {
        displaySnackBar(
          "Please enter value of sub-company physical address",
          true
        );
        checkAuth = false;
      }

      if (checkAuth) {
        closeAllModals();
        isLoading();
        this.submit();
      }
    })

    document.getElementById('company_form_edit')?.addEventListener('submit', function(e){
      e.preventDefault()
      let checkAuth = true;

      if (!this?.name?.value) {
        displayIndexSnackBar("Please enter value of company name", true);
        checkAuth = false;
      }

      if (!this?.email?.value) {
        displayIndexSnackBar("Please enter value of company email", true);
        checkAuth = false;
      }

      if (!this?.business_nature?.value) {
        displayIndexSnackBar(
          "Please enter value of company business nature",
          true
        );
        checkAuth = false;
      }

      if (!this?.postal_address?.value) {
        displayIndexSnackBar(
          "Please enter value of company physical address",
          true
        );
        checkAuth = false;
      }

      if(!this?.license?.value) {
        displayIndexSnackBar(
          "Please enter value of company business license",
          true
        );
        checkAuth = false;
      }
      
      if (checkAuth) {
        isLoading();
        this.submit();
      }
    })

    document.getElementById('company_email_settings_form')?.addEventListener('submit', function (e){
      e.preventDefault()
      let checkAuth = true;

      if(!this?.email_host?.value) {
        displayIndexSnackBar(
          "Please enter smtp host",
          true
        );
        checkAuth = false;
      }

      if(!this?.email_user?.value) {
        displayIndexSnackBar(
          "Please enter smpt user",
          true
        );
        checkAuth = false;
      }

      if(!this?.email_password?.value) {
        displayIndexSnackBar(
          "Please enter smpt password",
          true
        );
        checkAuth = false;
      }

      if(!this?.email_port?.value) {
        displayIndexSnackBar(
          "Please enter smpt port",
          true
        );
        checkAuth = false;
      }

      if(!this?.test_receiver?.value) {
        displayIndexSnackBar(
          "Please enter test email address",
          true
        );
        checkAuth = false;
      }

      if (checkAuth) {
        isLoading();
        this.submit();
      }

    })

    document.getElementById('add_holiday_form')?.addEventListener('submit', function (e) {
      e.preventDefault();
      let checkAuth = true;heckcomplete = true

      if(!this?.name?.value) {
        displaySnackBar(
          "Please enter holiday name",
          true
        );
        checkAuth = false;
      }

      if(!this?.date?.value) {
        displaySnackBar(
          "Please enter holiday date",
          true
        );
        checkAuth = false;
      }

      if(document.getElementById('add_recurring')?.checked) {
        this.is_recurring.value = true
      }else {
        this.is_recurring.value = false
      }

      if (checkAuth) {
        closeAllModals();
        isLoading();
        this.submit();
      }
    })

    document.getElementById('edit_holiday_form')?.addEventListener('submit', function (e) {
      e.preventDefault();
      let checkAuth = true;

      if(!this?.name?.value) {
        displaySnackBar(
          "Please enter holiday name",
          true
        );
        checkAuth = false;
      }

      if(!this?.date?.value) {
        displaySnackBar(
          "Please enter holiday date",
          true
        );
        checkAuth = false;
      }

      if(document.getElementById('edit_recurring')?.checked) {
        this.is_recurring.value = true
      }else {
        this.is_recurring.value = false
      }

      if (checkAuth) {
        closeAllModals();
        isLoading();
        this.submit();
      }

    })

});

function openEditModal(department) {
  document.getElementById("company_id_edit").value = department?.id;
  document.getElementById("company_name_edit").value = department?.name;
  document.getElementById("company_email_edit").value = department?.email;
  document.getElementById("company_code_edit").value = department?.code;
  document.getElementById("company_nature_edit").value =
    department?.business_nature;
  document.getElementById("company_license_edit").value = department?.license;
  document.getElementById("company_address_edit").value =
    department?.postal_address;
  document.getElementById("company_website_edit").value = department?.website;

  var myModal = new bootstrap.Modal(document.getElementById("edit_modal"));
  myModal.show();
}

function openEditHolidayModal(holiday) {
  let formatted_date = formatInputDate(holiday?.date)
  document.getElementById('edit_company_holiday_id').value = holiday?.id
  document.getElementById('edit_company_holiday_name').value = holiday?.name
  document.getElementById('edit_company_holiday_date').value = formatted_date
 
  if(holiday?.is_recurring) {
    document.getElementById('edit_recurring').checked = true
  }else {
    document.getElementById('edit_non_recurring').checked = true
  }

  var myModal = new bootstrap.Modal(document.getElementById("edit_modal"));
  myModal.show();
}

function fetchSubCompanyDetails(id) {
  isLoading(true);
  fetch(`/sub_company_details?company_id=${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      isLoading(false);
      if (response?.sub_company) {
        openEditModal(response.sub_company);
      } else {
        displayIndexSnackBar("Could not load department details", true);
      }
    })
    .catch((error) => {
      isLoading(false);
      displayIndexSnackBar("Could not load department details", true);
    });
}

function fetchSubCompanyHolidays(id) {
  isLoading(true);
  fetch(`/company_holiday_details?holiday_id=${id}`, {
    method: "GET", headers: {"Accept": "application/json"}
  }).then(res=>res.json()).then(response=>{
    isLoading(false)
    openEditHolidayModal(response.holiday)
  }).catch(error => {
    isLoading(false);
    displayIndexSnackBar("Could not load holiday details", true);
  })
}

function updateCompanyAlert(id) {
  isLoading(true)
  const days = document.getElementById(`alert_days_${id}`)
  const system_alert = document.getElementById(`alert_system_${id}`)
  const email_alert = document.getElementById(`alert_email_${id}`)
  const custom_alert = document.getElementById(`alert_custom_${id}`)

  const alert_form = document.getElementById(`alert_form_${id}`)
  alert_form.appendChild(days);
  alert_form.appendChild(system_alert)
  alert_form.appendChild(email_alert)
  alert_form.appendChild(custom_alert)

  alert_form.submit()
}