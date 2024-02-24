document.addEventListener("DOMContentLoaded", () => {
  const user = '<%= user %>'; // 세션에서 user 정보를 가져옵니다.

  const form = document.querySelector("form.write");
  const btn_re = document.querySelector("input.repost");
  const list = document.querySelector("input.btn_list");
  const password = document.querySelector("input[name='password']");

  list.addEventListener("click", () => {
    document.location.replace("/freeboard");
  });

  btn_re.addEventListener("click", (e) => {
    if (!user) {
      // 로그인되지 않은 상태
      if (!password?.value) {
        alert("비밀번호를 작성해주세요");
        password.select();
        return false;
      }
    }

    form.submit();
  });
});