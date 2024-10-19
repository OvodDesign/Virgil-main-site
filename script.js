document.getElementById('randomLink').addEventListener('click', function (event) {
    event.preventDefault(); 
    const randomPage = Math.random() < 0.5 ? 'model1.html' : 'model2.html';
    window.open(randomPage, '_blank'); 
});
// script for randomizing which model to be opened