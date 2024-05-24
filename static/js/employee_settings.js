window.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("add_grade_form")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!this?.name?.value) {
        displayModalSnackBar("Please input paygrade name", true);
      } else if (!this?.min_amount?.value) {
        displayModalSnackBar("Please input minimun amount", true);
      } else if (!this?.max_amount?.value) {
        displayModalSnackBar("Please input maximum amount", true);
      } else if (parseInt(this?.min_amount?.value ?? 0) >= parseInt(this?.max_amount?.value ?? 0)) {
        displayModalSnackBar(
          "Minimum amount cannot be greater than maximum amount",
          true
        );
      } else {
        isLoading(true);
        closeAllModals();
        this.submit();
      }
    });

  document
    .getElementById("edit_grade_form")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!this?.name?.value) {
        displayEditModalSnackBar("Please input paygrade name", true);
      } else if (!this?.min_amount?.value) {
        displayEditModalSnackBar("Please input minimun amount", true);
      } else if (!this?.max_amount?.value) {
        displayEditModalSnackBar("Please input maximum amount", true);
      } else if (parseInt(this?.min_amount?.value ?? 0) >= parseInt(this?.max_amount?.value ?? 0)) {
        displayEditModalSnackBar(
          "Minimum amount cannot be greater than maximum amount",
          true
        );
      } else {
        isLoading(true);
        closeAllModals();
        this.submit();
      }
    });
  document
    .getElementById("add_branch_country")
    ?.addEventListener("change", (e) => {
      if (e.target.value) {
        initViewCities(e.target.value, "add_branch_city");
      }
    });

  document
    .getElementById("edit_branch_country")
    ?.addEventListener("change", (e) => {
      if (e.target.value) {
        initViewCities(e.target.value, "edit_branch_city");
      }
    });

  document
    .getElementById("add_branch_form")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!this?.name?.value) {
        displayModalSnackBar("Please input branch name", true);
      } else {
        isLoading(true);
        closeAllModals();
        this.submit();
      }
    });
  document
    .getElementById("edit_branch_form")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!this?.name?.value) {
        displayEditModalSnackBar("Please input branch name", true);
      } else {
        isLoading(true);
        closeAllModals();
        this.submit();
      }
    });

  document
    .getElementById("add_position_form")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!this?.name?.value) {
        displayModalSnackBar("Please input position name", true);
      } else if (!this?.department?.value) {
        displayModalSnackBar("Please select department", true);
      } else {
        const seniority_body = document.getElementById("seniority_body");
        let seniority_values = [];
        for (let i = 0; i < seniority_body.childElementCount; i++) {
          const element = document.getElementById(`${i}_seniority`);
          if (element && element.value) {
            seniority_values.push(element.value);
          }
        }
        const seniority_json = JSON.stringify(seniority_values);
        const form_data = new FormData();
        form_data.append("name", this?.name?.value);
        form_data.append("supervisor", this?.supervisor?.value);
        form_data.append("department", this?.department?.value);
        form_data.append("job_description", this?.job_description?.value);
        form_data.append(
          "csrfmiddlewaretoken",
          this?.csrfmiddlewaretoken?.value
        );
        form_data.append("seniority_values", seniority_json);
        uploadPositions(form_data);
        this.reset();
      }
    });
  document
    .getElementById("edit_position_form")?.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!this?.name?.value) {
        displayEditModalSnackBar("Please input position name", true);
      } else if (!this?.department?.value) {
        displayEditModalSnackBar("Please select department", true);
      } else {
        const seniority_body = document.getElementById("edit_seniority_body");
        let senioritModaly_values = [];
        for (let i = 0; i < seniority_body.childElementCount; i++) {
          const element = document.getElementById(`${i}_edit_seniority`);
          if (element && element.value) {
            seniority_values.push(element.value);
          }
        }
        const seniority_json = JSON.stringify(seniority_values);
        const form_data = new FormData();
        form_data.append("name", this?.name?.value);
        form_data.append("supervisor", this?.supervisor?.value);
        form_data.append("department", this?.department?.value);
        form_data.append("job_description", this?.job_description?.value);
        form_data.append(
          "csrfmiddlewaretoken",
          this?.csrfmiddlewaretoken?.value
        );
        form_data.append("id", this?.id?.value);
        form_data.append("seniority_values", seniority_json);
        updatePostion(form_data);
        this.reset();
      }
    });
  document.getElementById('add_leave_group_form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    let checkcomplete = true;

    for (var pair of formData.entries()) {
      if (!pair[1]) {
        displayModalSnackBar(`Please enter value of ${pair[0]}`, true);
        checkcomplete = false;
        break;
      } else {
        checkcomplete = true;
      }
    }
    if (checkcomplete) {
      isLoading(true);
      this.submit();
    }
  })
  document.getElementById('edit_leave_group_form')?.addEventListener('submit', function (e) {
    e.preventDefault()
    const formData = new FormData(this);
    let checkcomplete = true;

    for (var pair of formData.entries()) {
      if (!pair[1]) {
        displayEditModalSnackBar(`Please enter value of ${pair[0]}`, true);
        checkcomplete = false;
        break;
      } else {
        checkcomplete = true;
      }
    }
    if (checkcomplete) {
      isLoading(true);
      this.submit();
    }
  })

  document.getElementById('add_leave_group_form')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    console.log("called here");
    const formData = new FormData(this);
    let selected_types = []
    let checkcomplete = true;
    for (var pair of formData.entries()) {
      if (!pair[1]) {
        displayIndexSnackBar(`Please enter value of ${pair[0]}`, true);
        checkcomplete = false;
        break;
      } else {
        checkcomplete = true;
      }
    }

    const leave_select = document.getElementById('leave_type_select')
    const leave_select_node = leave_select?.parentNode?.parentNode;
    if (leave_select_node) {
      const view_select = leave_select_node.applygetElementsByTagName('a')

      for (let a_select of view_select) {
        if (a_select?.dataset?.value) {
          selected_types.push(a_select?.dataset?.value)
        }
      }
    }

    formData.set('leave_types', JSON.stringify(selected_types))

    if (checkcomplete) {
      isLoading(true);
      // this.submit()
      try {
        const response = await fetch('/apply_for_leavegroup', {
          method: 'POST',
          body: formData,
        })
        console.log(response)
        isLoading(false)
        if (response.status == 200) {
          const { message } = await response.json()
          console.log(message);
          displayIndexSnackBar(message, false)
          this.reset()
          // window.location.assign('/view_leave_group')
        } else {
          const { message } = await response.json()
          displayIndexSnackBar(message, true)
        }
      } catch (error) {
        isLoading(false)
        displayIndexSnackBar("Something went wrong", true)
      }
    }
  })
});

function openEditPayGradeModal(pay_grade) {
  document.getElementById("edit_paygrade_id").value = pay_grade.id;
  document.getElementById("edit_paygrade_name").value = pay_grade.name;
  document.getElementById("edit_paygrade_min").value = pay_grade.min_amount;
  document.getElementById("edit_paygrade_max").value = pay_grade.max_amount;
  document.getElementById("edit_paygrade_deduction").value =
    pay_grade.earning_deduction;
  document.getElementById("edit_paygrade_criteria").value =
    pay_grade.entitlement_criteria;

  openModal("edit_grade_modal");
}

function openEditDepartmentModal(department) {
  document.getElementById("edit_department_name").value = department.name;
  document.getElementById("edit_department_id").value = department.id;
  document.getElementById("edit_department_head").value =
    department.department_head;

  openModal("edit_department_modal");
}

function openAddPositionModal(details) {
  const { employees, departments } = details;

  const employee_list = document.getElementById("add_position_supervisor");
  const department_list = document.getElementById("add_position_department");

  createSelectElements(employee_list, employees, "--Select SuperVisor--");
  createSelectElements(department_list, departments, "--Select Department--");

  openModal("add_position_modal");
}

function openAddBranchModal(details) {
  const { employees, countries } = details;

  const employee_list = document.getElementById("add_branch_supervisor");
  const countries_list = document.getElementById("add_branch_country");

  createSelectElements(employee_list, employees, "--Select SuperVisor--");
  createSelectElements(countries_list, countries, "--Select Country--");

  openModal("add_branch_modal");
}

function openEditBranchModal(branch, details) {
  const { employees, countries } = details;
  const cities = branch?.country?.cities ?? [];

  document.getElementById("edit_branch_id").value = branch.id;
  document.getElementById("edit_branch_name").value = branch.name;
  document.getElementById("edit_branch_area").value = branch.area;

  const employee_list = document.getElementById("edit_branch_supervisor");
  const countries_list = document.getElementById("edit_branch_country");
  const cities_list = document.getElementById("edit_branch_city");

  createSelectElements(
    employee_list,
    employees,
    "--Select SuperVisor--",
    branch?.branch_head
  );
  createSelectElements(
    countries_list,
    countries,
    "--Select Country--",
    branch?.country?.id
  );
  createSelectElements(cities_list, cities, "--Select Country--", branch?.city);

  openModal("edit_branch_modal");
}

function openEditLeaveGroupModal(leave_group) {
  const edit_form = document.getElementById('edit_leave_group_form')

  document.getElementById('edit_leave_group_id').value = leave_group.id
  edit_form.name.value = leave_group.name
  edit_form.leave_days.value = leave_group.leave_days
  edit_form.half_days_count.value = `${leave_group.half_days_count}`
  edit_form.mandatory_leave.value = `${leave_group.mandatory_leave}`

  openModal('edit_leave_modal')
}

function fetchPayGradeDetails(pay_id) {
  isLoading(true);
  fetch(`/pay_grade_details?pay_id=${pay_id}`)
    .then((res) => res.json())
    .then((response) => {
      isLoading(false);
      openEditPayGradeModal(response.pay_grade);
    })
    .catch((error) => {
      isLoading(false);
      displayIndexSnackBar("Could not fetch paygrade details", true);
    });
}

function fetchDepartmentDetails(department_id) {
  isLoading(true);
  fetch(`/department_details?department_id=${department_id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((response) => {
      isLoading(false);
      openEditDepartmentModal(response.department);
    })
    .catch((error) => {
      isLoading(false);
      console.log(error);
    });
}

function fetchPositionSettings(type) {
  isLoading(true);

  fetch("fetch_settings_employees", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((response) => {
      isLoading(false);
      openAddPositionModal(response);
    })
    .catch((error) => {
      console.log(error);
      isLoading(false);
      displayIndexSnackBar("Could not fetch position details", true);
    });
}

function addSenorityLevel(type, index) {
  const value =
    type == "add"
      ? document.getElementById(`${index}_seniority`).value
      : document.getElementById(`${index}_edit_seniority`).value;
  if (value) {
    const newIndex = parseInt(index) + 1;
    const seniority_body =
      type == "add"
        ? document.getElementById("seniority_body")
        : document.getElementById("edit_seniority_body");
    const input_id =
      type == "add" ? `${newIndex}_seniority` : `${newIndex}_edit_seniority`;
    const span_id =
      type == "add"
        ? `${newIndex}_seniority_span`
        : `${newIndex}_edit_seniority_span`;
    const div = document.createElement("div");
    div.classList.add("col-md-6");

    div.innerHTML = `
      <label>Senority Levels </label>
      <div class="form-group">
        <div class="input-group">
            <input type="text" class="form-control" placeholder="Add Seniority" name='${newIndex}_seniority' id='${input_id}'   aria-label="Add Seniority" aria-describedby="button-addon2">
            <span onclick="addSenorityLevel('${type}',${newIndex})" id='${span_id}' class="input-group-text btn-icon"><i class='fa fa-plus'></i></span>
        </div>
      </div>
    `;
    const seniority_span =
      type == "add"
        ? document.getElementById(`${index}_seniority_span`)
        : document.getElementById(`${index}_edit_seniority_span`);
    seniority_span.removeAttribute("onclick");
    seniority_span.setAttribute(
      "onclick",
      `removeSenority(${index}, '${type}')`
    );

    while (seniority_span.firstChild) {
      seniority_span.removeChild(seniority_span.firstChild);
    }
    const icon = document.createElement("i");
    icon.classList.add("fa");
    icon.classList.add("fa-times");

    seniority_span.appendChild(icon);
    seniority_body.appendChild(div);
  } else {
    if (type == "add") {
      displayModalSnackBar("Please input seniority first", true);
    } else {
      displayEditModalSnackBar("Please input seniority first", true);
    }
  }
}

function removeSenority(index, type) {
  const seniority_body =
    type == "add"
      ? document.getElementById("seniority_body")
      : document.getElementById("edit_seniority_body");
  let seniority_values = [];
  for (let i = 0; i < seniority_body.childElementCount; i++) {
    const element =
      type == "add"
        ? document.getElementById(`${i}_seniority`)
        : document.getElementById(`${i}_edit_seniority`);
    if (element && i != index) {
      seniority_values.push(element.value);
    }
  }
  while (seniority_body.firstChild) {
    seniority_body.removeChild(seniority_body.firstChild);
  }

  for (let i = 0; i < seniority_values.length; i++) {
    const value = seniority_values[i];
    const input_id = type == "add" ? `${i}_seniority` : `${i}_edit_seniority`;
    const span_id =
      type == "add" ? `${i}_seniority_span` : `${i}_edit_seniority_span`;

    const div = document.createElement("div");
    div.classList.add("col-md-6");

    if (value) {
      div.innerHTML = `
    <label>Senority Levels </label>
    <div class="form-group">
      <div class="input-group">
          <input type="text" class="form-control" placeholder="Add Seniority" name='${i}_seniority' id='${input_id}' value='${value}'  aria-label="Add Seniority" aria-describedby="button-addon2">
          <span onclick="removeSenority(${i}, '${type}')" id='${span_id}' class="input-group-text btn-icon"><i class='fa fa-times'></i></span>
      </div>
    </div>
  `;
    } else {
      div.innerHTML = `
    <label>Senority Levels </label>
    <div class="form-group">
      <div class="input-group">
          <input type="text" class="form-control" placeholder="Add Seniority" name='${i}_seniority' id='${input_id}' value='${value}'  aria-label="Add Seniority" aria-describedby="button-addon2">
          <span onclick="addSenorityLevel('${type}',${i})" id='${span_id}' class="input-group-text btn-icon"><i class='fa fa-plus'></i></span>
      </div>
    </div>
  `;
    }
    seniority_body.appendChild(div);
  }
}

async function uploadPositions(body) {
  isLoading(true);
  closeOneModal("add_position_modal");
  try {
    const upload_response = await fetch("add_position_api", {
      method: "POST",
      body: body,
    });
    const { position, message } = await upload_response.json();
    isLoading(false);
    displayIndexSnackBar(message, false);

    const position_body = document.getElementById("position_list_body");
    const position_item = document.createElement("tr");
    const csrf_token = document.getElementById("position_search_csrf").value;
    position_item.id = `${position.id}_position_row`;
    position_item.innerHTML = `
    <td>${position_body.childElementCount + 1}</td>
    <td>
        <div class="font-15"> ${position.name}</div>
    </td>
    <td>${position?.supervisor?.first_name ?? ""}</td>
    <td>${position?.department?.name ?? ""}</td>
    <td >${position?.job_description ?? ""}</td>
    <td>
        <div class='d-flex'>
          <button type="button" class="btn btn-icon" onclick="initEditPermission(${position?.id ?? ""
      })" title="Edit"><i class="fa fa-edit"></i></button>
          <form action="/delete_postion_settings" method="post">
            <input type="hidden" name="csrfmiddlewaretoken"  value="${csrf_token}">
            <input type="hidden" value='${position.id}' name='id'>
            <button type="submit" class="btn btn-icon" title="Delete" data-type="confirm"><i class="fa fa-trash-o text-danger"></i></button>
          </form>
        </div>
    </td>
    `;
    position_body.appendChild(position_item);
  } catch (error) {
    isLoading(false);
    displayIndexSnackBar("Could not upload positions", true);
  }
}

async function initEditPermission(position_id) {
  isLoading(true);

  try {
    const { position } = await fetchPositionDetails(position_id);
    let seniority_values = position?.seniority ?? [];

    document.getElementById("edit_position_id").value = position.id;
    document.getElementById("edit_position_name").value = position.name;
    document.getElementById("edit_position_description").value =
      position.job_description;

    const { departments } = await fetchDepartments();
    createSelectElements(
      document.getElementById("edit_position_department"),
      departments,
      " -- Select Department --",
      position?.department?.id
    );

    const { employees } = await fetchEmployees();
    createSelectElements(
      document.getElementById("edit_position_supervisor"),
      employees,
      " -- Select Supervisor --",
      position?.supervisor
    );

    isLoading(false);

    const seniority_body = document.getElementById("edit_seniority_body");
    while (seniority_body.firstChild) {
      seniority_body.removeChild(seniority_body.firstChild);
    }

    const length = seniority_values.length;

    for (let i = 0; i < length; i++) {
      const seniority = seniority_values[i];
      const div = document.createElement("div");
      div.classList.add("col-md-6");
      div.innerHTML = `
      <label>Senority Levels </label>
    <div class="form-group">
      <div class="input-group">
          <input type="text" class="form-control" placeholder="Add Seniority" name='${i}_edit_seniority' id='${i}_edit_seniority' value='${seniority?.name ?? ""
        }'  aria-label="Add Seniority" aria-describedby="button-addon2">
          <span onclick="removeSenority(${i}, 'edit')" id='${i}_edit_seniority_span' class="input-group-text btn-icon"><i class='fa fa-times'></i></span>
      </div>
    </div>
      `;
      seniority_body.appendChild(div);
    }

    const init_div = document.createElement("div");
    init_div.classList.add("col-md-6");
    init_div.innerHTML = `
    <label>Senority Levels </label>
    <div class="form-group">
      <div class="input-group">
          <input type="text" class="form-control" placeholder="Add Seniority" name='${length}_seniority' id='${length}_edit_seniority' aria-label="Add Seniority" aria-describedby="button-addon2">
          <span onclick="addSenorityLevel('edit',${length})" id='${length}_edit_seniority_span' class="input-group-text btn-icon"><i class='fa fa-plus'></i></span>
      </div>
    </div>
  `;
    seniority_body.appendChild(init_div);

    openModal("edit_position_modal");
  } catch (error) {
    isLoading(false);
    displayIndexSnackBar("Could not upload positions", true);
  }
}

async function updatePostion(body) {
  isLoading(true);
  closeOneModal("edit_position_modal");
  try {
    const response = await fetch("edit_position_api", {
      method: "POST",
      body: body,
    });
    const { message, position } = await response.json();
    const row = document.getElementById(`${position.id}_position_row`);
    const csrf_token = document.getElementById("position_search_csrf").value;
    const currentCount = row.firstElementChild.innerHTML;

    row.innerHTML = `
    <td>${currentCount}</td>
    <td>
        <div class="font-15"> ${position.name}</div>
    </td>
    <td>${position?.supervisor?.first_name ?? ""}</td>
    <td>${position?.department?.name ?? ""}</td>
    <td >${position?.job_description ?? ""}</td>
    <td>
        <div class='d-flex'>
          <button type="button" class="btn btn-icon" onclick="initEditPermission(${position?.id ?? ""
      })" title="Edit"><i class="fa fa-edit"></i></button>
          <form action="/delete_postion_settings" method="post">
          <input type="hidden" name="csrfmiddlewaretoken"  value="${csrf_token}">
            <input type="hidden" value='${position.id}' name='id'>
            <button type="submit" class="btn btn-icon" title="Delete" data-type="confirm"><i class="fa fa-trash-o text-danger"></i></button>
          </form>
        </div>
    </td>
    `;
    isLoading(false);
    displayIndexSnackBar(message, false);
  } catch (error) {
    isLoading(false);
    displayIndexSnackBar("Could not upload positions", true);
  }
}

async function initBranchModals(type) {
  isLoading(true);
  try {
    const { countries } = await fetchCountries();
    const { employees } = await fetchEmployees();

    isLoading(false);
    const details = { countries, employees };

    if (type == "add") {
      openAddBranchModal(details);
    } else {
      fetchCompanyBranchDetails(type, details);
    }
  } catch (error) {
    isLoading(false);
    displayIndexSnackBar("Could not initialize add try again", true);
  }
}

async function initViewCities(id, target_element) {
  isLoading(true);
  try {
    const { cities } = await fetchCities(id);
    isLoading(false);
    const cities_list = document.getElementById(target_element);
    createSelectElements(cities_list, cities, "--Select City--");
  } catch (error) {
    isLoading(false);
    displayIndexSnackBar("Could not fetch cities try again", true);
  }
}

async function fetchCompanyBranchDetails(branch_id, details) {
  isLoading(true);
  try {
    const response = await fetch(`/branch_details_api?branch_id=${branch_id}`, {
      method: "GET",
    });
    const { branch } = await response.json();

    isLoading(false);

    openEditBranchModal(branch, details);
  } catch (error) {
    isLoading(false);
    displayIndexSnackBar("Could not fetch branch details try again", true);
  }
}

async function initEditLeaveGroup(leave_id) {
  isLoading(true);
  try {
    const response = await fetch(`/leave_group_detail_api?leave_id=${leave_id}`, { method: 'GET' })
    const { leave_group } = await response.json()

    isLoading(false);
    openEditLeaveGroupModal(leave_group)

  } catch (error) {
    console.log(error);
    isLoading(false);
    displayIndexSnackBar("Could not fetch leave group details", true)
  }
}