document.addEventListener("DOMContentLoaded", () => {
  const TH_ITEMS = {
    No: "num",
    제목: "title",
    글쓴이: "author",
  };

  // href : 현재 화면이 열릴때 서버에 요청한 주소창의 값들
  // href 값의 일부를 추출하거나, 값을 가공하기 위하여 사용
  const url = new URL(document.location.href);

  const pro_table = document.querySelector("table.list");
  /**
   * table.freeboard 선택자는 상품리스트 화면에서는 유효한 선택자 이다
   * 하지만 detail, insert 등의 화면에서는 해당 선택자는 없는 상태이다
   * detail, insert 화면 등에서는 pro_table 객체가 null 인 상태가 된다는 것이다
   * pro_table 객체가 null 인 상태일때 .add() 등의 method 를 실행하면
   * null pointer exception 이 발생하고 HTML JS 에서는 이후의 JS 코드가 모두
   * 무력화 된다(실행이 안된다)
   *
   * 그래서 pro_table 객체가 null 일때는 다른 동작을 건너 뛰도록 해주어야 한다
   * 이때 사용하는 기호가 "객체?" 이다 이러한 코드를 null safe 코드 라고 한다.
   */
  pro_table?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const tr = target.closest("TR");
      const num = tr.dataset.num;
      document.location.replace(`/freeboard/${num}/detail`);

      // 현재 click 된 요소가 TH 이거나 TH 의 자손이면
    }
  }); // end event
});

document.addEventListener("DOMContentLoaded", () => {
  const btn_insert = document.querySelector("#btn_list");
  btn_insert?.addEventListener("click", () => {
    document.location.replace("menu/freeboard");
  });
});
