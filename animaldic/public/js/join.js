document.addEventListener("DOMContentLoaded", () => {
  let id_check = 0;
  let password_check = 0;

  const join_btn_click_event = async () => {
    const join_form = document.querySelector("form.join");
    const userid = join_form.querySelector("#username");
    const password = join_form.querySelector("#password");
    const re_password = join_form.querySelector("#checkpassword");
    const realname = join_form.querySelector("#realname");
    const tel = join_form.querySelector("#tel");

    if (userid.value === "") {
      alert("ID를 입력해주세요");
      userid.select();
      return false;
    }

    if (password.value === "") {
      alert("비밀번호를 입력해야 합니다");
      password.select();
      return false;
    }
    if (re_password.value === "") {
      alert("비밀번호 확인을 입력해야 합니다");
      re_password.select();
      return false;
    }
    if (password.value !== re_password.value) {
      alert("비밀번호와 비밀번호확인 값이 다릅니다");
      password.select();
      return false;
    }

    alert("회원가입이 완료되었습니다");
    join_form.submit();
  };

  const id_btn_click_event = async () => {
    const join_form = document.querySelector("form.join");
    const username = join_form.querySelector("#username");

    if (username.value === "") {
      alert(" 사용자 ID 를 입력해야 합니다");
      username.select();
      return false;
    } else {
      const response = await fetch(`/users/${username.value}/check`);
      const json = await response.json();
      if (json.MESSAGE === "FOUND") {
        alert("이미 등록된 사용자 ID 입니다");
        username.select();
        id_check = 0;
        return false;
      } else {
        alert("사용가능한 사용자 ID 입니다");
        id_check = 1;
      }
    }
  };

  const pw_btn_click_event = () => {
    const join_form = document.querySelector("form.join");
    const password = join_form.querySelector("#password");
    const re_password = join_form.querySelector("#checkpassword");

    if (password.value === "") {
      alert("비밀번호를 입력해주세요");
      password.select();
      return false;
    }
    if (re_password.value === "") {
      alert("비밀번호 확인을 입력해 주세요");
      re_password.select();
      return false;
    }
    if (password.value !== re_password.value) {
      alert("비밀번호를 다시 확인해주세요");
      password.select();
      return false;
    }
    if (password.value === re_password.value) {
      alert("비밀번호가 확인되었습니다");
      password_check = 1;
    }
  };

  document.querySelector("#btn_join").addEventListener("click", (event) => {
    if (id_check === 1 && password_check === 1) {
      join_btn_click_event();
    } else if (id_check === 0 && password_check === 1) {
      alert("ID 중복검사를 해주세요");
      event.preventDefault();
      return false;
    } else if (id_check === 1 && password_check === 0) {
      alert("비밀번호 확인을 해주세요");
      event.preventDefault();
      return false;
    } else if (id_check === 0 && password_check === 0) {
      alert("ID 중복검사와 비밀번호 확인을 해주세요");
      event.preventDefault();
      return false;
    }
  });

  document.querySelector("#check_id").addEventListener("click", id_btn_click_event);
  document.querySelector("#check_pw").addEventListener("click", pw_btn_click_event);
});
