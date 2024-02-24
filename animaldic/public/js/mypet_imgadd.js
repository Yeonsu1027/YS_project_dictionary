const imagePreView = (event) => {
  const img_add = document.querySelector("img.img_add");
  const file = event.target.files[0]; //파일1개만

  const fileReader = new FileReader(); //파일읽고

  fileReader.onload = (e) => {
    // 파일로드 되면
    const fileURL = e.target.result;
    img_add.src = fileURL;
  };
  fileReader.readAsDataURL(file);
};

document.addEventListener("DOMContentLoaded", () => {
  const img_add = document.querySelector("img.img_add");
  const input_img = document.querySelector("#ma_image");

  img_add?.addEventListener("click", () => {
    input_img.click(); // 사진클릭하면 파일추가 인풋 클릭한걸로
  });

  input_img?.addEventListener("change", imagePreView);

  div_img?.addEventListener("paste", async (e) => {
    const items = e.clipboardData.items;
    const item = items[0]; //클립보드에저장된 첫번째가
    const img_add = document.querySelector("img.img_add");
    const input_image = document.querySelector("#p_image");

    if (item.type.indexOf("image") === 0) {
      //이미지니? 0이면 img
      const blob = item.getAsFile(); // 그복붙한이미지를 파일로..
      if (!blob) return false;

      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const fileURL = event.target.result;
        img_add.src = fileURL;
      };
      fileReader.readAsDataURL(blob);

      // 복사 붙이기한 파일을 input(type=file) tag 에 포함하기
      const dataTransfer = new DataTransfer(); //데이터변환하기
      dataTransfer.items.add(blob); //blob 한거를 (items 위의변수가 아님!!!)
      input_image.files = dataTransfer.files; // input tag에 붙여넣는다(업로드)
    }
  });
});
