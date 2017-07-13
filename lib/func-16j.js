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
	lockPaso4 = $('.moveComp'),
	Paso4Fin = $('.moveComp > .CompFin'),
	Paso4Ok = $('#Paso4 .ShowOk'),
	Caja = $('#Paso4 #Caja'),
	firmaPaso5 = $('#Paso5 #firma'),
	huellaPaso5 = $('#Paso5 #huella'),
	Tinta = $('#Paso5 #TintaTop'),
	ModalBack = $('#ModalBack');

var currentPage = 0,
	lockMouse = false,
	lockXmouse = false,
	votos = 0;

$(document).ready(function(){

	$('div#header div#ComoVotar').click(goToInicio);

	// Days left
	var today = new Date(),
		election = new Date("Jul 16 2017 00:00:00 GMT-0500");
	var faltan = Math.ceil((election.getTime()-today.getTime())/86400000);
	if (faltan < 1) {
		$('#LlegoElDia').show();
	} else {
		$('#DiasQuedan > span:first-child').text(faltan);
		$('#DiasQuedan').show();
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

	$('#PasoInicio #BotonInicioLink')
		.click(goTo1)
		.mouseenter(function(){
			$('#PasoInicio #BotonInicio').addClass('active');
		})
		.mouseleave(function(){
			$('#PasoInicio #BotonInicio').removeClass('active');
		});
	
	$('#Paso1 #Paso1Ubicar').click(function(){
		ModalBack.fadeIn(200);
		$('#ModalBack > #ModalPaso1').fadeIn(300);
	});

	$('#Paso1 .Paso1Link')
		.mouseenter(function(){
			$(this).parent().addClass('active');
		})
		.mouseleave(function(){
			$(this).parent().removeClass('active');
		});

	$('#Paso1 #ContinuarAPaso2 > .Paso1Link').click(goTo2);
	
	$('#Paso2 #CedulaLink')
		.click(function(){
			$('#Paso2 .ShowOk').fadeIn();
			lockMouse = true;
			setTimeout(goTo3,700);
		})
		.mouseenter(function(){
			$('#Paso2 #CedulaSpace').addClass('active');
		})
		.mouseleave(function(){
			$('#Paso2 #CedulaSpace').removeClass('active');
		});
	
	$('#Paso3 .BoletaLink > div > div').click(function(){
		opt_boleta = $('#Paso3 .BoletaShow > div > div.' + $(this).attr('class'));
		if (!opt_boleta.hasClass('active')) {
			opt_boleta.parent().children().removeClass('active');
		}
		opt_boleta.toggleClass('active');
		votos = $('#Paso3 .BoletaShow > div > div.active').size();
		if (votos==3) {
			lockMouse = true;
			setTimeout(goTo4,500);
		}
	});

	lockPaso4.mouseenter(function(){
		if (!lockMouse) {
			lockXmouse = true;
			Hand.stop().show().css('left', $('#Paso4').
				offset().left+lockPaso4.position().left-110);
			Caja.css('z-index',90);
		}
	}).mouseleave(function(){
		if (!lockMouse) {
			lockXmouse = false;
			Caja.css('z-index',1);
		}
	}).click(function(){
		Paso4Fin.mouseenter();
	});

	Paso4Fin.mouseenter(function(){
		lockPaso4.mouseenter();
		lockMouse = true;
		Caja.css('z-index',90);
		Paso4Ok.show();
		setTimeout(goTo5,1000);
	});

	$('#Paso5 #FirmaHuellaLink').click(function(){
		firmaPaso5.fadeIn(400);
		lockMouse = true;
		var offSetX = $('#Paso5').offset().left-121,
			offSetY = $('#Paso5').offset().top-218;
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
								huellaPaso5.show();
								setTimeout(goToFin,1300);
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
		if (currentPage != 6) {
			lockMouse = false;
		}
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
	Header.animate({ 'top':'-110px' },500);
	PasosMenu.removeClass('active');
	Wrapper.animate({ 'margin-left':'0%' },500);
	lockMouse = false;
	Hand.show();
	lockXmouse = false;
	Hand.removeClass()
		.addClass('Point');
}
function goTo1() {
	if (currentPage==1) return;
	currentPage = 1;
	lockMouse = false;
	PasosMenu.removeClass('active');
	Paso1.addClass('active');
	Wrapper.animate({ 'margin-left':'-100%' },500);
	Header.animate({ 'top':'0px' },500);
	Hand.removeClass();
	Hand.addClass('Point');
}
function goTo2() {
	if (currentPage==2) return;
	currentPage = 2;
	lockMouse = false;
	PasosMenu.removeClass('active');
	Paso2.addClass('active');
	Wrapper.animate({ 'margin-left':'-200%' },500);
	Hand.removeClass();
	Hand.addClass('Cedula');
	$('#Paso2 .ShowOk').hide();
}
function goTo3() {
	if (currentPage==3) return;
	currentPage = 3;
	lockMouse = false;
	PasosMenu.removeClass('active');
	Paso3.addClass('active');
	Wrapper.animate({ 'margin-left':'-300%' },500);
	Hand.removeClass();
	Hand.addClass('Firma');
	$('#Paso3 .BoletaShow > div > div').removeClass('active');
	votos = 0;

	$('#Paso3Back').stop().hide();
	$('#Paso3 #EntregaBoleta')
		.stop()
		.css({top:'-300px',opacity:'0.0'})
		.animate({top:'-70px',opacity:'1.0'},1000)
		.animate({top:'-60px'},200,
		function(){
			$('#Paso3Back').fadeIn(1000);
		})
		.animate({top:'-300px',opacity:'0.0'},1000);
}
function goTo4() {
	if (currentPage==4) return;
	currentPage = 4;
	lockMouse = false;
	PasosMenu.removeClass('active');
	Paso4.addClass('active');
	Wrapper.animate({ 'margin-left':'-400%' },500);
	Hand.removeClass();
	Hand.addClass('Comprobante');
	Caja.css('z-index',1);
	Paso4Ok.hide();
}
function goTo5() {
	if (currentPage==5) return;
	currentPage = 5;
	lockMouse = false;
	lockXmouse = false;
	PasosMenu.removeClass('active');
	Paso5.addClass('active');
	Wrapper.animate({ 'margin-left':'-500%' },500);
	Hand.removeClass();
	Hand.addClass('Firma');
	firmaPaso5.hide();
	huellaPaso5.hide();
}
function goToFin() {
	currentPage = 6;
	Paso5.removeClass('active');
	Wrapper.animate({ 'margin-left':'-600%' },500);
	Header.animate({ 'top':'-110px' },500);
	lockMouse = true;
	Hand.hide();
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
