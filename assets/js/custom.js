let menu = document.getElementById("toggle-menu");
let menuBtn = document.getElementById("mobile-menu");

menuBtn.addEventListener('click', function (){
    menuBtn.classList.toggle('menu-active');
    menu.classList.toggle('active');

});


function handleMobileView() {
    const menu = document.getElementById("toggle-menu");
    const button = document.getElementById("interest-button");
    if (window.innerWidth <= 1024) {
        setTimeout(()=>{
            menu.appendChild(button);
            button.classList.remove("hidden");
        }, 2000);

    }
}
window.addEventListener("load", handleMobileView);