/*jshint strict:false */

window.addEventListener("DOMContentLoaded", () => {


  /*---------------------------------------------------------------------------*/
  /*Create Permissions*/
  /*---------------------------------------------------------------------------*/


  document.getElementById("permission_submit_btn")?.addEventListener("click", () => {
    isLoading(true);
    let group_name = document.getElementById("permissin_group_input")?.value;
    if (!group_name) {
      isLoading(false);
      displayIndexSnackBar("Please input permission group name", true);
      return;
    }
    let csrf_token = document.getElementById("permission_group_csrf")?.value;
    let permission_group_body = document.getElementById(
      "permission_group_body"
    );

    let organization_group_body = document.getElementById(
      "organization_group_body"
    );
    let hr_group_body = document.getElementById("hr_group_body");
    let payrol_group_body = document.getElementById("payrol_group_body");
    let leave_group_body = document.getElementById("leave_group_body");
    let time_group_body = document.getElementById("time_group_body");

    const permissions = {};
    const organization_permission = {};
    const hr_permissions = {};
    const payrol_permissions = {};
    const leave_permission = {};
    const time_permissions = {};
    for (let i = 0; i < permission_group_body?.childElementCount; i++) {
      const currentIndex = i + 1;

      const name = document.getElementById(`${currentIndex}_personnel_name`)?.value;
      const is_view = !!document.getElementById(`${currentIndex}_personnel_view`)?.checked;
      const is_edit = !!document.getElementById(`${currentIndex}_personnel_edit`)?.checked;
      const is_print = !!document.getElementById(`${currentIndex}_personnel_print`)?.checked;
      const is_export = !!document.getElementById(`${currentIndex}_personnel_export`)?.checked;
      const is_email = !!document.getElementById(`${currentIndex}_personnel_email`)?.checked;

      permissions[`${name}`] = {
        view: is_view,
        edit: is_edit,
        print: is_print,
        export: is_export,
        email: is_email,
      };
    }

    for (let i = 0; i < organization_group_body?.childElementCount; i++) {
      const currentIndex = i + 1;

      const name = document.getElementById(`${currentIndex}_organization_name`)?.value;

      const is_view = !!document.getElementById(`${currentIndex}_organization_view`)?.checked;
      const is_edit = !!document.getElementById(`${currentIndex}_organization_edit`)?.checked;
      const is_print = !!document.getElementById(`${currentIndex}_organization_print`)?.checked;
      const is_export = !!document.getElementById(`${currentIndex}_organization_export`)?.checked;
      const is_email = !!document.getElementById(`${currentIndex}_organization_email`)?.checked;


      organization_permission[`${name}`] = {
        view: is_view,
        edit: is_edit,
        print: is_print,
        export: is_export,
        email: is_email,
      };
    }

    for (let i = 0; i < hr_group_body?.childElementCount; i++) {
      const currentIndex = i + 1;
      const name = document.getElementById(`${currentIndex}_hr_name`)?.value;
      const is_view = !!document.getElementById(`${currentIndex}_hr_view`)
        ?.checked;
      const is_edit = !!document.getElementById(`${currentIndex}_hr_edit`)
        ?.checked;
      const is_print = !!document.getElementById(`${currentIndex}_hr_print`)
        ?.checked;
      const is_export = !!document.getElementById(`${currentIndex}_hr_export`)
        ?.checked;
      const is_email = !!document.getElementById(`${currentIndex}_hr_email`)
        ?.checked;

      hr_permissions[`${name}`] = {
        view: is_view,
        edit: is_edit,
        print: is_print,
        export: is_export,
        email: is_email,
      };
    }

    for (let i = 0; i < payrol_group_body?.childElementCount; i++) {
      const currentIndex = i + 1;
      const name = document.getElementById(
        `${currentIndex}_payrol_name`
      )?.value;
      const is_view = !!document.getElementById(`${currentIndex}_payrol_view`)
        ?.checked;
      const is_edit = !!document.getElementById(`${currentIndex}_payrol_edit`)
        ?.checked;
      const is_print = !!document.getElementById(
        `${currentIndex}_payrol_print`
      )?.checked;
      const is_export = !!document.getElementById(
        `${currentIndex}_payrol_export`
      )?.checked;
      const is_email = !!document.getElementById(
        `${currentIndex}_payrol_email`
      )?.checked;


      payrol_permissions[`${name}`] = {
        view: is_view,
        edit: is_edit,
        print: is_print,
        export: is_export,
        email: is_email,
      };
    }

    for (let i = 0; i < leave_group_body?.childElementCount; i++) {
      const currentIndex = i + 1;
      const name = document.getElementById(
        `${currentIndex}_leave_name`
      )?.value;
      const is_view = !!document.getElementById(`${currentIndex}_leave_view`)
        ?.checked;
      const is_edit = !!document.getElementById(`${currentIndex}_leave_edit`)
        ?.checked;
      const is_print = !!document.getElementById(
        `${currentIndex}_leave_print`
      )?.checked;
      const is_export = !!document.getElementById(
        `${currentIndex}_leave_export`
      )?.checked;
      const is_email = !!document.getElementById(
        `${currentIndex}_leave_email`
      )?.checked;

      leave_permission[`${name}`] = {
        view: is_view,
        edit: is_edit,
        print: is_print,
        export: is_export,
        email: is_email,
      };
    }

    for (let i = 0; i < time_group_body.childElementCount; i++) {
      const currentIndex = i + 1;
      const name = document.getElementById(
        `${currentIndex}_time_name`
      )?.value;
      const is_view = !!document.getElementById(`${currentIndex}_time_view`)
        ?.checked;
      const is_edit = !!document.getElementById(`${currentIndex}_time_edit`)
        ?.checked;
      const is_print = !!document.getElementById(`${currentIndex}_time_print`)
        ?.checked;
      const is_export = !!document.getElementById(`${currentIndex}_time_export`)
        ?.checked;
      const is_email = !!document.getElementById(`${currentIndex}_time_email`)
        ?.checked;

      time_permissions[`${name}`] = {
        view: is_view,
        edit: is_edit,
        print: is_print,
        export: is_export,
        email: is_email,
      };
    }

    const permission_json = JSON.stringify(permissions);
    const organization_json = JSON.stringify(organization_permission);
    const hr_json = JSON.stringify(hr_permissions);
    const payrol_json = JSON.stringify(payrol_permissions);
    const leave_json = JSON.stringify(leave_permission);
    const time_json = JSON.stringify(time_permissions);
    let formData = new FormData();
    formData.append("name", group_name);
    formData.append("permissions", permission_json);
    formData.append("organization_permission", organization_json);
    formData.append("hr_permission", hr_json);
    formData.append("payrol_permission", payrol_json);
    formData.append("leave_permission", leave_json);
    formData.append("time_permission", time_json);
    formData.append("csrfmiddlewaretoken", csrf_token);
    fetch("/submit_permission_group", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((response) => {
        isLoading(false);
        displayIndexSnackBar(response?.message ?? "Uploaded", false);
        setTimeout(() => {
          window.location.assign("/permission_groups");
        }, 2000);
      })
      .catch((error) => {
        isLoading(false);
        displayIndexSnackBar(response?.message ?? "Error", true);
      });
  });

  /*-----------------------------------------------------------------------------*/
  /*Edit Permissions*/
  /*---------------------------------------------------------------------------*/

  document.getElementById("permission_edit_btn")?.addEventListener("click", () => {
    isLoading(true);
    let group_name = document.getElementById("permissin_group_input")?.value;
    if (!group_name) {
      isLoading(false);
      displayIndexSnackBar("Please input permission group name", true);
      return;
    }
    let csrf_token = document.getElementById("permission_group_csrf")?.value;
    let id = document.getElementById("permission_group_id")?.value;

    let organization_group_body = document.getElementById(
      "organization_group_body"
    );
    let hr_group_body = document.getElementById("hr_group_body");
    let payrol_group_body = document.getElementById("payrol_group_body");
    let leave_group_body = document.getElementById("leave_group_body");
    let time_group_body = document.getElementById("time_group_body");

    const permissions = {};
    const organization_permission = {};
    const hr_permissions = {};
    const payrol_permissions = {};
    const leave_permission = {};
    const time_permissions = {};
    for (let i = 0; i < permission_group_body?.childElementCount; i++) {
      const currentIndex = i + 1;
      const name = document.getElementById(
        `${currentIndex}_personnel_name`
      )?.value;
      const is_view = !!document.getElementById(
        `${currentIndex}_personnel_view`
      )?.checked;
      const is_edit = !!document.getElementById(
        `${currentIndex}_personnel_edit`
      )?.checked;
      const is_print = !!document.getElementById(
        `${currentIndex}_personnel_print`
      )?.checked;
      const is_export = !!document.getElementById(
        `${currentIndex}_personnel_export`
      )?.checked;
      const is_email = !!document.getElementById(
        `${currentIndex}_personnel_email`
      )?.checked;


      permissions[`${name}`] = {
        view: is_view,
        edit: is_edit,
        print: is_print,
        export: is_export,
        email: is_email,
      };
    }
    console.log("Bod: ", organization_group_body?.childElementCount)
    for (let i = 0; i < organization_group_body?.childElementCount; i++) {
      const currentIndex = i + 1;
      const name = document.getElementById(`${currentIndex}_organization_name`)?.value;

      const is_view = !!document.getElementById(`${currentIndex}_organization_view`)?.checked;
      const is_edit = !!document.getElementById(`${currentIndex}_organization_edit`)?.checked;
      const is_print = !!document.getElementById(`${currentIndex}_organization_print`)?.checked;
      const is_export = !!document.getElementById(`${currentIndex}_organization_export`)?.checked;
      const is_email = !!document.getElementById(`${currentIndex}_organization_email`)?.checked;

      console.log("Here")
      console.log(is_view)

      organization_permission[`${name}`] = {
        view: is_view,
        edit: is_edit,
        print: is_print,
        export: is_export,
        email: is_email,
      };
    }

    for (let i = 0; i < hr_group_body?.childElementCount; i++) {
      const currentIndex = i + 1;
      const name = document.getElementById(`${currentIndex}_hr_name`)?.value;
      const is_view = !!document.getElementById(`${currentIndex}_hr_view`)
        ?.checked;
      const is_edit = !!document.getElementById(`${currentIndex}_hr_edit`)
        ?.checked;
      const is_print = !!document.getElementById(`${currentIndex}_hr_print`)
        ?.checked;
      const is_export = !!document.getElementById(`${currentIndex}_hr_export`)
        ?.checked;
      const is_email = !!document.getElementById(`${currentIndex}_hr_email`)
        ?.checked;

      hr_permissions[`${name}`] = {
        view: is_view,
        edit: is_edit,
        print: is_print,
        export: is_export,
        email: is_email,
      };
    }

    for (let i = 0; i < payrol_group_body?.childElementCount; i++) {
      const currentIndex = i + 1;
      const name = document.getElementById(`${currentIndex}_payrol_name`)?.value;
      const is_view = !!document.getElementById(`${currentIndex}_payrol_view`)?.checked;
      const is_edit = !!document.getElementById(`${currentIndex}_payrol_edit`)?.checked;
      const is_print = !!document.getElementById(`${currentIndex}_payrol_print`)?.checked;
      const is_export = !!document.getElementById(`${currentIndex}_payrol_export`)?.checked;
      const is_email = !!document.getElementById(`${currentIndex}_payrol_email`)?.checked;


      payrol_permissions[`${name}`] = {
        view: is_view,
        edit: is_edit,
        print: is_print,
        export: is_export,
        email: is_email,
      };
    }

    for (let i = 0; i < leave_group_body?.childElementCount; i++) {
      const currentIndex = i + 1;
      const name = document.getElementById(
        `${currentIndex}_leave_name`
      )?.value;
      const is_view = !!document.getElementById(`${currentIndex}_leave_view`)
        ?.checked;
      const is_edit = !!document.getElementById(`${currentIndex}_leave_edit`)
        ?.checked;
      const is_print = !!document.getElementById(
        `${currentIndex}_leave_print`
      )?.checked;
      const is_export = !!document.getElementById(
        `${currentIndex}_leave_export`
      )?.checked;
      const is_email = !!document.getElementById(
        `${currentIndex}_leave_email`
      )?.checked;


      leave_permission[`${name}`] = {
        view: is_view,
        edit: is_edit,
        print: is_print,
        export: is_export,
        email: is_email,
      };
    }

    for (let i = 0; i < time_group_body.childElementCount; i++) {
      const currentIndex = i + 1;
      const name = document.getElementById(
        `${currentIndex}_time_name`
      )?.value;
      const is_view = !!document.getElementById(`${currentIndex}_time_view`)
        ?.checked;
      const is_edit = !!document.getElementById(`${currentIndex}_time_edit`)
        ?.checked;
      const is_print = !!document.getElementById(`${currentIndex}_time_print`)
        ?.checked;
      const is_export = !!document.getElementById(`${currentIndex}_time_export`)
        ?.checked;
      const is_email = !!document.getElementById(`${currentIndex}_time_email`)
        ?.checked;


      time_permissions[`${name}`] = {
        view: is_view,
        edit: is_edit,
        print: is_print,
        export: is_export,
        email: is_email,
      };
    }

    const permission_json = JSON.stringify(permissions);
    const organization_json = JSON.stringify(organization_permission);
    const hr_json = JSON.stringify(hr_permissions);
    const payrol_json = JSON.stringify(payrol_permissions);
    const leave_json = JSON.stringify(leave_permission);
    const time_json = JSON.stringify(time_permissions);
    let formData = new FormData();
    formData.append("name", group_name);
    formData.append("permissions", permission_json);
    formData.append("organization_permission", organization_json);
    formData.append("hr_permission", hr_json);
    formData.append("payrol_permission", payrol_json);
    formData.append("leave_permission", leave_json);
    formData.append("time_permission", time_json);
    formData.append("csrfmiddlewaretoken", csrf_token);
    formData.append("id", id);
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
    const csrftoken = getCookie('csrftoken');

    fetch("/submit_edit_group", {
      method: "POST",
      body: formData,
      headers: {
        'X-CSRFToken': csrftoken
      }
    })
      .then((res) => res.json())
      .then((response) => {
        isLoading(false);
        displayIndexSnackBar(response?.message ?? "Uploaded", false);
        setTimeout(() => {
          window.location.assign("/permission_groups");
        }, 2000);
      })
      .catch((error) => {
        isLoading(false);
        displayIndexSnackBar(response?.message ?? "Error", true);
      });
  });
});
