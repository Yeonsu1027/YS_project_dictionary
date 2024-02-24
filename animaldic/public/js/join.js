const join_btn_click_event = async () => {
  const join_form = document.querySelector("form.join");
  const userid = join_form.querySelector("#username");
  const password = join_form.querySelector("#password");
  const re_password = join_form.querySelector("#checkpassword");
  const realname = join_form.querySelector("#realname");
  const tel = join_form.querySelector("#tel");

  if (userid.value === "") {
    alert(" 사용자 ID 를 입력해야 합니다");
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
  // if (realname.value === "") {
  //   alert("이름을 입력해야 합니다");
  //   realname.select();
  //   return false;
  // }
  // if (tel.value === "") {
  //   alert("전화번호를 입력해야 합니다");
  //   tel.select();
  //   return false;
  // }

  join_form.submit();
  alert("회원가입이 완료되었습니다");
  document.location.replace("/login");
};

const id_btn_click_event = async () => {
  const join_form = document.querySelector("form.join");
  const username = join_form.querySelector("#username");

  if (username.value === "") {
    alert(" 사용자 ID 를 입력해야 합니다");
    userid.select();
    return false;
  } else {
    // Async 방식으로 Server 에 userid check 를 요청
    const response = await fetch(`/users/${username.value}/check`);
    const json = await response.json();
    if (json.MESSAGE === "FOUND") {
      alert("이미 등록된 사용자 ID 입니다");
      userid.select();
      return false;
    } else {
      alert("사용가능한 사용자 ID 입니다");
      password.select();
    }
  }
};

const pw_btn_click_event = async () => {
  const join_form = document.querySelector("form.join");
  const password = join_form.querySelector("#password");
  const realname = join_form.querySelector("#realname");
  const re_password = join_form.querySelector("#checkpassword");

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
  if (password.value === re_password.value) {
    alert("비밀번호가 확인되었습니다");
    realname.select();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const join_btn = document.querySelector("#btn_join");
  join_btn.addEventListener("click", join_btn_click_event);
});

document.addEventListener("DOMContentLoaded", () => {
  const join_btn = document.querySelector("#check_id");
  join_btn.addEventListener("click", id_btn_click_event);
});

document.addEventListener("DOMContentLoaded", () => {
  const join_btn = document.querySelector("#check_pw");
  join_btn.addEventListener("click", pw_btn_click_event);
});
