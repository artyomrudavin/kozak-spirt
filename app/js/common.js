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

	$("#headerForm, #headerFormMain, #mainForm, #akciyaForm1, #akciyaForm2, #deliveryForm, #f-call-form").submit(function() { //Change
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
			location.href = "https://avtoclav.bondareff.com.ua/sps/";
		});
		return false;
	});


});

// PhoneMask

$(function() {
	$('[type="tel"]').mask('+389999999999');
});