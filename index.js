// انتخاب عناصر فرم
const emailInput = document.getElementById('useremail');
const nameInput = document.getElementById('username');
const signUpBtn = document.getElementById('sign-btn');
const modal = document.querySelector('.modal');
const container = document.querySelector('#login-container');

// Regex برای اعتبارسنجی ایمیل
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regex برای اعتبارسنجی نام (فقط حروف فارسی یا انگلیسی)
const nameRegex = /^[a-zA-Zآ-ی\s]+$/;



signUpBtn.addEventListener('click', (event) => {
  // جلوگیری از ارسال فرم به صورت پیش‌فرض

  event.preventDefault();
  const storedEmail = localStorage.getItem('userEmail');
  const storedName = localStorage.getItem('userName');
  const emailValue = emailInput.value.trim();
  const nameValue = nameInput.value.trim();






  // اعتبارسنجی ایمیل
  if (!emailRegex.test(emailValue)) {

    document.querySelectorAll('.InvalidP')[0].style.display = 'flex';
    document.querySelectorAll('.login__input')[0].classList.add('login__input--1');



    return;
  }


  // اعتبارسنجی نام
  if (!nameRegex.test(nameValue)) {

    document.querySelectorAll('.InvalidP')[1].style.display = 'flex';
    document.querySelectorAll('.login__input')[1].classList.add('login__input--2');
    
    return;
  }
  



  if (storedEmail === emailValue && storedName === nameValue) {

    emailInput.value = storedEmail;
    nameInput.value = storedName;
    modal.style.display = 'flex';
    document.querySelector('#login-container').classList.add('diactive');
    emailInput.value='';
    nameInput.value='';
  }
  else {
    
    
    localStorage.setItem('userEmail', emailValue);
    localStorage.setItem('userName', nameValue);
    window.location.href = 'Song/song.html';
    emailInput.value='';
    nameInput.value='';
  }


});