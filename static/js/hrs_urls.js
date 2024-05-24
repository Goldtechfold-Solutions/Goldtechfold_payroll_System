async function fetchDepartments() {
    const response = await fetch('company_departments_api',{method:'GET'})
    return response.json()
}

async function fetchPositions() {
    const response = await fetch('positions_details_api', {method:'GET'})
    return response.json()
}

async function fetchPositionDetails(id){
    const response = await fetch(`/fetch_position_details?position_id=${id}`, {method:'GET'})
    return response.json()
}

async function fetchSeniorityEntries(position_id){
  let url = position_id? `seniority_api?position_id=${position_id}`:'seniority_api'
  const response = await fetch(url, {method:'GET'})
  return response.json()
}

async function fetchBranches() {
    const response = await fetch('company_branches_api', {method:'GET'})
    return response.json()
}

async function fetchCountries(){
    const response = await fetch('view_countries_api', {method:'GET'})
    return response.json();
  }
  
  async function fetchCities(country_id){
    const response = await fetch(`view_cities_api?country_id=${country_id}`, {method:'GET'})
    return response.json();
  }
  
  async function fetchEmployees() {
    const response = await fetch('employee_api_view', {method:'GET'})
    return response.json();
  }

  async function fetchPayGrades() {
    const response = await fetch('fetch_pay_grade_api', {method:'GET'})
    return response.json();
  }

  async function fetchEmployeeLeaveGroups() {
    const response = await fetch('leave_groups_api', {method: "GET"})
  
    return response.json()
  }
  
  async function fetchEmployeeLeaveApplications(employee_id) {
    const response = await fetch(`leave_applications_api?employee_id=${employee_id}`, {method:'GET'})
  
    return response.json()
  }

  async function fetchLeaveApplicationView(leave_id) {
    const response = await fetch(`view_leave_application_api?leave_id=${leave_id}`, {method:'GET'})

    return response.json()
  }

  async function fetchGroupLeaveTypes(employee_id) {
    const response = await fetch(`group_leave?employee_id=${employee_id}`, {method: 'GET'})

    return response.json()
  }