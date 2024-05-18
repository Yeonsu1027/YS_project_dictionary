document.addEventListener("DOMContentLoaded",()=>{
    const notice_box = document.querySelector(".notice_box");

    notice_box.addEventListener("click",(e)=>{
        const target = e.target;
        if(target.tagName ==="LI"){
            const ul = target.closest("UL");
            const n_num = ul.dataset.n_num;
            document.location.href= `/notice/${n_num}/detail`;
        } 
    })
})