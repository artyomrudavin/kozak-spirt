$(function() {

	// When the user scrolls the page, execute myFunction
	window.onscroll = function() {myFunction()};

	// Get the navbar
	var wehave = document.getElementById("wehave");
	var navbar = document.getElementById("navbar");

	// Get the offset position of the navbar
	var showMenu = wehave.offsetTop;

	// Add the sticky class to the navbar
	function myFunction() {
		if (window.pageYOffset >= showMenu) {
			navbar.classList.add("showMenu")
		} else {
			navbar.classList.remove("showMenu");
		}
	}

});

// Header menu

	$(function() {

		$('#icon').on('click', function(e) {
			e.preventDefault();

			// $('.icon').toggleClass('active');

			var menu = $('#menu');

			menu.slideToggle();
		});
	});

// Scroll to

$(function() {

	$('.menu-f a, #menu a').click( function(){ // ловим клик по ссылке с классом go_to
	var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
        if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
	    $('html, body').animate({ scrollTop: $(scroll_el).offset().top - 75}, 2000); // анимируем скроолинг к элементу scroll_el

	    if ( $(window).width() < 768 ) {
	    	// console.log(this);
	    	// $('.icon').toggleClass('active');
	    	var menu = $('#menu');
	    	menu.slideToggle();
	    };	    
	}
	    return false; // выключаем стандартное действие
	});

});

//E-mail Ajax Send

$(function() {

	$("#headerForm, #headerFormMain, #mainForm, #akciyaForm1, #akciyaForm2, #deliveryForm, #f-call-form, #c_thirtyfive, #c_twentyfive, #c_fourteen").submit(function() { //Change
		var th = $(this);

		$.ajax({
			type: "POST",
			url: "rest.php", //Change
			data: th.serialize()
		}).done(function() {
			// alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 500);
			location.href = "https://kazachok-samagon.com.ua/sps";
		});
		return false;
	});


});

// PhoneMask

$(function() {
	$('[type="tel"]').mask('+389999999999');
});

// Taimer

$(function() {

	function updater(d, h, m, s) {
  // День сброса - 27 сентября 2015 года (и далее каждые три дня)
  var baseTime = new Date(2018, 1, 6);
  // Период сброса — 3 дня
  var period = 3*24*60*60*1000;

  function update() {
  	var cur = new Date();
    // сколько осталось миллисекунд
    var diff = period - (cur - baseTime) % period;
  	// console.log(diff % 1000);
    // сколько миллисекунд до конца секунды
    var millis = diff % 1000;
    diff = Math.floor(diff/1000);
    // сколько секунд до конца минуты
    var sec = diff % 60;
    if(sec < 10) sec = "0"+sec;
    diff = Math.floor(diff/60);
    // сколько минут до конца часа
    var min = diff % 60;
    if(min < 10) min = "0"+min;
    diff = Math.floor(diff/60);
    // сколько часов до конца дня
    var hours = diff % 24;
    if(hours < 10) hours = "0"+hours;
    var days = Math.floor(diff / 24);
    d.innerHTML = days;
    h.innerHTML = hours;
    m.innerHTML = min;
    s.innerHTML = sec;

    // console.log(days);

    if ( days < '1' ) {
    	// console.log(days);
    	$('.timer--red').css('color', '#EE4034');
    };

    // следующий раз вызываем себя, когда закончится текущая секунда
    setTimeout(update, millis);
}
setTimeout(update, 0);
}

updater(document.getElementById("days1"),
	document.getElementById("hours1"),
	document.getElementById("minutes1"),
	document.getElementById("seconds1"));

updater(document.getElementById("days2"),
	document.getElementById("hours2"),
	document.getElementById("minutes2"),
	document.getElementById("seconds2"));

updater(document.getElementById("days3"),
	document.getElementById("hours3"),
	document.getElementById("minutes3"),
	document.getElementById("seconds3"));

});

// catalog hover

$(function() {

	$( '.c_fourteen' ).hover(
		function() {
			$(this).attr('src', 'img/catalog/c_suh.jpg');
		}, function() {
			$(this).attr('src', 'img/catalog/c_14litr.jpg');
		}
	);

	$( '.c_twentyfive' ).hover(
		function() {
			$(this).attr('src', 'img/catalog/c_suh.jpg');
		}, function() {
			$(this).attr('src', 'img/catalog/c_25litr.jpg');
		}
	);

	$( '.c_thirtyfive' ).hover(
		function() {
			$(this).attr('src', 'img/catalog/c_suh.jpg');
		}, function() {
			$(this).attr('src', 'img/catalog/c_35litr.jpg');
		}
	);

});

// Date Today

$(function() {

	var dateNow = new Date(),
	todayInner = $('.today');
	
	function formatDate(date) {

		var dd = date.getDate() + 3;
		if (dd < 10) dd = '0' + dd;

		var mm = date.getMonth() + 1;
		if (mm < 10) mm = '0' + mm;

		if (dd >= 31) {
			dd = '03';
			mm = mm + 1;
		} else if (dd >= 29) {
			dd = '01';
			mm = mm + 1;
		} else if (dd >= 30) {
			dd = '02';
			mm = mm + 1;
		}

		return dd + '.' + mm;
	};

	todayInner.text(formatDate(dateNow));
	// console.log(formatDate(dateNow));
});