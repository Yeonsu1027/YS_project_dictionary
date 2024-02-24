document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form.write");
  const btn_post = form.querySelector("input.btn_post");
  const btn_list = form.querySelector("input.btn_list");

  const content = form.querySelector("textarea[name='content']");
  const title = form.querySelector("input[name='title']");

  btn_list.addEventListener("click", () => {
    document.location.replace("/notice");
  });

  btn_post.addEventListener("click", () => {
    if (!title.value) {
      alert("제목을 작성해주세요");
      title.select();
      return false;
    }
    if (!content.value) {
      alert("내용을 작성해주세요");
      content.select();
      return false;
    }

    form.submit();
  });
});
