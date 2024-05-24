window.addEventListener("DOMContentLoaded", () => {

  document
    .getElementById("registeration_form_id")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();

      let checkAuth = false;
      const formData = new FormData(this);
      for (var pair of formData.entries()) {
        // console.log(pair[0] + ": " + pair[1]);
        if (!pair[1]) {
          displayIndexSnackBar(`Please enter value of ${pair[0]}`, true);
          checkAuth = false;
          break;
        } else if (pair[0] === "password") {
          if (!this?.c_password?.value || this.c_password.value !== pair[1]) {
            displayIndexSnackBar(`Password and confirm password do not match`, true);
            checkAuth = false;
            break;
          }
        } else {
          checkAuth = true;
        }
      }

      if (checkAuth) {
        document.getElementById("registration_card_id").style.display = "none";
        isLoading(true);
        this.submit();
      }
    });

  document
    .getElementById("login_form_id")
    ?.addEventListener("submit", function (e) {
      e.preventDefault();

      let checkAuth = false;
      const formData = new FormData(this);
      for (var pair of formData.entries()) {
        if (!pair[1]) {
          displayIndexSnackBar(`Please enter value of ${pair[0]}`, true);
          checkAuth = false;
          break;
        } else {
          checkAuth = true;
        }
      }
      if (checkAuth) {
        document.getElementById("registration_card_id").style.display = "none";
        isLoading(true);
        this.submit();
      }
    });
});
