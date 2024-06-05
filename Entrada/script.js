document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const nextPage = document.getElementById('next-page');

    setTimeout(() => {
        splashScreen.style.opacity = '0';
    }, 4000);

    setTimeout(() => {
        splashScreen.style.display = 'none';
        nextPage.style.display = 'block';
    }, 7000);
});

/*--------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const nextPage = document.getElementById('next-page');

    setTimeout(() => {
        splashScreen.classList.add('show');
    }, 1200);

    setTimeout(() => {
        splashScreen.style.opacity = '0';
        splashScreen.style.visibility = 'hidden';
    }, 5000);

    setTimeout(() => {
        splashScreen.style.display = 'none';
        nextPage.style.display = 'block';
    }, 7000);
});


/*--------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function() {
    const splashScreen = document.getElementById('splash-screen');
    const nextPage = document.getElementById('next-page');
    const entrarButton = document.getElementById('entrar');

    entrarButton.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do botão

        // Adiciona transição suave
        splashScreen.style.opacity = '0';
        splashScreen.style.visibility = 'hidden';
        
        setTimeout(function() {
            window.location.href = "/Ambientes/index.html";
        }, 500); // 1 segundo para coincidir com a duração da transição no CSS
    });
});
