
document.addEventListener("DOMContentLoaded",()=>{
  const update_btn = document.querySelector(".update");
  const delete_btn = document.querySelector(".delete");
  const list_btn = document.querySelector(".btn_list");
  const num = update_btn.dataset.num;

  update_btn.addEventListener("click", () => {

    document.location.replace(`/freeboard/${num}/update`);
   });

   delete_btn.addEventListener("click",()=>{
    if(confirm("게시글을 삭제하시겠습니까?")){
      document.location.replace(`/freeboard/${num}/delete`);
    }
   });

   list_btn.addEventListener("click",()=>{
    document.location.replace("/freeboard");
   })

});