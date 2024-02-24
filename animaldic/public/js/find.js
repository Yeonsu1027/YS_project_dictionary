document.addEventListener("DOMContentLoaded", () => {
  const find_form = document.querySelector("form.find");
  const find_id = document.querySelector("form.id");
  const find_pw = document.querySelector("form.pw");
  const div_btn = document.querySelector("input.btn");

  find_form?.addEventListener("click", (e) => {
    const target = e.target;

    if (target.value === "아이디찾기") {
      return (document.location.href = "/users/find_id");
    } else if (target.value === "비밀번호찾기") {
      return (document.location.href = "/users/find_pw");
    }
    return false;
  });
  div_btn?.addEventListener("click", (e) => {
    const target = e.target;
    const input_username = document.querySelector("#username");
    const input_usertel = document.querySelector("#usertel");
    const input_useremail = document.querySelector("#useremail");
    if (!input_username.value) {
      alert("사용자 이름을 입력하세요");
      input_username.select();
      return false;
    }
    if (!input_usertel.value) {
      alert("전화번호를 입력하세요");
      input_usertel.select();
      return false;
    }
    if (!input_useremail.value) {
      alert("이메일을 입력하세요");
      input_useremail.select();
      return false;
    } else if (target.value === "다음") {
      alert("인증번호 발송");
      return (document.location.href = "/login");
    }
  });
  div_btn?.addEventListener("click", (e) => {
    const target = e.target;
    const input_userid = document.querySelector("#userid");
    const input_usertel = document.querySelector("#usertel");
    const input_useremail = document.querySelector("#useremail");

    if (!input_userid.value) {
      alert("ID를 입력하세요");
      input_userid.select();
      return false;
    }
    if (!input_usertel.value) {
      alert("전화번호를 입력하세요");
      input_usertel.select();
      return false;
    }
    if (!input_useremail.value) {
      alert("이메일을 입력하세요");
      input_useremail.select();
      return false;
    } else if (target.value === "다음") {
      alert("인증번호 발송");
      return (document.location.href = "/login");
    }
  });
});
