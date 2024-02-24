document.addEventListener("DOMContentLoaded", () => {
  const user = '<%= user %>'; // 세션에서 user 정보를 가져옵니다.
  const password = document.querySelector("input[name='password']");
  const form = document.querySelector("form.write");
  const btn_update = form.querySelector(".btn.update");
  const btn_delete = form.querySelector(".btn.delete");
  const btn_list = form.querySelector(".btn_list");

  btn_update.addEventListener("click", () => {
    const parDIV = btn_update.closest("DIV");
    const num = parDIV.dataset.num;

    document.location.replace(`/freeboard/${num}/update`);
  });

  btn_delete.addEventListener("click", (e) => {
    const parDIV = btn_delete.closest("DIV");
    const num = parDIV.dataset.num;

    if (!confirm("게시글을 삭제하겠습니까?")) {
      return false;
    }

    if (!user && !password.value) {
      alert("비밀번호를 작성해주세요");
      password.select();
      return false;
    }
    form.submit();
  });

  btn_list.addEventListener("click", () => {
    document.location.replace("/freeboard");
  });
});