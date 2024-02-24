document.addEventListener("DOMContentLoaded", () => {
  const TH_ITEMS = {
    No: "num",
    제목: "contentx",
    글쓴이: "director",
  };

  const url = new URL(document.location.href);

  const pro_table = document.querySelector("table.list");

  pro_table?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const tr = target.closest("TR");
      const num = tr.dataset.num;
      document.location.replace(`/notice/${num}/detail`);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const btn_insert = document.querySelector("#btn_list");
  btn_insert?.addEventListener("click", () => {
    document.location.replace("menu/notice");
  });
});
