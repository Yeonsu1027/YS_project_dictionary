document.addEventListener("DOMContentLoaded",()=>{

    const delete_btn = document.querySelector(".delete_btn");

    delete_btn.addEventListener("click",()=>{
        if(confirm("해당 공지를 삭제하시겠습니까?\n삭제된 내용은 복구가 되지 않습니다.")){
            const n_num =delete_btn.dataset.n_num;
            document.location.replace(`/notice/${n_num}/delete`);
        }
    })
})