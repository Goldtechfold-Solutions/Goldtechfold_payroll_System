window.addEventListener("DOMContentLoaded", () => {
  document.getElementById('add_leave_types_form')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);


    formData.set('probation_eligibility', this.probation_eligibility.checked ? true : false)
    formData.set('exclude_holiday', this.exclude_holiday.checked ? true : false)
    formData.set('exclude_off', this.exclude_off.checked ? true : false)
    // start_date =  formData.set('start_date');
    // end_date = formData.set('end_date');
    // days_taken = formData.set('days_taken');

    // days_taken = getDifferenceInDays(end_date, start_date);

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
    if (checkcomplete) {
      isLoading(true);
      try {
        const response = await fetch('/add_leave_types', {
          method: 'POST',
          body: formData,
        })
        isLoading(false)
        if (response.status == 200) {
          const { message, leave_type } = await response.json()
          displayIndexSnackBar(message, false)
          this.reset()
          addLeaveTable(leave_type)
        } else {
          const { message } = await response.json()
          displayIndexSnackBar(message, true)
        }
      } catch (error) {
        print(error)
        isLoading(false)
        displayIndexSnackBar("Something went wrong", true)
      }
    }
  })

  document.getElementById('apply_leave_form')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    console.log(formData)
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

    if (checkcomplete) {
      isLoading(true);
      try {
        const response = await fetch('/apply_for_leave', {
          method: 'POST',
          body: formData,
        })
        console.log(response)
        isLoading(false)
        if (response.status == 200) {
          const { message} = await response.json()
          displayIndexSnackBar(message, false)
          // this.reset()
          // window.location.assign('/view_leaves')
        } else {
          const { message } = await response.json()
          displayIndexSnackBar(message, true)
        }
      } catch (error) {
        console.log(error)
        isLoading(false)
        displayIndexSnackBar("Something went wrong", true)
      }
    }
  })

  document
  .getElementById("edit_leave_form")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

      const checkItems = checkInputValue({
        employee: this?.salutation?.value,
        default_group: this?.default_group?.value,
        days_taken: this?.days_taken?.value,
        annual_leave: this?.annual_leave?.value,
        probation_eligibility: this?.probation_eligibility?.value,
        leave_group: this?.leave_group?.value,
        comment: this?.comment?.value,
      });

      if (checkItems) {
        displayIndexSnackBar(checkItems, true);
      }

  });

  document.getElementById('id_national_id')?.addEventListener('change', async function(e) {
    let employee_id = e.target.value
   if (employee_id) {
    isLoading(true)
    try {
      let {leave_types} = await fetchGroupLeaveTypes(employee_id)
      isLoading(false)
      console.log(leave_types);
    } catch (error) {
      isLoading(false)
      console.log(error);
      displayIndexSnackBar("Could not fetch leave type", true)
    }
   }
  })
})

function openEditLeaveTypeModal(leave_types) {
  const edit_form = document.getElementById('edit_leave_types_form')

  document.getElementById('edit_leave_types_id').value = leave_type.id
  edit_form.name.value = leave_types.name
  edit_form.leave_days.value = leave_types.leave_days
  edit_form.leave_days.value = `${leave_group.leave_days_count}`

  openModal('edit_leave_modal')
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
    displayIndexSnackBar("Could not fetch leave types details", true)
  }
}



async function createLeaveType(form_data) {
  isLoading(true);
  try {
    const response = await fetch("view_leave_types_api", {
      method: "POST",
      body: form_data,
    });
    isLoading(false);

    if (response.status === 200) {
      const { message, leave_application } = await response.json();
      const leave_body = leaveApplicationItem(leave_application, 1)
      displayIndexSnackBar(message, false);

      leave_application_array.splice(0, 0, leave_body);
      leave_application_array.forEach(((l_item, index) => {
        l_item.index = index + 1
      }))
      createSpreadSheetTable(
        leave_application_body,
        leave_application_array,
        leave_annotations,
        leave_methods
      );
    } else {
      const { error } = await response.json();
      displayIndexSnackBar(error, true);
    }

  } catch (error) {
    console.log(error);
    isLoading(false);
    displayIndexSnackBar("Could not save leave type", true);
  }
}

async function deleteLeaveBody(id) {
  console.log(id);
}

async function initEditLeaveBody(id) {
  console.log(id);
}

function addLeaveTable(leave_type) {
  const t_body = document.getElementById('leave_type_body')
  if (t_body) {
    const tr = document.createElement('tr')
    tr.innerHTML = `
    <td>${leave_type.leave_code}</td>
    <td>${leave_type.leave_title}</td>
    <td>${leave_type.leave_days}</td>
    <td>${leave_type.gender}</td>
    <td>${leave_type.pay_rate}</td>
    <td>${leave_type.exclude_holiday}</td>
    <td>${leave_type.exclude_off}</td>

    <td>
      <button type="button" class="btn btn-icon" title="Edit" onclick="initEditLeaveBody(${leave_type.id})"><i class="fa fa-edit"></i></button>
      <button type="button" class="btn btn-icon" title="Edit" onclick="deleteLeaveBody(${leave_type.id})"><i class="fa fa-trash-o text-danger"></i></button>
  </td>
    `
    t_body.prepend(tr)
  }
}


async function deleteLeaveType(index) {
  isLoading(true)
  try {
    const del_application = leave_application_array?.filter((item, t_index)=> index==t_index)[0]

    if(del_application) {
      const response = await fetch(`leave_type?leave_id=${del_application?.id}`, {method:'GET'})
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
