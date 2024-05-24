var emergency_contacts = [];
const emergency_contact_body = "contact_body";
const emergency_annotation = { suffix: "contact_row", prefix: "add_contact" };
const emergency_methods = {
  editMethod: "initEditContactItem",
  deleteMethod: "removeContactItem",
  addMethod: "createContactItem",
};

var kin_contacts = [];
const kin_contact_body = "kin_body";
const kin_annotation = { suffix: "kin_row", prefix: "add_kin" };
const kin_methods = {
  editMethod: "initEditKinItem",
  deleteMethod: "removeKinItem",
  addMethod: "createKinItem",
};

const contact_body = {
  name: "text",
  relation: "text",
  phone: "text",
  email: "email",
  address: "text",
};

var academic_qualifications = [];
const academic_body = "academic_body";
const academic_annotation = { suffix: "academic_row", prefix: "a_institution" };
const academic_methods = {
  editMethod: "initEditAcademicItem",
  deleteMethod: "removeAcademicItem",
  addMethod: "createAcademicQualification",
};
const academic_object = {
  name: "text",
  level: "text",
  grade: "text",
  start: "date",
  end: "date",
};

var professional_qualifications = [];
const professional_body = "profession_body";
const professional_annotation = {
  suffix: "profession_row",
  prefix: "a_profession",
};
const professional_methods = {
  editMethod: "initEditProfessionItem",
  deleteMethod: "removeProfessionItem",
  addMethod: "createProfessionalQualification",
};
const professional_object = {
  name: "text",
  institution: "text",
  level: "text",
  grade: "text",
  start: "date",
  end: "date",
};

var employement_history = [];
const employement_body = "history_body";
const employement_annotation = {
  suffix: "history_row",
  prefix: "c_history",
};
const employement_methods = {
  editMethod: "initEditWorkHistory",
  deleteMethod: "removeWorkHistory",
  addMethod: "createWorkHistory",
};
const employement_object = {
  name: "text",
  address: "text",
  position: "text",
  start: "date",
  end: "date",
  reason: "textarea",
};

var allergies = [];
const allergies_methods = {
  remove: "removeEmployeeAllergies",
  create: "createEmployeeAllergies(event)",
};

var leave_application_array = [];
const leave_application_body = "leave_application_body";
const leave_annotations = {
  prefix: "leave_application",
  suffix: "view_application",
};
const leave_methods = {
  editMethod: "initEditLeaveApplication",
  deleteMethod: "deleteLeaveApplication",
  viewMethod: 'viewLeaveApplication'
};
var leave_edit_index = 0

window.addEventListener("DOMContentLoaded", () => {
  try {
    if (emergencies) {
      emergency_contacts = emergencies?.map((e_item) => {
        return {
          name: e_item.name,
          relation: e_item.relation,
          phone: e_item.phone,
          email: e_item.email,
          address: e_item.address,
        };
      });
      const input_types = { default_value: "", default_object: contact_body };
      createSpreadSheetTable(
        emergency_contact_body,
        emergency_contacts,
        emergency_annotation,
        emergency_methods,
        input_types
      );
    }

    if (next_of_kin_emergencies) {
      kin_contacts = next_of_kin_emergencies?.map((k_item) => {
        return {
          name: k_item.name,
          relation: k_item.relation,
          phone: k_item.phone,
          email: k_item.email,
          address: k_item.address,
        };
      });
      const input_types = { default_value: "", default_object: contact_body };
      createSpreadSheetTable(
        kin_contact_body,
        kin_contacts,
        kin_annotation,
        kin_methods,
        input_types
      );
    }

    if (academic_levels) {
      academic_qualifications = academic_levels?.map((a_item) => {
        return {
          name: a_item.institution_name,
          level: a_item.level,
          grade: a_item.qualification,
          start: formatInputDate(a_item.start_date),
          end: formatInputDate(a_item.end_date),
        };
      });
      const input_types = {
        default_value: "",
        default_object: academic_object,
      };
      createSpreadSheetTable(
        academic_body,
        academic_qualifications,
        academic_annotation,
        academic_methods,
        input_types
      );
    }

    if (professional_levels) {
      professional_qualifications = professional_levels?.map((p_item) => {
        return {
          name: p_item.name,
          institution: p_item.institution_name,
          level: p_item.level,
          grade: p_item.qualification,
          start: formatInputDate(p_item.start_date),
          end: formatInputDate(p_item.end_date),
        };
      });
      const input_types = {
        default_value: "",
        default_object: professional_object,
      };
      createSpreadSheetTable(
        professional_body,
        professional_qualifications,
        professional_annotation,
        professional_methods,
        input_types
      );
    }

    if (work_history) {
      employement_history = work_history?.map((w_item) => {
        return {
          name: w_item.name,
          address: w_item.address,
          position: w_item.position,
          start: w_item.from_date,
          end: w_item.to_date,
          reason: w_item.leave_reason,
        };
      });
      const input_types = {
        default_value: "",
        default_object: employement_object,
      };
      createSpreadSheetTable(
        employement_body,
        employement_history,
        employement_annotation,
        employement_methods,
        input_types
      );
    }

    if (allergies_array) {
      allergies = allergies_array;
      createInputArray(
        "employee_allergies_container",
        allergies,
        "employee_allergies",
        allergies_methods
      );
    }

    if (expatriate_status) {
      const status_body = document.getElementById("expatriate_status");
      for (let i = 0; i < status_body.childElementCount; i++) {
        const element = status_body.children[i];
        if (element.value && element.value === "true") {
          element.selected = "selected";
        }
      }
      const permit_elements =
        document.getElementsByClassName("employee_permist");
      for (let i = 0; i < permit_elements.length; i++) {
        const element = permit_elements[i];
        element.classList.remove("employee_permist_visibility");
      }
    } else {
      const status_body = document.getElementById("expatriate_status");
      for (let i = 0; i < status_body.childElementCount; i++) {
        const element = status_body.children[i];
        if (element.value && element.value === "false") {
          element.selected = "selected";
        }
      }
      const permit_elements =
        document.getElementsByClassName("employee_permist");
      for (let i = 0; i < permit_elements.length; i++) {
        const element = permit_elements[i];
        element.classList.add("employee_permist_visibility");
      }
    }
  } catch (error) {
    console.log("Is not edit");
  }

  document
    .getElementById("employee_job_position")
    ?.addEventListener("change", (e) => {
      getSeniorityDrop(e.target.value);
    });
  document
    .getElementById("expatriate_status")
    ?.addEventListener("change", (e) => {
      const value = e.target.value;
      const permit_elements =
        document.getElementsByClassName("employee_permist");

      for (let i = 0; i < permit_elements.length; i++) {
        const element = permit_elements[i];

        if (value === "true") {
          element.classList.remove("employee_permist_visibility");
        } else {
          const inputs = element.getElementsByTagName("input");
          for (let j = 0; j < inputs.length; j++) {
            const input_element = inputs[j];
            input_element.value = "";
          }
          element.classList.add("employee_permist_visibility");
        }
      }
    });
  document
    .getElementById("add_employee_form")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();

      const current_tab = getSelectedTabId();
      if (current_tab === "personal_info_tab") {
        const checkItems = checkInputValue({
          salutation: this?.salutation?.value,
          first_name: this?.first_name?.value,
          middle_name: this?.middle_name?.value,
          last_name: this?.last_name?.value,
          gender: this?.gender?.value,
          date_of_birth: this?.dob?.value,
          // role: this?.role?.value,
          residence_status: this?.residence_status?.value,
          marital_status: this?.marital_status?.value,
          national_id: this?.national_id?.value,
          contract_type: this?.contract_type?.value,
        });

        if (checkItems) {
          displayIndexSnackBar(checkItems, true);
        } else {
          viewJobDetails(e);
          addCurrentTab("job_detail_tab");
        }
      } else if (current_tab == "job_detail_tab") {
        const checkItems = checkInputValue({
          employee_number: this?.employee_number?.value,
          hire_date: this?.hire_date?.value,
          employee_job_position: this?.position?.value,
          employee_job_paygrade: this?.paygrade?.value,
          employee_job_department: this?.department?.value,
          employee_job_branch: this?.branch?.value,
          leave_group: this?.leave_group?.value,
          start_date: this?.start_date?.value,
          end_date: this?.end_date?.value,
          tax_pin: this?.tax_pin?.value,
        });

        if (checkItems) {
          displayIndexSnackBar(checkItems, true);
        } else {
          addCurrentTab("contact_detail_tab");
        }
      } else if (current_tab == "contact_detail_tab") {
        const checkItems = checkInputValue({
          personal_email: this?.personal_email?.value,
          personal_phone: this?.personal_phone?.value,
        });

        if (checkItems) {
          displayIndexSnackBar(checkItems, true);
        } else {
          addCurrentTab("education_detail_tab");
        }
      } else if (current_tab == "education_detail_tab") {
        viewEmployementInfo(e);
        addCurrentTab("employement_info_tab");
      } else {
        const checkItems = checkInputValue({
          employee_nationality: this?.employee_nationality?.value,
        });

        if (checkItems) {
          displayIndexSnackBar(checkItems, true);
        } else {
          const formData = new FormData(this);
          addEmployee(formData);
        }
      }
    });

  document
    .getElementById("edit_employee_form")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();

      const current_tab = getSelectedTabId();
      if (current_tab == "personal_info_tab") {
        const checkItems = checkInputValue({
          salutation: this?.salutation?.value,
          first_name: this?.first_name?.value,
          middle_name: this?.middle_name?.value,
          last_name: this?.last_name?.value,
          gender: this?.gender?.value,
          role: this?.role?.value,
          date_of_birth: this?.dob?.value,
          residence_status: this?.residence_status?.value,
          marital_status: this?.marital_status?.value,
          national_id: this?.national_id?.value,
          contract_type: this?.contract_type?.value,
        });

        if (checkItems) {
          displayIndexSnackBar(checkItems, true);
        } else {
          viewJobDetails(e);
          addCurrentTab("job_detail_tab");
        }
      } else if (current_tab == "job_detail_tab") {
        const checkItems = checkInputValue({
          employee_number: this?.employee_number?.value,
          hire_date: this?.hire_date?.value,
          employee_job_position: this?.position?.value,
          employee_job_paygrade: this?.paygrade?.value,
          employee_job_department: this?.department?.value,
          employee_job_branch: this?.branch?.value,
          leave_group: this?.leave_group?.value,
          start_date: this?.start_date?.value,
          end_date: this?.end_date?.value,
          tax_pin: this?.tax_pin?.value,
        });

        if (checkItems) {
          displayIndexSnackBar(checkItems, true);
        } else {
          addCurrentTab("contact_detail_tab");
        }
      } else if (current_tab == "contact_detail_tab") {
        const checkItems = checkInputValue({
          personal_email: this?.personal_email?.value,
          personal_phone: this?.personal_phone?.value,
        });

        if (checkItems) {
          displayIndexSnackBar(checkItems, true);
        } else {
          addCurrentTab("education_detail_tab");
        }
      } else if (current_tab == "education_detail_tab") {
        viewEmployementInfo(e);
        addCurrentTab("employement_info_tab");
      } else {
        const checkItems = checkInputValue({
          employee_nationality: this?.employee_nationality?.value,
        });

        if (checkItems) {
          displayIndexSnackBar(checkItems, true);
        } else {
          const formData = new FormData(this);
          editEmployee(formData);
        }
      }
    });
  document
    .getElementById("add_leave_application_form")
    ?.addEventListener("submit", function (e) {
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
        closeOneModal("add_leave_application_modal");
        createLeaveApplication(formData);
        this.reset();
      }
    });

document.getElementById('edit_leave_application_form')?.addEventListener('submit', function(e){
  e.preventDefault();
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
    closeOneModal("edit_leave_application_modal");
    editLeaveApplication(formData);
  }
})
});

function createEmployeeAllergies(e) {
  const input_text = e.target.value;

  if (e.key === "Enter" || e.key == ",") {
    e.preventDefault();
    allergies.push(input_text);
    e.target.value = "";
    createInputArray(
      "employee_allergies_container",
      allergies,
      "employee_allergies",
      allergies_methods
    );
  } else if (e.key == "Backspace") {
    if (allergies.length && !input_text.length) {
      allergies.splice(allergies.length - 1, 1);
      createInputArray(
        "employee_allergies_container",
        allergies,
        "employee_allergies",
        allergies_methods
      );
    }
  }
}

function removeEmployeeAllergies(index) {
  allergies.splice(index, 1);
  createInputArray(
    "employee_allergies_container",
    allergies,
    "employee_allergies",
    allergies_methods
  );
}

function createContactItem() {
  const name = document.getElementById("add_contact_name");
  const relation = document.getElementById("add_contact_relation");
  const phone = document.getElementById("add_contact_phone");
  const address = document.getElementById("add_contact_address");
  const email = document.getElementById("add_contact_email");

  if (
    name.value &&
    relation.value &&
    phone.value &&
    address.value &&
    email.value
  ) {
    const emergency_item = {
      name: name.value,
      relation: relation.value,
      phone: phone.value,
      email: email.value,
      address: address.value,
    };
    emergency_contacts.push(emergency_item);
    const input_types = { default_value: "", default_object: contact_body };
    createSpreadSheetTable(
      emergency_contact_body,
      emergency_contacts,
      emergency_annotation,
      emergency_methods,
      input_types
    );
  } else {
    displayIndexSnackBar("Please input all emergency details", true);
  }
}

function removeContactItem(index) {
  emergency_contacts.splice(index, 1);
  const input_types = { default_value: "", default_object: contact_body };
  createSpreadSheetTable(
    emergency_contact_body,
    emergency_contacts,
    emergency_annotation,
    emergency_methods,
    input_types
  );
}

function initEditContactItem(index) {
  const contact_item = emergency_contacts.splice(index, 1);
  const input_types = {
    default_value: contact_item[0],
    default_object: contact_body,
  };
  createSpreadSheetTable(
    emergency_contact_body,
    emergency_contacts,
    emergency_annotation,
    emergency_methods,
    input_types
  );
}

function createKinItem() {
  const name = document.getElementById("add_kin_name");
  const relation = document.getElementById("add_kin_relation");
  const phone = document.getElementById("add_kin_phone");
  const address = document.getElementById("add_kin_address");
  const email = document.getElementById("add_kin_email");

  if (
    name.value &&
    relation.value &&
    phone.value &&
    address.value &&
    email.value
  ) {
    const kin_item = {
      name: name.value,
      relation: relation.value,
      phone: phone.value,
      email: email.value,
      address: address.value,
    };
    kin_contacts.push(kin_item);
    const input_types = { default_value: "", default_object: contact_body };
    createSpreadSheetTable(
      kin_contact_body,
      kin_contacts,
      kin_annotation,
      kin_methods,
      input_types
    );
  } else {
    displayIndexSnackBar("Please input all kin details", true);
  }
}

function removeKinItem(index) {
  kin_contacts.splice(index, 1);
  const input_types = { default_value: "", default_object: contact_body };
  createSpreadSheetTable(
    kin_contact_body,
    kin_contacts,
    kin_annotation,
    kin_methods,
    input_types
  );
}

function initEditKinItem(index) {
  const kin_item = kin_contacts.splice(index, 1);
  const input_types = {
    default_value: kin_item[0],
    default_object: contact_body,
  };
  createSpreadSheetTable(
    kin_contact_body,
    kin_contacts,
    kin_annotation,
    kin_methods,
    input_types
  );
}

function createAcademicQualification() {
  const { prefix } = academic_annotation;
  const name = document.getElementById(`${prefix}_name`);
  const level = document.getElementById(`${prefix}_level`);
  const grade = document.getElementById(`${prefix}_grade`);
  const start = document.getElementById(`${prefix}_start`);
  const end = document.getElementById(`${prefix}_end`);

  if (name.value && level.value && grade.value && start.value && end.value) {
    const academic_item = {
      name: name.value,
      level: level.value,
      grade: grade.value,
      start: start.value,
      end: end.value,
    };
    academic_qualifications.push(academic_item);
    const input_types = {
      default_value: "",
      default_object: academic_object,
    };
    createSpreadSheetTable(
      academic_body,
      academic_qualifications,
      academic_annotation,
      academic_methods,
      input_types
    );
  } else {
    displayIndexSnackBar("Please input all academic qualifications", true);
  }
}

function removeAcademicItem(index) {
  academic_qualifications.splice(index, 1);
  const input_types = {
    default_value: "",
    default_object: academic_object,
  };
  createSpreadSheetTable(
    academic_body,
    academic_qualifications,
    academic_annotation,
    academic_methods,
    input_types
  );
}

function initEditAcademicItem(index) {
  const academic_item = academic_qualifications.splice(index, 1);
  const input_types = {
    default_value: academic_item[0],
    default_object: academic_object,
  };
  createSpreadSheetTable(
    academic_body,
    academic_qualifications,
    academic_annotation,
    academic_methods,
    input_types
  );
}

function createProfessionalQualification() {
  const { prefix } = professional_annotation;
  const name = document.getElementById(`${prefix}_name`);
  const institution = document.getElementById(`${prefix}_institution`);
  const level = document.getElementById(`${prefix}_level`);
  const grade = document.getElementById(`${prefix}_grade`);
  const start = document.getElementById(`${prefix}_start`);
  const end = document.getElementById(`${prefix}_end`);

  if (
    name.value &&
    institution.value &&
    level.value &&
    grade.value &&
    start.value &&
    end.value
  ) {
    const profession_item = {
      name: name.value,
      institution: institution.value,
      level: level.value,
      grade: grade.value,
      start: start.value,
      end: end.value,
    };
    professional_qualifications.push(profession_item);
    const input_types = {
      default_value: "",
      default_object: professional_object,
    };
    createSpreadSheetTable(
      professional_body,
      professional_qualifications,
      professional_annotation,
      professional_methods,
      input_types
    );
  } else {
    displayIndexSnackBar("Please input all academic qualifications", true);
  }
}

function removeProfessionItem(index) {
  professional_qualifications.splice(index, 1);
  const input_types = {
    default_value: "",
    default_object: professional_object,
  };
  createSpreadSheetTable(
    professional_body,
    professional_qualifications,
    professional_annotation,
    professional_methods,
    input_types
  );
}

function initEditProfessionItem(index) {
  const profession_item = professional_qualifications.splice(index, 1);
  const input_types = {
    default_value: profession_item[0],
    default_object: professional_object,
  };
  createSpreadSheetTable(
    professional_body,
    professional_qualifications,
    professional_annotation,
    professional_methods,
    input_types
  );
}

function createWorkHistory() {
  const { prefix } = employement_annotation;
  const name = document.getElementById(`${prefix}_name`);
  const address = document.getElementById(`${prefix}_address`);
  const position = document.getElementById(`${prefix}_position`);
  const start = document.getElementById(`${prefix}_start`);
  const end = document.getElementById(`${prefix}_end`);
  const reason = document.getElementById(`${prefix}_reason`);

  if (
    name.value &&
    address.value &&
    position.value &&
    start.value &&
    end.value &&
    reason.value
  ) {
    const history_item = {
      name: name.value,
      address: address.value,
      position: position.value,
      start: start.value,
      end: end.value,
      reason: reason.value,
    };
    employement_history.push(history_item);
    const input_types = {
      default_value: "",
      default_object: employement_object,
    };
    createSpreadSheetTable(
      employement_body,
      employement_history,
      employement_annotation,
      employement_methods,
      input_types
    );
  } else {
    displayIndexSnackBar("Please input all academic qualifications", true);
  }
}

function initEditWorkHistory(index) {
  const history_item = employement_history.splice(index, 1);
  const input_types = {
    default_value: history_item[0],
    default_object: employement_object,
  };
  createSpreadSheetTable(
    employement_body,
    employement_history,
    employement_annotation,
    employement_methods,
    input_types
  );
}

function removeWorkHistory(index) {
  employement_history.splice(index, 1);
  const input_types = {
    default_value: "",
    default_object: employement_object,
  };
  createSpreadSheetTable(
    employement_body,
    employement_history,
    employement_annotation,
    employement_methods,
    input_types
  );
}

async function getSeniorityDrop(position_id) {
  isLoading(true);
  try {
    const { seniorities } = await fetchSeniorityEntries(position_id);
    createSelectElements(
      document.getElementById("employee_job_seniority"),
      seniorities,
      "-- Select Seniority --"
    );
    isLoading(false);
  } catch (error) {
    isLoading(false);
    displayIndexSnackBar("Could not fetch cities try again", true);
  }
}

async function viewJobDetails(e) {
  isLoading(true);

  try {
    const { departments } = await fetchDepartments();
    createSelectElements(
      document.getElementById("employee_job_department"),
      departments,
      " -- Select Department --",
      document.getElementById("employee_job_department").value
    );

    const { positions } = await fetchPositions();
    const position_id = document.getElementById("employee_job_position").value;
    createSelectElements(
      document.getElementById("employee_job_position"),
      positions,
      " -- Select Position --",
      position_id
    );

    const { leave_groups } = await fetchEmployeeLeaveGroups();
    createSelectElements(
      document.getElementById("employee_leave_group"),
      leave_groups,
      "-- Select Leave Group --",
      document.getElementById("employee_leave_group").value
    );

    if (position_id) {
      const { seniorities } = await fetchSeniorityEntries(position_id);
      createSelectElements(
        document.getElementById("employee_job_seniority"),
        seniorities,
        "-- Select Seniority --",
        document.getElementById("employee_job_seniority").value
      );
    }

    const { branches } = await fetchBranches();
    createSelectElements(
      document.getElementById("employee_job_branch"),
      branches,
      " -- Select Branch --",
      document.getElementById("employee_job_branch").value
    );

    const { pay_grades } = await fetchPayGrades();
    createSelectElements(
      document.getElementById("employee_job_paygrade"),
      pay_grades,
      " -- Select Paygrade --",
      document.getElementById("employee_job_paygrade").value
    );

    isLoading(false);
  } catch (error) {
    isLoading(false);
    displayIndexSnackBar("Could not job details try again", true);
  }
}

async function viewEmployementInfo(e) {
  isLoading(true);
  try {
    const { countries } = await fetchCountries();
    createSelectElements(
      document.getElementById("employee_passport_issue_country"),
      countries,
      "-- Select Country Issued --",
      document.getElementById("employee_passport_issue_country").value
    );
    createSelectElements(
      document.getElementById("employee_nationality"),
      countries,
      "-- Select Country Issued --",
      document.getElementById("employee_nationality").value
    );

    isLoading(false);
  } catch (error) {
    isLoading(false);
    displayIndexSnackBar("Could not job details try again", true);
  }
}

async function addEmployee(form_data) {
  isLoading(true);
  try {
    const emergency_json = JSON.stringify(emergency_contacts);
    const kin_json = JSON.stringify(kin_contacts);
    const academic_json = JSON.stringify(academic_qualifications);
    const professional_json = JSON.stringify(professional_qualifications);
    const employement_json = JSON.stringify(employement_history);
    const allergies_json = JSON.stringify(allergies);

    form_data.append("emergency_contacts", emergency_json);
    form_data.append("kin_contacts", kin_json);
    form_data.append("academic_qualifications", academic_json);
    form_data.append("professional_qualification", professional_json);
    form_data.append("employment_history", employement_json);
    form_data.append("allergies", allergies_json);
    const response = await fetch("employee_api_view", {
      method: "POST",
      body: form_data,
    });
    const { message } = await response.json();
    isLoading(false);
    displayIndexSnackBar(message, false);
    setTimeout(() => window.location.assign("/view_employees"), 2000);
  } catch (error) {
    isLoading(false);
    displayIndexSnackBar("Could not save emplyee details", true);
  }
}

async function addLeave(form_data) {
  isLoading(true)
}

async function editEmployee(form_data) {
  isLoading(true);

  try {
    const emergency_json = JSON.stringify(emergency_contacts);
    const kin_json = JSON.stringify(kin_contacts);
    const academic_json = JSON.stringify(academic_qualifications);
    const professional_json = JSON.stringify(professional_qualifications);
    const employement_json = JSON.stringify(employement_history);
    const allergies_json = JSON.stringify(allergies);

    form_data.append("emergency_contacts", emergency_json);
    form_data.append("kin_contacts", kin_json);
    form_data.append("academic_qualifications", academic_json);
    form_data.append("professional_qualification", professional_json);
    form_data.append("employment_history", employement_json);
    form_data.append("allergies", allergies_json);
    const response = await fetch("edit_employee_api", {
      method: "POST",
      body: form_data,
    });
    const { message } = await response.json();
    isLoading(false);
    displayIndexSnackBar(message, false);
    setTimeout(() => window.location.assign("/view_employees"), 2000);
  } catch (error) {
    console.log(error);
    isLoading(false);
    displayIndexSnackBar("Could not save emplyee details", true);
  }
}


// //! Leave applications !//

async function viewLeaveApplications(employee_id) {
  isLoading(true);
  try {
    const { leave_applications } = await fetchEmployeeLeaveApplications(
      employee_id,
      { method: "GET" }
    );
    leave_application_array = leave_applications?.map((leave_item, index) => {
      return leaveApplicationItem(leave_item, index)
    });
    createSpreadSheetTable(
      leave_application_body,
      leave_application_array,
      leave_annotations,
      leave_methods
    );
    isLoading(false);
  } catch (error) {
    console.log(error);
    isLoading(false);
    displayIndexSnackBar("Could not fetch Leave application information");
  }
}

async function viewLeaveApplication(index) {
  isLoading(true);
try {
  const view_appication = leave_application_array?.filter((item, t_index)=> index==t_index)[0]
  if(view_appication){
    const {leave_application} = await fetchLeaveApplicationView(view_appication?.id)
    console.log(leave_application);
    toogleEmployeeLeaveView()
    isLoading(false)
  }
} catch (error) {
  console.log(error);
  isLoading(false);
}

}

function setUpViewLeaveApplication(leave_application) {
  Object.keys(leave_application).map((key) => {

  })
}

function toogleEmployeeLeaveView() {
  const leave_applicaion_table = document.getElementById('leave_application_table')
    const leave_application_view = document.getElementById('leave_application_view')

    leave_applicaion_table?.classList?.toggle('employee_permist_visibility')
    leave_application_view?.classList?.toggle('employee_permist_visibility')
}

async function initEditLeaveApplication(index) {
  isLoading(true)
 try {
  const edit_appication = leave_application_array?.filter((item, t_index)=> index==t_index)[0]
  if(edit_appication) {
  const {leave_application} = await fetchLeaveApplicationView(edit_appication?.id)
   const leave_form = document.getElementById('edit_leave_application_form')
   leave_form.id.value = leave_application?.id
   leave_form.return_date.value =formatInputDate(leave_application?.return_date)
   leave_form.leave_date.value= formatInputDate(leave_application?.leave_date)
   leave_form.leave_type.value = leave_application?.leave_type
   leave_form.reason.value = leave_application?.reason
   isLoading(false)
   openModal('edit_leave_application_modal')
   leave_edit_index = index
  }
 } catch (error) {
   isLoading(false)
   displayIndexSnackBar("Could not fetch leave information", true)
   console.log(error);
 }
}

async function deleteLeaveApplication(index) {
  isLoading(true)
  try {
    const del_application = leave_application_array?.filter((item, t_index)=> index==t_index)[0]

    if(del_application) {
      const response = await fetch(`delete_leave_application?leave_id=${del_application?.id}`, {method:'GET'})
    const {message} = await response.json()
    if(response.status == 200) {
      displayIndexSnackBar(message, false)
      leave_application_array.splice(index??0, 1);
    leave_application_array.forEach(((l_item, index)=> {
      l_item.index = index +1
    }))
    createSpreadSheetTable(
      leave_application_body,
      leave_application_array,
      leave_annotations,
      leave_methods
    );
    }else {
      displayIndexSnackBar(message, true)
    }
    }
    isLoading(false)
  } catch (error) {
    console.log(error);
    isLoading(false)
    displayIndexSnackBar("Could not delete leave application")
  }
}

async function createLeaveApplication(form_data) {
  isLoading(true);
  try {
    const response = await fetch("view_leave_applications_api", {
      method: "POST",
      body: form_data,
    });
    isLoading(false);

    if (response.status == 200) {
      const { message, leave_application } = await response.json();
      const leave_body = leaveApplicationItem(leave_application, 1)
      displayIndexSnackBar(message, false);

      leave_application_array.splice(0, 0, leave_body);
      leave_application_array.forEach(((l_item, index)=> {
        l_item.index = index +1
      }))
      createSpreadSheetTable(
        leave_application_body,
        leave_application_array,
        leave_annotations,
        leave_methods
      );
    }else{
      const {error} = await response.json();
      displayIndexSnackBar(error, true);
    }

  } catch (error) {
    console.log(error);
    isLoading(false);
    displayIndexSnackBar("Could not save leave application", true);
  }
}

async function editLeaveApplication(form_data) {
  isLoading(false);
  try {
    const response = await fetch('view_leave_application_api', {
      method: "POST",
      body: form_data
    })
    const {message, leave_application} = await response.json();
    const leave_body = leaveApplicationItem(leave_application, 1)
    displayIndexSnackBar(message, false)
    isLoading(false);
    leave_application_array.splice(leave_edit_index??0, 1, leave_body);
    leave_application_array.forEach(((l_item, index)=> {
      l_item.index = index +1
    }))
    createSpreadSheetTable(
      leave_application_body,
      leave_application_array,
      leave_annotations,
      leave_methods
    );
  } catch (error) {
    isLoading(false);
    displayIndexSnackBar("Could not update leave application", true);
  }
}

function leaveApplicationItem(leave_application, index) {
  const {leave_type,  employee, leave_date, return_date, approved, id } = leave_application
  return {index: index, type: leave_type, applicant: employee?.name, leave_date: leave_date, return_date: return_date, status:approved, no_days: getDifferenceInDays(leave_date, return_date),id}
}
