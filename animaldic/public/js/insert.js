document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form.write");
  const btn_post = form.querySelector("input.btn_post");
  const btn_list = form.querySelector("input.btn_list");
  const author = form.querySelector("input[name='author']");
  const content = form.querySelector("textarea[name='content']");
  const title = form.querySelector("input[name='title']");
  const password = form.querySelector("input[name='password']");

  btn_list.addEventListener("click", () => {
    document.location.replace("/freeboard");
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
    if (!user&&!author?.value) {
      alert("아이디를 작성해주세요");
      author.select();
      return false;
    }
    if (!user && password?.value) {
      alert("비밀번호를 작성해주세요");
      password.select();
      return false;
    }
    form.submit();
  });
});

const imagePreView = (event) => {
  const img_add = document.querySelector(".img_add");
  // input(type=file) 은 여러개의 파일을 선택(담기)할수 있다
  // 현재는 한개의 파일만 선택하므로
  // 0 번째 파일만 추출하여 사용한다
  const file = event.target.files[0];

  const fileReader = new FileReader();
  // 파일을 읽었으면 할일 미리 지정하기(event handler)
  fileReader.onload = (e) => {
    const fileURL = e.target.result;
    img_add.src = fileURL;
  };

  fileReader.readAsDataURL(file);
};
