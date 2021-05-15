var Header = $('#header'),
	PasosMenu = $('#PasosMenu > div'),
	Paso1 = $('#PasosMenu > div:nth-child(1)'),
	Paso2 = $('#PasosMenu > div:nth-child(2)'),
	Paso3 = $('#PasosMenu > div:nth-child(3)'),
	Paso4 = $('#PasosMenu > div:nth-child(4)'),
	Paso5 = $('#PasosMenu > div:nth-child(5)'),
	HandPaso1 = $('#Paso1 #HandPaso1'),
	indPaso1 = $('#Paso1 #indicacion'),
	Wrapper = $('#wrapper'),
	Hand = $('#Hand'),
	duringVote = $('#Paso2 #Pantalla .duringVote'),
	showNadie = $('#Paso2 #Pantalla #showVoto > #showNadie'),
	showPartido = $('#Paso2 #Pantalla #showVoto > #showPartido'),
	mensajeError = $('#Paso2 #Pantalla .mensajeError'),
	botonSeleccionar = $('#Paso2 #botonSeleccionar'),
	botonVotarAnyway = $('#Paso2 #botonVotarAnyway'),
	botonVoto = $('#Paso2 #botonVotarLink'),
	showTextoFin = $('#Paso2 .showTextoFin'),
	MultipleLink = $('#Paso2 #MultipleLink'),
	MultipleLinkEach = $('#Paso2 #MultipleLink .selec_link'),
	led = $('#Paso2 #Tarjeton > #led_tarjeton'),
	minutos = $('#Paso2 #RelojWrapper #tiempo #minutos'),
	segundos = $('#Paso2 #RelojWrapper #tiempo #segundos'),
	lockPaso3 = $('.moveComp'),
	Paso3Fin = $('.moveComp > .CompFin'),
	Paso3Ok = $('#Paso3 .ShowOk'),
	Caja = $('#Paso3 #Caja'),
	firmaPaso4 = $('#Paso4 #firma'),
	huellaPaso4 = $('#Paso4 #huella'),
	Tinta = $('#Paso5 #TintaTop'),
	lock1Paso5 = $('#Paso5 #lock1Paso5'),
	lock2Paso5 = $('#Paso5 #lock2Paso5'),
	Fin1Paso5 = $('#Paso5 #lock1Paso5 div'),
	Fin2Paso5 = $('#Paso5 #lock2Paso5 div'),
	Paso5Ok1 = $('#Paso5 .ShowOk.Ok1Paso5'),
	Paso5Ok2 = $('#Paso5 .ShowOk.Ok2Paso5'),
	dedoManchado = $('#Hand #dedoManchado'),
	cleanPapel = $('#Hand #cleanPapel'),
	ModalBack = $('#ModalBack'),
	ComprobanteModal = $('#ModalBack > #ComprobanteModal');

var currentPage = 0,
	lockMouse = false,
	lockXmouse = false,
	voto = [false,false,false],
	cronometro,
	tiempo;

$(document).ready(function(){

	$('div#header div#ComoVotar').click(goToInicio);
	ComprobanteModal.hide();

	// Days left
	var today = new Date(),
		election = new Date("Dec 06 2015 00:00:00 GMT-0430");
	var faltan = Math.ceil((election.getTime()-today.getTime())/86400000);
	if (faltan < 1) {
		$('#LlegoElDia').show();
	} else {
		$('#DiasQuedan > span:first-child').text(faltan).show();
	}

	Hand.parent().mousemove(function(e){
		if (!lockMouse) {
			if (e.pageY >= 100 || currentPage==0) {
				Hand.stop().show().css('top', e.pageY-298);
				if (!lockXmouse) Hand.stop().show().css('left', e.pageX-120);
			} else Hand.stop().hide();
		}
    });

	$('#vesinfiltro_wrapper a').mouseenter(function(){
		lockMouse = true;
		Hand.hide();
	}).mouseleave(function(){
		lockMouse = false;
	});

	$('#PasoInicio .logo_link').mouseenter(function(){
		$('#PasoInicio .logo_'+$(this).attr('activate')).addClass('active');
		lockMouse = true;
		Hand.hide();
	}).mouseleave(function(){
		$('#PasoInicio .logo_'+$(this).attr('activate')).removeClass('active');
		lockMouse = false;
	});

	$('#PasoInicio #EntregarCedulaLink')
		.click(goTo1)
		.mouseenter(function(){
			$('#PasoInicio #EntregarCedula > #CedulaSpace').addClass('active');
		})
		.mouseleave(function(){
			$('#PasoInicio #EntregarCedula > #CedulaSpace').removeClass('active');
		});

	$('#Paso1 #huellaLink').click(function(){
		$('#Paso1 #huella').show();
		setTimeout(function(){
			HandPaso1.animate({'left':'-66px','top':'-18px'},200);
		},800);
		setTimeout(goTo2,1500);
	}).mouseenter(function(){
		indPaso1.html('¡Ahora haz <b>click</b>!');
	}).mouseleave(function(){
		indPaso1.text('Pon tu huella en el lector');
	});

	var opciones_show = "";
	for (var i=1 ; i<=27 ; i++)
		opciones_show += "<div class='color"+(i%11)+"'></div>";
	$('#Paso2 #Tarjeton > .opciones_tarjeton').html(opciones_show);
	$('#Paso2 #TarjetonLink').html(opciones_show);
	$('#Paso2 #TarjetonLink > div').click(function() {
		$('#Paso2 #MultipleImg')
			.addClass('active')
			.addClass($(this).attr('class'))
			.show();
		$('#Paso2 #TarjetonLink').hide();
		$('#Paso2 #MultipleLink').show();
	});

	$('#MultipleLink #selec_todo_link').click(function(){
		voto = [true,true,true];
		$('#MultipleImg > div > div').addClass('active');
		showNadie.hide();
		$('#showPartido > div')
			.attr('class',$('#MultipleImg').attr('class'))
			.slideDown(300);
	});

	MultipleLinkEach.click(function(){
		var to = parseInt($(this).attr('to')),
			votoOpt = $('#MultipleImg .voto_led_'+to);
		voto[to-1] = !voto[to-1];

		if (voto.reduce(function(a,b){return (a||b);})) showNadie.hide();
		else setTimeout(function(){showNadie.show();},310);

		votoOpt.toggleClass('active');
		$('#showPartido > #show_voto_'+to)
			.attr('class',$('#MultipleImg').attr('class'))
			.slideToggle(300);
	});

	botonVoto.click(function(){
		if (!voto.reduce(function(a,b){return (a&&b);})) {
			botonVoto.hide();
			mensajeError.show();
			botonSeleccionar.show();
			botonVotarAnyway.show();
			$('#Paso2 #TarjetonLink').hide();
			MultipleLink.hide();
		} else {
			ComprobanteAnim();
		}
	});

	botonSeleccionar.click(function(){
		botonVoto.show();
		mensajeError.hide();
		botonSeleccionar.hide();
		botonVotarAnyway.hide();
		if ($('#MultipleImg').is(':visible'))
			MultipleLink.show();
		else $('#Paso2 #TarjetonLink').show();
	});

	botonVotarAnyway.click(function(){
		mensajeError.hide();
		botonSeleccionar.hide();
		botonVotarAnyway.hide();
		ComprobanteAnim();
	});

	lockPaso3.mouseenter(function(){
		if (!lockMouse) {
			lockXmouse = true;
			Hand.stop().show().css('left', $('#Paso3').
				offset().left+lockPaso3.position().left-110);
			Caja.css('z-index',90);
		}
	}).mouseleave(function(){
		if (!lockMouse) {
			lockXmouse = false;
			Caja.css('z-index',1);
		}
	}).click(function(){
		Paso3Fin.mouseenter();
	});

	Paso3Fin.mouseenter(function(){
		lockPaso3.mouseenter();
		lockMouse = true;
		Caja.css('z-index',90);
		Paso3Ok.show();
		setTimeout(goTo4,1000);
	});

	lock1Paso5.mouseenter(function(){
		if (!lockMouse) {
			lockXmouse = true;
			Hand.stop().show().css('left', $('#Paso5').
				offset().left+lock1Paso5.position().left-105);
			Tinta.css('z-index',90);
		}
	}).mouseleave(function(){
		if (!lockMouse) {
			lockXmouse = false;
			Tinta.css('z-index',1);
		}
	}).click(function(){
		Fin1Paso5.mouseenter();
	});

	lock2Paso5.mouseenter(function(){
		if (!lockMouse) {
			lockXmouse = true;
			Hand.stop().show().css('left', $('#Paso5').
				offset().left+lock2Paso5.position().left-105);
			Tinta.css('z-index',90);
		}
	}).mouseleave(function(){
		if (!lockMouse) {
			lockXmouse = false;
			Tinta.css('z-index',1);
		}
	}).click(function(){
		Fin2Paso5.mouseenter();
	});

	Fin1Paso5.mouseenter(function(){
		Paso5Ok1.show();
		lock1Paso5.hide();
		cleanPapel.fadeIn(200)
			.animate({'bottom':'220px','right':'160px'},400)
			.animate({'bottom':'+=5px','right':'+=10px'},100)
			.animate({'bottom':'-=7px','right':'-=12px'},100)
			.animate({'bottom':'+=4px','right':'+=5px'},100)
			.fadeOut(500,function(){
				lock2Paso5.show();	
		});
		$('#Paso5 #indicacion .text')
			.html('Ahora mánchate el dedo con <b>tinta indeleble</b>');
		$('#Paso5 #indicacion .ver').css('background-position','right bottom');
	});
	Fin2Paso5.mouseenter(function(){
		lock2Paso5.hide();
		dedoManchado.fadeIn(300);
		Paso5Ok2.show();
		setTimeout(goToFin,1500);
	});

	$('#Paso4 #FirmaHuellaLink').click(function(){
		firmaPaso4.fadeIn(400);
		lockMouse = true;
		var offSetX = $('#Paso4').offset().left-121,
			offSetY = $('#Paso4').offset().top-218;
		Hand.animate({'top':(151+offSetY)+'px','left':(385+offSetX)+'px'},100)
			.animate({'top':(164+offSetY)+'px','left':(392+offSetX)+'px'},100)
			.animate({'top':(148+offSetY)+'px','left':(391+offSetX)+'px'},100)
			.animate({'top':(166+offSetY)+'px','left':(400+offSetX)+'px'},100)
			.animate({'top':(147+offSetY)+'px','left':(396+offSetX)+'px'},100)
			.animate({'top':(159+offSetY)+'px','left':(402+offSetX)+'px'},100)
			.animate({'top':(161+offSetY)+'px','left':(386+offSetX)+'px'},100)
			.animate({'top':(150+offSetY)+'px','left':(405+offSetX)+'px'},100)
			.animate({'top':(148+offSetY)+'px','left':(413+offSetX)+'px'},100)
			.animate({'top':(167+offSetY)+'px','left':(409+offSetX)+'px'},100,
			function(){
				Hand.animate({'opacity':0},600,function(){
					Hand.removeClass('Firma')
					.addClass('Thumb')
					.animate({'opacity':1},600,function(){
						Hand.animate({'top':(132+offSetY)+'px','left':(439+offSetX)+'px'},100, function(){
							setTimeout(function(){
								Hand.animate({'top':(160+offSetY)+'px','left':(480+offSetX)+'px'},400);
								huellaPaso4.show();
								setTimeout(goTo5,1300);
							},500);
						});
					});
				});
		});
	});

	ModalBack.mouseenter(function(){
		lockMouse = true;
		Hand.hide();
	});

	$('#ModalBack > div span.close').click(function(){
		ModalBack.fadeOut(500);
		$('#ModalBack > div, #ModalBack > #ComprobanteModal').hide();
		lockMouse = false;
	});

	$('.MoreInfoLink').click(function(){
		var idModal = $(this).attr('modal');
		ModalBack.fadeIn(200);
		$('#ModalBack > #'+idModal).fadeIn(300);
	}).mouseenter(function(){
		lockMouse = true;
		Hand.hide();
	}).mouseleave(function(){
		lockMouse = false;
	});

	$('#ModalBackClose').click(function(){
		$('#ModalBack > div span.close').first().click();
	});
	$('#ModalBack > #ComprobanteModal > .continuar_comp').click(function(){
		$('#ModalBack > div span.close').first().click();
	});

	$('#PasoFin > div#PasoFinIzq > div:nth-child(4)').click(goToInicio);

	$('#PasoFin #creditosLink').click(function(){
		ModalBack.fadeIn(200);
		$('#ModalBack > #ModalCreditos').fadeIn(300);
	});
});

function goToInicio() {
	currentPage = 0;
	tiempo = -1;
	Header.animate({ 'top':'-110px' },500);
	PasosMenu.removeClass('active');
	Wrapper.animate({ 'margin-left':'0%' },500);
	lockMouse = false;
	lockXmouse = false;
	Hand.removeClass()
		.addClass('Cedula');
}
function goTo1() {
	if (currentPage==1) return;
	currentPage = 1;
	tiempo = -1;
	PasosMenu.removeClass('active');
	Paso1.addClass('active');
	Wrapper.animate({ 'margin-left':'-100%' },500);
	Header.animate({ 'top':'0px' },500);
	Hand.removeClass();
	Hand.addClass('Thumb');
	$('#Paso1 #huella').hide();
	HandPaso1.stop().css({'left':'-53px','top':'-56px'});
	indPaso1.text('Pon tu huella en el lector');

	HandPaso1
		.stop(true,true).css({'left':'-53px','top':'-56px'})
		.animate({'left':'=','top':'='},1000)
		.animate({'left':'-4px','top':'-17px'},300)
		.animate({'left':'-24px','top':'-10px'},300)
		.animate({'left':'-13px','top':'-28px'},300)
		.animate({'left':'-40px','top':'-30px'},300)
		.animate({'left':'-4px','top':'-17px'},300)
		.animate({'left':'5px','top':'-35px'},300)
		.animate({'left':'-13px','top':'-28px'},300)
		.animate({'left':'5px','top':'-35px'},300)
		.animate({'left':'-53px','top':'-56px'},300);

}
function goTo2() {
	if (currentPage==2) return;
	currentPage = 2;
	PasosMenu.removeClass('active');
	Paso2.addClass('active');
	Wrapper.animate({ 'margin-left':'-200%' },500);
	Hand.removeClass();
	Hand.addClass('Point');
	$('.ComprobanteAnim').css('background-position','168px 0px');
	voto = [false,false,false];
	$('#MultipleImg > div > div').removeClass('active');
	$('#showPartido > div').hide();
	duringVote.show();
	showNadie.show();
	showPartido.attr("class","");
	showTextoFin.hide();
	mensajeError.hide();
	botonVoto.show();
	botonSeleccionar.hide();
	botonVotarAnyway.hide();
	MultipleLink.hide();
	$('#Paso2 #MultipleImg')
		.attr('class','')
		.hide();
	$('#Paso2 #TarjetonLink').show();
	led.hide();
	tiempo = 360;
	iniciarCronometro();
}

function iniciarCronometro() {
	if (tiempo<0) return;
	minutos.text(Math.floor(tiempo/60));
	seg = tiempo%60;
	segundos.text(seg < 10 ? "0"+seg : seg);
	if (tiempo==0) ComprobanteAnim();
	tiempo--;
	cronometro = setTimeout(iniciarCronometro,1000);
}

function goTo3() {
	if (currentPage==3) return;
	currentPage = 3;
	tiempo = -1;
	PasosMenu.removeClass('active');
	Paso3.addClass('active');
	Wrapper.animate({ 'margin-left':'-300%' },500);
	Hand.removeClass();
	Hand.addClass('Comprobante');
	Caja.css('z-index',1);
	Paso3Ok.hide();
	lockMouse = true;
	setTimeout(function(){
		ModalBack.fadeIn(200);
		ComprobanteModal.fadeIn(300);
	},500);
	for (i=0 ; i<voto.length ; i++) {
		$('#votos_show_comprobante > div:nth-child('+(i+1)+')')
			.attr('class',voto[i]?'active':'');
	}
}
function goTo4() {
	if (currentPage==4) return;
	currentPage = 4;
	tiempo = -1;
	PasosMenu.removeClass('active');
	Paso4.addClass('active');
	Wrapper.animate({ 'margin-left':'-400%' },500);
	Hand.removeClass();
	Hand.addClass('Firma');
	lockXmouse = false;
	lockMouse = false;
	firmaPaso4.hide();
	huellaPaso4.hide();
}
function goTo5() {
	if (currentPage==5) return;
	currentPage = 5;
	tiempo = -1;
	PasosMenu.removeClass('active');
	Paso5.addClass('active');
	Wrapper.animate({ 'margin-left':'-500%' },500);
	Hand.removeClass();
	Hand.addClass('Dedo');
	lockMouse = false;
	Tinta.css('z-index',1);
	lock1Paso5.show();
	lock2Paso5.hide();
	Paso5Ok1.hide();
	Paso5Ok2.hide();
	$('#Paso5 #indicacion .text').html('Primero mójate el dedo con <b>desengrasante</b>');
	$('#Paso5 #indicacion .ver').css('background-position','left bottom');
}
function goToFin() {
	currentPage = 6;
	tiempo = -1;
	Paso5.removeClass('active');
	Wrapper.animate({ 'margin-left':'-600%' },500);
	Header.animate({ 'top':'-110px' },500);
	lockMouse = true;
	Hand.hide();
	cleanPapel.attr('style','').hide();
	dedoManchado.hide();
}
function ComprobanteAnim () {
	duringVote.hide();
	showTextoFin.show();
	var posXcomp = 0;
	var animComprobante = setInterval(function(){
		$('.ComprobanteAnim').css('background-position',posXcomp+'px 0px');
		posXcomp -= 108;
		if (posXcomp == -864) {
			clearInterval(animComprobante);
			setTimeout(goTo3,1000);
		}
	},50);
}
