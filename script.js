const NAVIGATION = document.querySelector('.navigation');
NAVIGATION.addEventListener('click', event => {
    NAVIGATION.querySelectorAll('.navigation__item').forEach(element => element.classList.remove('active'));
    event.target.classList.add('active');
});

const BUTTON = document.getElementById('makeSubmit');
const CLOSE_BUTTON = document.getElementById('closeSubmit');

BUTTON.addEventListener('click', () => {
    const subject = document.getElementById('subject').value;
    const describe = document.getElementById('describe').value;
    document.getElementById('subjectResult').innerText = !subject ? 'Without subject' : 'Subject:' + subject;
    document.getElementById('describeResult').innerText = !describe ? 'Without description' : 'Description:' + describe;
    document.getElementById('messageBlock').classList.toggle('hidden');
});

CLOSE_BUTTON.addEventListener('click', () => {
    document.getElementById('subjectResult').innerText = '';
    document.getElementById('describeResult').innerText = '';
    document.getElementById('messageBlock').classList.toggle('hidden');
    document.querySelectorAll('.form-input input').forEach(input => {
        input.value = '';
    });
    document.getElementById('describe').value = '';
});

const SCREEN = document.querySelector('.slider-wrapper');

SCREEN.addEventListener('click', event => {
    // if (event.target.classList.contains('img-phone') || event.target.classList.contains('black-screen')) {
    //     const elementStyles = event.target.style;
    //     elementStyles.zIndex = elementStyles.zIndex === '1' ? '0' : '1';}
    if (event.target.classList.contains('img-phone')){
        event.target.style.zIndex ='0';
    }  if (event.target.classList.contains('black-screen')){
        event.target.previousElementSibling.style.zIndex='1';
    }})







