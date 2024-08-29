const loginBtn = document.querySelector('.login-btn');
    const emailInput = document.getElementById('useremail');
    const nameInput = document.getElementById('username');
    const modal2 = document.querySelector('.modal2')

    // Pre-fill the email and name fields if stored in localStorage


    loginBtn.addEventListener('click', function (e) {
      event.preventDefault(e);
      const email = emailInput.value.trim();
      const name = nameInput.value.trim();
      const emailRegex2 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Regex برای اعتبارسنجی نام (فقط حروف فارسی یا انگلیسی)
      const nameRegex2 = /^[a-zA-Zآ-ی\s]+$/;

      // Check if the entered email and name match stored data
      const storedEmail = localStorage.getItem('userEmail');
      const storedName = localStorage.getItem('userName');


      if (!emailRegex2.test(email)) {

        document.querySelectorAll('.InvalidP2')[0].style.display = 'flex';
        document.querySelectorAll('.login__input')[0].classList.add('login__input--1');



        return;
      }


      // اعتبارسنجی نام
      if (!nameRegex2.test(name)) {

        document.querySelectorAll('.InvalidP2')[1].style.display = 'flex';
        document.querySelectorAll('.login__input')[1].classList.add('login__input--2');

        return;
      }



      if (email === storedEmail && name === storedName) {
        console.log('login')
        window.location.href = '../Song/song.html';
        emailInput.value = '';
        nameInput.value = '';
      } else {
        modal2.style.display = 'flex';
        document.querySelector('.login-container2').classList.add('diactive2');
        emailInput.value = '';
        nameInput.value = '';
      }
    });