document.addEventListener("DOMContentLoaded", () => {
  const needlogin = document.querySelector("input.ex");
  needlogin.addEventListener("click", () => {
    alert("로그인 후 이용가능합니다");
  });
}); //로그인 안하면 추가불가

// 리스트 삭제
document.addEventListener("DOMContentLoaded", () => {
  const btn_delete = document.querySelectorAll("button.delete i.fa.fa-times");
  btn_delete.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (confirm("리스트를 삭제하시겠습니까? \n삭제된 리스트는 복구가 불가능합니다")) {
        const target = e.target.closest("ul[data-u_num]");
        const u_num = target.dataset.u_num;
        document.location.replace(`/${u_num}/delete`); // 서버에 해당 번호 삭제 요청
      }
    });
  });
});

//---------------

// -------- 체크 확인 시 js
document.addEventListener("DOMContentLoaded", () => {
  const check_ul = document.querySelectorAll("ul.checkul"); // 모든 ul.checkul
  check_ul.forEach((ul) => {
    ul.addEventListener("click", (e) => {
      const target = e.target;
      if (target.tagName === "LI") {
        const u_num = target.closest("ul.checkul[data-u_num]").dataset.u_num;
        document.location.replace(`/${u_num}/check`);
      }
    });
  });
});
