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

function displayModalSnackBar(message, danger) {
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

function displayEditModalSnackBar(message, danger) {
  var x = document.getElementById("edit_dialog_snackbar");
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

function openModal(element_id) {
  var myModal = new bootstrap.Modal(document.getElementById(element_id));
  myModal.show();
}

function closeOneModal(modalId) {
  // get modal
  const modal = document.getElementById(modalId);

  // change state like in hidden modal
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("style", "display: none");

  // get modal backdrop
  const modalBackdrops = document.getElementsByClassName("modal-backdrop");

  // remove opened modal backdrop
  document.body.removeChild(modalBackdrops[0]);
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

function createTableRow(item, row_id, action, methods, input_values) {
  const tr = document.createElement("tr");
  if (row_id) tr.id = row_id;
  const td_items = Object.keys(item).map((key) => {
    const td = document.createElement("td");
    if (action === "add") {
      const { value, prefix } = input_values;
      const id = `${prefix}_${key}`;
      if(item[key] === 'textarea'){
        td.innerHTML = `
        <textarea class="form-control" type='text' name='${id}' id='${id}'  placeholder='Please enter ${key}'>${
          value ? value[key] : ""
        }</textarea>
        `;
      }else {
        td.innerHTML = `
        <input class="form-control" type='${item[key]}' name='${id}' id='${id}'  value='${
          value ? value[key] : ""
        }' placeholder='Please enter ${key}' />
        `;
      }
    } else {
      td.innerHTML = item[key];
    }

    return td;
  });

  tr.append(...td_items);
  if (action === "add") {
    const { addMethod } = methods;
    const td = document.createElement("td");
    td.innerHTML = `
    <button type="button" onclick='${addMethod}' class="btn btn-primary btn-icon" title="Add"><i class="fa fa-plus"></i> ${
      input_values?.value ? "Edit" : "Add"
    }</button>
    `;
    tr.appendChild(td);
  } else if(methods) {
    const { editMethod, deleteMethod, viewMethod } = methods;
    const td = document.createElement("td");
    td.classList.add('d-flex')
    td.innerHTML = `
          ${viewMethod? `<button type="button" onclick="${viewMethod}" class="btn btn-icon" title="Edit"><i class="fa fa-eye"></i></button>`:''}
           <button type="button" onclick="${editMethod}" class="btn btn-icon" title="Edit"><i class="fa fa-edit"></i></button>
            <button type="button" onclick="${deleteMethod}" class="btn btn-icon" title="Edit"><i class="fa fa-trash-o text-danger"></i></button>
    `;
    tr.appendChild(td);
  }

  return tr;
}


function createSpreadSheetTable(element, list, annotations, methods, input_types) {
  const {prefix, suffix} = annotations
  const row_body = document.getElementById(element);
  while (row_body.firstChild) {
    row_body.removeChild(row_body.firstChild);
  }

  const length = list.length;

  for (let i = 0; i < length; i++) {
    const {id, ...contact} = list[i];
    const tr = createTableRow(contact, `${i}_${suffix}`, "view", methods? {
      editMethod: `${methods?.editMethod}(${i})`,
      deleteMethod: `${methods?.deleteMethod}(${i})`,
      viewMethod: methods?.viewMethod?`${methods?.viewMethod}(${i})`:""
    }:"");
    row_body.appendChild(tr);
  }

  if(methods && input_types) {
    const {default_value, default_object} = input_types

    const add_tr = createTableRow(
      default_object,
      `${length}_${suffix}`,
      "add",
      { addMethod: `${methods?.addMethod}()` },
      { value: default_value, prefix: prefix }
    );

    row_body.appendChild(add_tr);
  }
}

function createSelectElements(element, list, placeHolder, default_value) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  if (placeHolder) {
    const first_row = document.createElement("option");
    first_row.value = "";
    first_row.innerHTML = placeHolder;
    element.appendChild(first_row);
  }

  for (let i = 0; i < list.length; i++) {
    const group = list[i];

    const row = document.createElement("option");
    row.value = group.id;
    row.innerHTML = group.name;
    if (default_value === group.id) {
      row.selected = "selected";
    }
    element.appendChild(row);
  }
}


function getSelectedTabId(){
  const tabs = document.getElementsByClassName('tab_panes')
  let active_tab = ''

  for (let i = 0; i < tabs.length; i++) {
    const element = tabs[i];
    if(element.classList.contains('active')){
      active_tab = element
    }
  }
  return active_tab.id
}

function addCurrentTab(id) {
  removeCurrentTab()
  const tab = document.getElementById(id)
  const tab_pane = getTabPane(tab)
  tab.classList.add('active', 'show')
  tab_pane.classList.add('active', 'show')
}

function removeCurrentTab() {
  const tabs = document.getElementsByClassName('tab_panes')


  for (let i = 0; i < tabs.length; i++) {
    const element = tabs[i];
    if(element.classList.contains('active')){
      element.classList.remove('active', 'show')
      const tab_pane = getTabPane(element)

      if (tab_pane)
        tab_pane.classList.remove('active', 'show')
    }
  }
}

function checkInputValue(inputs) {
  let check = ''
  Object.keys(inputs).forEach(function(key) {

    if(!inputs[key]){
      check = `Please input ${removeUnderScore(key)}`
      return `Please input ${removeUnderScore(key)}`
    }
  });
  return check
}

function getTabPane(element) {
  const tab_pane_str = element.getAttribute('href')
  const tab_pane_id = tab_pane_str.replace(/#/g,'')
  return document.getElementById(tab_pane_id)
}

function removeUnderScore(item){
  let newStr = item.replace(/_/g, " ");
  return newStr
}

function createInputArray(element_id, list, suffix, methods) {
  const element = document.getElementById(element_id)
  const {remove, create} = methods
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for (let i = 0; i < list.length; i++) {
    const li = document.createElement('li')
    li.id = `${i}__${suffix}`
    li.setAttribute('onclick', `${remove}(${i})`)
    li.innerHTML = `
    ${list[i]}
    <span>
      <i class="fa fa-close ml-2 text-danger"></i>
    </span>
    `
    element.appendChild(li)
  }
  const input = document.createElement('input')
  input.id = `${list.length}_${suffix}`
  input.setAttribute('onkeydown', create)
  element.appendChild(input)
  input.focus()
}

function createViewInputArray(element_id, list, suffix) {
  const element = document.getElementById(element_id)
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for (let i = 0; i < list.length; i++) {
    const li = document.createElement('li')
    li.id = `${i}__${suffix}`
    li.innerHTML = `
    ${list[i]}
    `
    element.appendChild(li)
  }
}

function formatDate(mdate) {
  var date = new Date(mdate);
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + "," + " " + day + " " + year;
}

function formatInputDate(mdate) {
  var date = new Date(mdate);

  var day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  var monthIndex = date.getMonth() + 1;
  var month = monthIndex < 10 ? `0${monthIndex}` : monthIndex;
  var year = date.getFullYear();

  return year + "-" + month + "-" + day;
}

function getDifferenceInDays(date1, date2){
  const diffInMs = Math.abs(new Date(date2) - new Date(date1));
  return diffInMs / (1000 * 60 * 60 * 24);
}

function getDifferenceInHours(date1, date2){
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60);
}

function getDifferenceInMinutes(date1, date2){
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60);
}

function getDifferenceInSeconds(date1, date2){
  const diffInMs = Math.abs(date2- date1);
  return diffInMs / 1000;
}
