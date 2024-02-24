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
      if (confirm("삭제된 데이터는 복구할 수 없습니다. 정말 삭제할까요?")) {
        const target = e.target.closest("ul[data-u_num]");
        const u_num = target.dataset.u_num;
        document.location.replace(`/${u_num}/delete`); // 서버에 해당 번호 삭제 요청
      }
    });
  });
});

//------------- 체크확인 리스트 앞에 빨간 체크표시 추가, 글씨회색

document.addEventListener("DOMContentLoaded", () => {
  const ulContents = document.querySelectorAll("section.list ul"); // 어떤리스트를 클릭해도 작동하게 All

  const createCheck = (li) => {
    const spanCheck = document.createElement("SPAN");
    spanCheck.classList.add("check");
    spanCheck.innerHTML = "&check;";
    li.insertBefore(spanCheck, li.firstChild);
  };

  ulContents.forEach((ulContent) => {
    ulContent.addEventListener("click", (event) => {
      const target = event.target;
      if (target.tagName === "LI") {
        const spanCheck = target.querySelector(".check");
        const ulLine = target.closest("UL"); // ul 에 회색글씨 css 클래스
        // 이건있는거에 클래스 붙일거니 토글
        ulLine.classList.toggle("line");
        if (spanCheck) {
          target.removeChild(spanCheck);
        } else {
          createCheck(target);
        }
      }
    });
  });
});
