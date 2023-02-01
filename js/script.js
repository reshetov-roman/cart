// class BonusClubCard {
//     constructor() {
        
//     }
    
// }

// const exampleBonusClubCard = new BonusClubCard(
    
// );

// exampleBonusClubCard.buttonCardFunc();


let cardButton = document.querySelector('.page-card-wrapper__card--button'),
buttonCancelForm = document.querySelector('.page-card-wrapper__card--form--cancel');

cardButton.addEventListener('click', e => {
    const parent = e.target.closest('.page-card-wrapper');
    parent.querySelector('.page-card-wrapper__card').classList.add('not-active');
    parent.querySelector('.page-card-wrapper__card--form').classList.add('block');
});

buttonCancelForm.addEventListener('click', e => {
    location.reload();
});

let inputPhone = document.querySelector('.page-card-wrapper__card--form--phone');

let buttonFormDisabled = document.querySelector('.page-card-wrapper__card--form--code');

inputPhone.addEventListener('input', e => {
    const length = e.target.value.length;
    if(length >= 17) {
        buttonFormDisabled.disabled = false;
        buttonFormDisabled.classList.add('active');
    }else {
        buttonFormDisabled.disabled = true;
        buttonFormDisabled.classList.remove('active');
    }
});


let getInputSmsCode = document.querySelector('.page-card-wrapper__card--sms--code');
let buttonConfirmForm = document.querySelector('.page-card-wrapper__card--sms--confirm');


getInputSmsCode.addEventListener('input', e => {
    const length = e.target.value.length;
    if(length == 4) {
        buttonConfirmForm.disabled = false;
        buttonConfirmForm.classList.add('active');
    }else {
        buttonConfirmForm.disabled = true;
        buttonConfirmForm.classList.remove('active');
    }
});



let hideForm = document.querySelector('.page-card-wrapper__card--form'),
formSms = document.querySelector('.page-card-wrapper__card--sms'),
buttonSmsCancel = document.querySelector('.page-card-wrapper__card--sms--cancel');


let timer = document.getElementById('timer');
let resend = document.querySelector('.page-card-wrapper__card--sms--resend');
resend.disabled = true;

let timerSecond = 4;

buttonFormDisabled.addEventListener('click', () => {
    
    hideForm.classList.remove('block');
    formSms.classList.add('block');
    if(formSms.classList.contains('block')) {
        smsTimer();
    }
    
});

resend.addEventListener('click', () => {
    if(timerSecond !== 40) {
        timerSecond = 4;
        resend.disabled = true;
        resend.classList.remove('active');
        smsTimer();
    }
});


function smsTimer() {
    let clearInteval = setInterval(() => {
        timer.innerHTML = timerSecond--;
        if(timerSecond === -1) { 
            resend.classList.add('active');
            resend.disabled = false;
            clearInterval(clearInteval);
        }
        }, 1000);
}




buttonSmsCancel.addEventListener('click', () => {
    location.reload();
});


    let eventCalllback = (e) => {
        let el = e.target,
        clearVal = el.dataset.phoneClear,
        pattern = el.dataset.phonePattern,
        matrix_def = "+7(___) ___-__-__",
        matrix = pattern ? pattern : matrix_def,
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = e.target.value.replace(/\D/g, "");
        if (clearVal !== 'false' && e.type === 'blur') {
            if (val.length < matrix.match(/([\_\d])/g).length) {
                e.target.value = '';
                return;
            }
        }
        if (def.length >= val.length) val = def;
        e.target.value = matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
    }
    let phone_inputs = document.querySelectorAll('[data-phone-pattern]');
    for (let elem of phone_inputs) {
        for (let ev of ['input', 'blur', 'focus']) {
            elem.addEventListener(ev, eventCalllback);
        }
    }
