// var Paye_rates = [];
// const paye_rates_body = "paye_rate";
// const paye_rates_annotation = { suffix: "paye_rate_row", prefix: "add_paye_rate" };
// const paye_rates_methods = {
//   editMethod: "initEditPayeRateItem",
//   deleteMethod: "removePayeRateItem",
//   addMethod: "createPayeRateItem",
// };
// const paye_rate_objects = {
//     from: "text",
//     to: "text",
//     rate: "text",
//     // grade: "text",
//     // start: "date",
//     // end: "date",
//   };

// window.addEventListener("DOMContentLoaded", ()=> {
//     try{
//         if (Paye_rates) {
//             Paye_rates = Paye_rates?.map((paye_rate_item) => {
//             return {
//                 from: paye_rate_item.amount_from,
//                 to: paye_rate_item.amount_to,
//                 rate: paye_rate_item.rate,
//                 // email: paye_rate_item.email,
//                 // address: paye_rate_item.address,
//             };
//             });
//             const input_types = { default_value: "", default_object: paye_rate_objects };
//             createSpreadSheetTable(
//                 paye_rates_body,
//                 Paye_rates,
//                 paye_rates_annotation,
//                 paye_rates_methods,
//                 input_types
//             );
//         }
//     }catch(errors){
//         console.log(errors);
//     }


//     function createPayeRateItem() {
//         const from = document.getElementById("add_paye_rate_id_amount_from");
//         const to = document.getElementById("add_paye_rate_id_amount_to");
//         const rate = document.getElementById("add_paye_rate_id_rate");
//         // const year = document.getElementById("add_paye_rate_year");
//         // const email = document.getElementById("add_kin_email");

//         if (
//           from.value &&
//           to.value &&
//           rate.value &&
//           year.value
//         ) {
//           const paye_rate_item = {
//             name: from.value,
//             relation: to.value,
//             phone: rate.value,
//             // address: address.value,
//           };
//           Paye_rates.push(paye_rate_item);
//           const input_types = { default_value: "", default_object: contact_body };
//           createSpreadSheetTable(
//             paye_rates_body,
//             Paye_rates,
//             paye_rates_annotation,
//             paye_rates_methods,
//             input_types
//           );
//         } else {
//           displayIndexSnackBar("Please input all Paye rate details", true);
//         }
//       }

//       function removePayeRateItem(index) {
//         Paye_rates.splice(index, 1);
//         const input_types = { default_value: "", default_object: contact_body };
//         createSpreadSheetTable(
//             paye_rates_body,
//             Paye_rates,
//             paye_rates_annotation,
//             paye_rates_methods,
//             input_types
//         );
//       }

//       function initEditPayeRateItem(index) {
//         const paye_rates_item = Paye_rates.splice(index, 1);
//         const input_types = {
//           default_value: paye_rates_item[0],
//           default_object: contact_body,
//         };
//         createSpreadSheetTable(
//             paye_rates_body,
//             Paye_rates,
//             paye_rates_annotation,
//             paye_rates_methods,
//             input_types
//         );
//       }


//   document
//   .getElementById("AddPayeRateForm")
//   ?.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const formData = new FormData(this);
//     addPayeForm(formData)
//   });
// })

// async function addEmployee(form_data) {
//     isLoading(true);
//     try {
//       const Paye_rates_json = JSON.stringify(Paye_rates);

//       form_data.append("Paye_rates", Paye_rates_json);
//       const response = await fetch("/payroll_constant/add_paye_rate", {
//         method: "POST",
//         body: form_data,
//       });
//       const { message } = await response.json();
//       isLoading(false);
//       displayIndexSnackBar(message, false);
//       setTimeout(() => window.location.assign("/payroll_constant"), 2000);
//     } catch (error) {
//       isLoading(false);
//       displayIndexSnackBar("Could not save emplyee details", true);
//     }
//   }


// window.addEventListener("DOMContentLoaded", () => {
//     document.getElementById("add_payroll_form")
//         ?.addEventListener("submit", function (e) {
//             e.preventDefault();
//             const current_tab = getSelectedTabId()
//             if (current_tab = "technical_tab") {
//                 const checkItems = checkInputValue({
//                     payroll_month: this?.payroll_month?.value,
//                     payroll_year: this?.payroll_year?.value,
//                     pay_engagement: this?.pay_engagement?.value,
//                     monthly_hours: this?.monthly_hours?.value,
//                     permanent_contracts: this?.permanent_contracts?.value,
//                     monthly_days: this?.monthly_days?.value,
//                     pay_separation: this?.pay_separation?.value,
//                     interest_rate: this?.interest_rate?.value,
//                     training_levy: this?.training_levy?.value

//                 });

//                 if (checkItems) {
//                     displayIndexSnackBar(checkItems, true);
//                 } else {
//                     viewJobDetails(e);
//                     addCurrentTab("numbers_frame_tab");
//                 }
//             } else if (current_tab === "numbers_frame_tab") {
//                 const checkItems = checkInputValue({
//                     pin_no: this?.pin_no?.value,
//                     nhif_no: this?.nhif_no?.value,
//                     nssf_no: this?.nssf_no?.value,
//                     nita_no: this?.nita_no?.value,
//                     helb_no: this?.helb_no?.value,
//                 });
//                 if (checkItems) {
//                     displayIndexSnackBar(checkItems, true);
//                 } else {
//                     addCurrentTab("rates_frame_tab")
//                 }
//             } else if (current_tab === "rates_frame_tab") {
//                 const checkItems = checkInputValue({
//                     pin_no: this?.pin_no?.value,
//                     nhif_no: this?.nhif_no?.value,
//                     nssf_no: this?.nssf_no?.value,
//                     nita_no: this?.nita_no?.value,
//                     helb_no: this?.helb_no?.value,
//                 })
//             }
//         })
// })


var faqs_row = 0;

// function addfaqs() {
//     let html = '<tr id="faqs-row' + faqs_row + '">';
//     html += '<td><input type="text" class="form-control" placeholder="Earnings Code"></td>';
//     html += '<td><input type="text" placeholder="Earning Name" class="form-control"></td>';
//     html += '<td><input type="text" placeholder="Taxable" class="form-control"></td>';
//     html += '<td><input type="text" placeholder="Earning Type" class="form-control"></td>';
//     html += '<td><input type="text" placeholder="Non/Recur" class="form-control"></td>';
//     html += '<td><input type="text" placeholder="Calculation Factor" class="form-control"></td>';
//     html += '<td class="text-danger mt-10"> <i class="fa fa-edit"></i></td>';
//     html += '<td class="mt-10"><button class="badge badge-danger" onclick="$(\'#faqs-row' + faqs_row + '\').remove();"><i class="fa fa-trash"></i></button></td>';

//     html += '</tr>';

//     $('#faqs tbody').append(html);

//     faqs_row++;
// }


var faqs_row = 0;

// function addDeds() {
//     html = '<tr id="faqs-row' + faqs_row + '">';
//     html += '<td><input type="text" class="form-control" placeholder="Deduction Code"></td>';
//     html += '<td><input type="text" placeholder="Deduction Name" class="form-control"></td>';
//     html += '<td><input type="text" placeholder="After Tax" class="form-control"></td>';
//     html += '<td><input type="text" placeholder="Calc Factor" class="form-control"></td>';
//     html += '<td><input type="checkbox" placeholder="Non/Recur" class="form-control"></td>';
//     html += '<td><select name="Type Factor" placeholder="Time Factor" class="form-control">   <option value="perday">Per Day</option><option value="permonth">Per Month</option> <option value="peryear">Per Year</option></select></td>';
//     html += '<td class="text-danger mt-10"> <i class="fa fa-edit"></i></td>';
//     html += '<td class="mt-10"><button class="badge badge-danger" onclick="$(\'#faqs-row' + faqs_row + '\').remove();"><i class="fa fa-trash"></i></button></td>';

//     html += '</tr>';

//     $('#faqs tbody').append(html);

//     faqs_row++;
// }

//
// window.addEventListener("DOMContentLoaded", () => {
//     document.addEventListener("click", function (e) {
//         e.preventDefault();
//
//     })
// })

var tableRows = 0;

const csrftoken = getCookie('csrftoken')
function addBens() {

    html = '<tr id="row_' + tableRows + '">';
    html += '<td colspan="6"><form class="row" action="/benefits/add-benefit/" method="POST" id="id_benefits_' + tableRows + '">'
    html += '<input type="hidden" name="csrf_token" id="csrf_token__' + tableRows + '" value="'+csrftoken+'"  placeholder="Defined Value" class="form-control">';
    html += '<input type="text" class="col-3 form-control" id="benefit_' + tableRows + '" name="benefit" class="form-control" placeholder="Benefit Name">';
    html += '<input type="text"  class="col-3 form-control"  id="defined_' + tableRows + '" name="defined" placeholder="Defined Value" class="form-control">';
    html += '<input type="text"  class="col-3 form-control"  id="tax_' + tableRows + '" name="tax" placeholder="Tax on actual" class="form-control">';
    html += '<input type="checkbox" id="probability_' + tableRows + '" value="" name="probability" class="col-1 form-control">';
    html += '<input type="submit" class="col-1 btn btn-primary" value="Submit" onclick="saveChanges(tableRows-1)">';
    html += '<button class="badge col-1 badge-danger" onclick="$(\'#faqs-row' + tableRows + '\').remove();"><i class="fa fa-trash"></i></button>';
    html += '</form></td>'
    html += '</tr>';

    $('#faqs tbody').append(html);
    tableRows++;
}
function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
function saveChanges(formId) {
    // let formRow = document.getElementById("id_benefits_"+formId)
    console.log('reached formRow id', formId);
    let formData = new FormData();
    let benefit = document.getElementById(`benefit_${formId}`).value
    let defined = document.getElementById(`defined_${formId}`).value
    let tax = document.getElementById(`tax_${formId}`).value
    let probability = document.getElementById(`probability_${formId}`).value? "True" :'False';
    alert(probability)
    let csrftoken = document.getElementById(`csrf_token__${formId}`).value



    // const csrftoken = getCookie('csrftoken')

    formData.append('benefit', benefit)
    formData.append('defined', defined)
    formData.append('tax', tax)
    formData.append('probability', probability)
    formData.append('csrftoken', csrftoken)

    window.alert('request: '+ csrftoken)

    const request = new Request(
        '/benefits/add-benefit/',
        {headers: {'X-CSRFToken': csrftoken}}
    );

    fetch(request, {
        method: 'POST',
        // mode: 'same-origin',
        body: formData,
    }).then(response => response.json()).then(data => {
        console.log(data)
        alert('here')
    }).catch(errors => {
        console.log(errors)
    })

    const array__ = []
    for (let x of formData.entries()) {
        console.log(x[0], x[1]);
        array__.push(x[0], x[1])
    }

    console.log('reached array', array__);
    // fetch('/payroll_constant/add_paye_year', {
    //     method: 'POST',
    //     body: formData,
    // }).then(res => res.json()).then(response => {
    //     console.log(response);
    //     window.location.assign('/payroll_constant')
    // }).catch(error => {
    //     alert('Failed to add Paye Year')
    //     console.log(error);
    // })

}



(function () {
    let year_start = 2000;
    let year_end = (new Date()).getFullYear(); //Current year
    let year_selected = 2021;

    let option = '';
    option = '<option>Year</option>';

    for (let i = year_start; i <= year_end; i++) {
        let selected = (i === year_selected ? 'selected' : '')
        option += '<option value="' + i + '" ' + selected + ' >' + i + '</option>'
    }
    document.getElementById("year").innerHTML = option
})();


$('a[data-toggle="formtab"]').click(function () {
    var targetId = $(this).attr('href');

    $('.tabs-panels').removeClass('active')
    $('a[data-toggle="formtab"]').removeClass('active');

    $(targetId).addClass('active');
    $('a[href="' + targetId + '"]').addClass('active')

});

// var rateCategory = {
//     A: ["10%"],
//     B: ["25%"],
//     C: ["30%"],
//     D: ["35%"],
//     E: ["40%"]

// }

// function changecat(value) {
//     if (value.length === 0) document.getElementById("rate").innerHTML = "<option> </option>";
//     else {
//         var catOptions = "";
//         for (categoryId in rateCategory[value]) {
//             catOptions += "<option>" + rateCategory[value][categoryId] + "</option>"
//         }
//         document.getElementById("rate").innerHTML = catOptions;
//     }
// }





window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('apply_pension_form')?.addEventListener('submit', async function (e) {
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
                const response = await fetch('/apply_for_pension', {
                    method: 'POST',
                    body: formData,
                })
                console.log(response)
                isLoading(false)
                if (response.status === 200) {
                    const {message} = await response.json()
                    displayIndexSnackBar(message, false)
                    this.reset()
                    window.location.assign('/get_pension_rate')
                } else {
                    const {message} = await response.json()
                    displayIndexSnackBar(message, true)
                }
            } catch (error) {
                console.log(error)
                isLoading(false)
                displayIndexSnackBar("Something went wrong", true)
            }
        }
    })
})


window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('add_pension_calc')?.addEventListener('submit', async function (e) {
        e.preventDefault()
        const formData = new FormData(this);
        console.log(formData)
        const checkcomplete = true
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
            isLoading(true)
            try {
                const response = await fetch('/add_pension_calculation', {
                    method: 'POST',
                    body: formData,
                })
                console.log(response)
                isLoading(false)
                if (response.status = 200) {
                    const {message} = await response.json()
                    displayIndexSnackBar(message, false)
                } else {
                    const {message} = await response.json()
                    displayIndexSnackBar(message, true)
                }
            } catch (error) {
                console.log(error)
                isLoading(false)
                displayIndexSnackBar("Something went wrong", true)
            }
        }
    })

})


window.addEventListener('DomContentLoaded', ()=> {
    document.getElementById('add_earn_form')?.addEventListener('submit', async function(e){
           e.preventDefault()
           const formData = new FormData(this);
           console.log(formData)
           const checkcomplete = true;
    })
    {
            for(var pair of formData.entries()){
                   if(!pair[1]){
                       displayIndexSnackBar(`Please enter valueof ${pair[0]}`, true);
                       checkcomplete = false;
                       break;
                   } else {
                      checkcomplete = true
                   }
            }
            if(checkcomplete){
                isLoading(true)
                try{
                     const response = await fetch('/add_earn_view', {
                         method: 'POST',
                         body: formData,
                     })
                  console.log(response)
                  isLoading(false)
                  if(response.status == 200){
                      const {message} = response.json;
                      displayIndexSnackBar(message, false)
                  }else{
                      const {message} = response.json;
                      displayIndexSnackBar(message, true)

                  }
                }catch(error){
                    console.log(error);
                    isLoading(false)
                    displayIndexSnackBar("Something went wrong", true)
                }
            }
    }
})


window.addEventListener('DOMContentLoaded',()=> {
    document.getElementById('add_deductions_form')?.addEventListener('submit', async function(e){
        e.preventDefault()
        const formData = new FormData(this)
        console.log(formData)
        const checkcomplete = true;

    })
    {
    for (var pair of formData.entries()){
        if(!pair[1]){
            displayIndexSnackBar(`Please enter valueof ${pair[0]}`, true);
            checkcomplete = false;
            break;
        } else {
            checkcomplete = true;
        }
    }
        if(checkcomplete){
            isLoading(true)
            try{
                const response = await fetch('/add_deductions_view', {
                    method: 'POST',
                    body: formData,
                })
                console.log(response)
                isLoading(false)
                if(response.status == 200){

                const {message} = response.json;
                displayIndexSnackBar(message, false)
                } else {
                const {message} = response.json;
                displayIndexSnackBar(message, true)
                }
            }catch(error){
              console.log(error);
              isLoading(false)
              displayIndexSnackBar("Something went wrong", true)
            }
        }
    }
})


window.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('add_savings_form')?.addEventListener('submit', async function(e){
         e.preventDefault()
         const formData = new FormData(this)
         console.log(formData)
         const checkcomplete = true

    })
    {
        for(var pair of formData.entries()){
            if(!pair[1]){
                displayIndexSnackBar(`Please Enter a value of ${pair[0]}`, true);
                checkcomplete = false;
                break;
            }else{
                checkcomplete = true;
            }
        }
        if(checkcomplete){
            isLoading(true)
            try{
             const response = await fetch('/add_savings_view', {
                 method: 'POST',
                 body: formData
             })
             console.log(response)
             isLoading(true)
             if(response.status == 200){
                const {message} = response.json;
                displayIndexSnackBar(message, false)
             }else{
                const {message} = response.json;
                displayIndexSnackBar(message, true)
             }

            }catch(error){
                console.log(error)
                isLoading(false)
                displayIndexSnackBar("Something went wrong", true)
            }
        }
    }
})


window.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('add_loans_form')?.addEventListener('submit', async function(e){
         e.preventDefault()
         const formData = new FormData(this)
         console.log(formData)
         const checkcomplete = true

    })
    {
        for(var pair of formData.entries()){
            if(!pair[1]){
                displayIndexSnackBar(`Please Enter a value of ${pair[0]}`, true);
                checkcomplete = false;
                break;
            }else{
                checkcomplete = true;
            }
        }
        if(checkcomplete){
            isLoading(true)
            try{
             const response = await fetch('/add_loans_view', {
                 method: 'POST',
                 body: formData
             })
             if(response.status === 200){
                 const {message} = response.json;
                 displayIndexSnackBar(message, false)
             }else{
                 const {message} = response.json;
                 displayIndexSnackBar(message, true)
             }

            }catch(error){
                console.log(error)
                isLoading(false)
                displayIndexSnackBar("Something went wrong", true)
            }
        }
    }
})
