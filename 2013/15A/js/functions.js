// Variables de votacion
var votoCand,
	votoCandLabel,
	votoPartLabel;
// Variables timer
var tiempoVoto,
    min_voto,
    seg_voto,
    pausa;
// Comprobante
var comprobanteOver,
    listoComp;
// Cuaderno
var escribiendo;
// Tintas
var BlancaOver,
    AzulOver,
    BlancaOk,
    AzulOk;
// Tooltip
var logos,
	tiempoLogo,
	tiempo_wait_org = 4000;

function goToInicio () {
    
    // Inicializar
    $('#comenzar .entregaLink').show();
    $('#comenzar .entregaTuCedula').show();
    $('#comenzar #cedula_form').slideUp(0);
    $('#comenzar').css({'padding-right':'60px'});
    $('.hand_cedula').show();
    $('#portada').css({'cursor':'none'});
    $('#comenzar #ci_valor').attr('value','');
    $('#comenzar #ci_tipo').attr('value','V');
    $('#comenzar #ci_tipo_show').text('V-');
    $('#error_msg_ci').html('');
    $('.hand_cedula').hide();
    $('#saltar_info').hide();
    
    pausa = false;
    
    // Animacion
    $('#wrapper').animate({marginLeft:'0%'},1000, function(){
		$('.hand:not(.hand_cedula)').hide();
	});
    
    clearInterval(tiempoVoto);
}

function goTo1 () {

    // Inicializar
    $('.huella').hide();
    $('#hand_PresidenteMesa').hide();
    $('#indicacionesHuella').hide();
    $('.back_paso1').hide();
    $('.info_paso1').hide();
    
    pausa = false;

    // ANIMACION
    $('#wrapper').animate({marginLeft:'-100%'},1000, function(){
		$('.hand:not(.thumb)').hide();
	});
    $('#hand_PresidenteMesa').css({'left':'-53px','top':'-56px'});
    setTimeout(function(){
        $('#hand_PresidenteMesa').fadeIn('slow')
                                 .animate({'left':'-4px','top':'-17px'},300)
                                 .animate({'left':'-24px','top':'-10px'},300)
                                 .animate({'left':'-13px','top':'-28px'},300)
                                 .animate({'left':'-40px','top':'-30px'},300)
                                 .animate({'left':'-4px','top':'-17px'},300)
                                 .animate({'left':'5px','top':'-35px'},300)
                                 .animate({'left':'-13px','top':'-28px'},300)
                                 .animate({'left':'5px','top':'-35px'},300)
                                 .animate({'left':'-53px','top':'-56px'},300);
    },1000);
    setTimeout(function(){
        $('#indicacionesHuella').fadeIn(1000);
    },2000);
}

function goTo2 () {
    
    // Inicializar
    $('.MaquinasVotacion').css('cursor','none');
    $('.showTextoFin').hide();
    $('#led').hide();
    $('.Pantalla > .duringVote').show();
    $('.Pantalla > .duringVote .showNadie').show();
    $('.Pantalla > .duringVote .showVoto').removeClass('CandidataScreen');
    $('.Pantalla > .duringVote .showVoto').removeClass('CandidatoScreen');
    $('.Pantalla > .duringVote > .showPartido').text("Partido");
    $('.Pantalla > .duringVote > .showCandidato').text("Candidato");
    $('.botonVotarLink').show();
    $('.mensajeError').hide();
    $('.mESeleccionar').hide();
    $('.mEVotar').hide();
    $('.Pantalla > .showTextoFin').hide();
    $('#TarjetonReal').hide();
    $('.clock > .clock_ms').removeClass('clock_ms_done');
    $('.clock > .texto_clock:first').text("Te quedan");
    $('.clock > .texto_clock:last').html("minutos para votar !");
    $('.ComprobanteAnim').css('background-position','168px 0px');
    $('.TarjetonLink').show();
    $('.nuloLink').show();
    $('.back_paso2').hide();
    $('.info_paso2').hide();
    
    votoCand = false;
    pausa = false;
    
    // ANIMACION
    $('#wrapper').animate({marginLeft:'-200%'},1000, function(){
		$('.hand:not(.point)').hide();
	});
    
    // TIEMPO
    clearInterval(tiempoVoto);
    min_voto = 6;
    seg_voto = 0;
    tiempoVoto = setInterval(function(){
        if (!pausa) {
            seg_voto--;
            if (seg_voto == -1) {
                seg_voto = 59;
                min_voto--;
                if (min_voto == -1) {
                    min_voto = 0;
                    seg_voto = 0;
                    votoFin();
                }
            }
            if (min_voto!=0 || seg_voto!=0)
                $('.clock > .clock_ms').text(min_voto+":"+(seg_voto < 10 ? "0" : "")+seg_voto);
        }
    },1000);
}

function goTo3 () {

    // Inicializar
    listoComp = true;
    comprobanteOver = false;
    pausa = false;
    
    $('.Caja').css('z-index',1);
    $('.CajaTop').css('cursor','auto');
    $('.CompOk').hide();
    $('.moveComp').hide();
    $('#mensaje3').hide();
    $('.hand_comprobante').hide();
    $('.back_paso3').hide();
    $('.info_paso3').hide();
    
    var cand_res = (votoCand ? votoCandLabel : 'Voto nulo'),
        part_res = (votoCand ? votoPartLabel : 'Voto nulo');
    $('#mensaje3 .datosVota').html("Presidente(a): <b>"+cand_res
                                    +"<br></b>Partido: <b>"+part_res);

    // ANIMACION
    $('#wrapper').animate({marginLeft:'-300%'},1000, function(){
		$('.hand:not(.hand_comprobante)').hide();
	});
    setTimeout(function(){
        $('#mensaje3').fadeIn("fast");
        $('.back_paso3').fadeIn("fast");
    },1000);
}

function goTo4 () {

    // Inicializar
    escribiendo = false;
    $('#hand_cuaderno').removeClass('thumb')
                       .addClass('hand_firma');
    $('#firma').hide();
    $('#huella').hide();

    // ANIMACION
    $('#wrapper').animate({marginLeft:'-400%'},1000, function(){
		$('.hand:not(.hand_firma)').hide();
	});
}

function goTo5 () {

    // Inicializar
    $('.BlancaOk').hide();
    $('.AzulOk').hide();
    $('.dedoManchado').hide();
    $('#indicacionesTinta > div').html("M&aacute;nchate el dedo con<br><span>Desengrasante</span");
    $('#indicacionesTinta').css('backgroundPosition','bottom left');
    BlancaOk = false;
    AzulOk = false;
    BlancaOver = false;
    AzulOver = false;

    // ANIMACION
    $('#wrapper').animate({marginLeft:'-500%'},1000, function(){
		$('.hand:not(.hand_dedo)').hide();
	});
}

function goToEnd () {

    // Inicializar
    $('#creditos').hide();
    $('#contacto').hide();
    $('.back_general').hide();

    // ANIMACION
    $('#wrapper').animate({marginLeft:'-600%'},1000, function(){
		$('.hand').hide();
		tiempoLogo = setTimeout(function(){
			mostrarORG(0);
		}, tiempo_wait_org);
	});
}

function mostrarORG (ind) {
	$(logos[(ind==0 ? logos.length-1 : ind-1)])	.tooltip('hide');
	$(logos[ind])								.tooltip('show');
	ind = ((ind+1) % logos.length);
	tiempoLogo = setTimeout(function(){
		mostrarORG(ind);
	}, tiempo_wait_org);
}

function votoFin () {
    clearInterval(tiempoVoto);
    var new_seg = 360 - min_voto*60 - seg_voto;
    var new_min = Math.floor(new_seg/60);
    new_seg = new_seg%60;
    
    $('.clock > .clock_ms').addClass('clock_ms_done').text(new_min+":"+(new_seg < 10 ? "0" : "")+new_seg);
    $('.clock > .texto_clock:first').text("Votaste en");
    $('.clock > .texto_clock:last').text("minutos !");
    
    $('.TarjetonLink').hide();
    $('.nuloLink').hide();
    $('.Pantalla > .duringVote').hide();
    $('.botonVotarLink').hide();
    $('.mensajeError').hide();
    $('.mESeleccionar').hide();
    $('.mEVotar').hide();
    $('.Pantalla > .showTextoFin').show();
    
    ComprobanteAnim();
}

function ComprobanteAnim () {
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

$(document).ready(function() {

	// Inicializar Logos
	logos = $('#REC_orgs > a');

	// Wait for images to load
	var img_loaded = 0;
	$('.needed').each(function(){
		var bg = $(this).css('background-image');
		if (bg) {
			var src = bg.replace(/(^url\()|(\)$|[\"\'])/g, '');
			$('<img>').attr('src', src).on('load', function() {
				img_loaded++;
				if (img_loaded == 7) {
					$('#spin').remove();
					goToInicio();
				}
			});
		}
	});

	// Share
	sharedNumber();
    
	// Mas Informacion 'inic'
    $('.mas_info').hide();
    $('.back_window').hide();
	$('.mas_info').each(function(){
        var y = -$(this).height()/2,
            x = -$(this).width()/2;
        $(this).css({'marginTop' : y, 'marginLeft' : x});
    });
    
	// Mas informacion 'paso'
    $('.mas_info_button_paso1').click(function(){
        $('.info_paso1').fadeIn('fast');
        $('.back_paso1').fadeIn('fast');
        pausa = true;
    });
    $('.mas_info_button_paso2').click(function(){
        $('.info_paso2').fadeIn('fast');
        $('.back_paso2').fadeIn('fast');
        pausa = true;
    });
    $('.mas_info_button_paso3').click(function(){
        $('.info_paso3').fadeIn('fast');
        $('.back_paso3').fadeIn('fast');
        pausa = true;
    });
	$('.se_voluntario').click(function(){
		$('.todo_ok_submit_voluntario').hide();
        $('.form_voluntario_wrapper').fadeIn('fast');
        $('.back_general').fadeIn('fast');
        pausa = true;
    });

	function done_voluntario() {
		$('.todo_ok_submit_voluntario').slideDown(600);
		setTimeout(function(){
			$('.form_voluntario_wrapper.mas_info .cerrar_mas_info').click();
		},2500);
	}

	$('#submit_voluntario').click(function(){
		$.ajax({
			type: "POST",
			url: "https://docs.google.com/forms/d/1Y0ibzVKOPKbTuITsIA0jHTeoocHXnU3pVHpu9rE8_ng/formResponse",
			data: {"entry.1185635224": $('#form_voluntario > [name="entry.1185635224"]').val(),
				"entry.243161664": $('#form_voluntario > [name="entry.243161664"]').val(),
				"entry.1111899001": $('#form_voluntario > [name="entry.1111899001"]').val()}
		}).done(done_voluntario);
		setTimeout(done_voluntario,500);
	});
    
	// Mas info cerrar
    $('.mas_info .cerrar_mas_info').click(function(){
        $(this).parent().parent().fadeOut('fast');
        $(this).parent().parent().parent().children('.back_window').fadeOut('fast');
        pausa = false;
    });
    
	// Se "entrega" la cedula
    $('#comenzar .entregaLink').click(goTo1);
    
    // Acciones MENU
    $('.inicio').click(goToInicio);
    $('.goTo1, .goTo2, .goTo3, .goTo4, .goTo5').click(function(){
        clearInterval(tiempoVoto);
        var seccion_pagina = $(this).text();
        if (seccion_pagina==1)
            goTo1();
        else if (seccion_pagina==2)
            goTo2();
        else if (seccion_pagina==3)
            goTo3();
        else if (seccion_pagina==4)
            goTo4();
        else
            goTo5();
    });
    
    // HUELLA
    $('.huellaLink').click(function(){
        $('.huella').show();
        setTimeout(function(){
            $('#hand_PresidenteMesa').animate({'left':'-66px','top':'-18px'},200);
        },800);
        setTimeout(goTo2,1200);
    });
    
    // CANDIDATOS
    $('.CandidatoLink').click(function(){
        var thisOne = $(this),
            led     = $('#led'),
            candidat = "Nulo";
        var newTop  = thisOne.position().top+38,
            newLeft = thisOne.position().left+22;
        var valoresVoto = $(this).attr('title').split(" | ");
        
        votoCandidato = valoresVoto[0];
        votoPartido = valoresVoto[1];
		votoCandLabel = votoCandidato;
		votoPartLabel = votoPartido;
        candidat = (valoresVoto[0].split(" "))[0];
        votoCand = true;
        led.css({'top':newTop,'left':newLeft});
        led.show();
        
        $('.Pantalla > .duringVote .showPartido').text(votoPartido);
        $('.Pantalla > .duringVote .showCandidato').text(votoCandidato);
        $('.Pantalla > .duringVote .showVoto').removeClass('CandidataScreen');
        $('.Pantalla > .duringVote .showVoto').removeClass('CandidatoScreen');
        $('.Pantalla > .duringVote .showNadie').hide();
        $('.Pantalla > .duringVote .showVoto').addClass(candidat+'Screen');
    });
    $('.nuloLink').click(function(){
        votoCand = false;
        $('.Pantalla > .duringVote .showVoto').removeClass('CandidataScreen');
        $('.Pantalla > .duringVote .showVoto').removeClass('CandidatoScreen');
        $('.Pantalla > .duringVote .showNadie').show();
        $('#led').hide();
    });
    
    // VOTAR
    $('.botonVotarLink').click(function(){
        if (votoCand) {
            votoFin();
        } else {
            $('.botonVotarLink').hide();
            $('.mensajeError').fadeIn("fast");
            $('.mESeleccionar').show();
            $('.mEVotar').show();
        }
    });
    
    // VOTAR ANYWAY
    $('.mEVotar').click(votoFin);
    
    // SELECCIONAR
    $('.mESeleccionar').click(function(){
        $('.botonVotarLink').show();
        $('.mensajeError').fadeOut("fast");
        $('.mESeleccionar').hide();
        $('.mEVotar').hide();
    });
    
    // TARJETON
    $('#verTarjetonLink').click(function(){
        $('#TarjetonReal').fadeIn("fast");
        $('.back_paso2').fadeIn("fast");
        $('.MaquinasVotacion').css('cursor','auto');
        $('.point').hide();
        pausa = true;
    });
    $('#cerrarTarjeton').click(function(){
        $('#TarjetonReal').fadeOut("fast");
        $('.MaquinasVotacion').css('cursor','none');
        $('.back_paso2').fadeOut("fast");
        pausa = false;
    });
    
    // CERRAR MENSAJE
    $('#mensaje3 .cerrarMensaje').click(function(){
        $('#mensaje3').fadeOut("fast");
        $('.moveComp').show();
        $('.CajaTop').css('cursor','none');
        $('.back_paso3').fadeOut("fast");
        listoComp = false;
    });
    
    // FIN
    $('.VolverAIntentarlo').click(function(){
		clearInterval(tiempoLogo);
		goToInicio();
	});
    $('#credito_link').click(function(){
        $('#contacto').fadeOut("fast");
        $('#creditos').fadeIn("fast");
        $('.back_general').fadeIn('fast');
    });
    $('#creditos #cerrarCred').click(function(){
        $('#creditos').fadeOut("fast");
        $('.back_general').fadeOut('fast');
    });
    $('#contacto_link').click(function(){
        $('#creditos').fadeOut("fast");
        $('#contacto').fadeIn("fast");
        $('.back_general').fadeIn('fast');
    });
    $('#contacto #cerrarCont').click(function(){
        $('#contacto').fadeOut("fast");
        $('.back_general').fadeOut('fast');
    });
    
    // MOUSE
    var hand_cedula = $('.hand_cedula'),
        hand_thumb = $('.thumb'),
        hand_point = $('.point'),
        hand_comprobante = $('.hand_comprobante'),
        hand_dedo = $('.hand_dedo'),
        hand_cuaderno = $('#hand_cuaderno');
    $('#Portada').parent().mousemove(function(e){
        if (!pausa)
            hand_cedula.stop().show().css('top', e.pageY-90).css('left', e.pageX-50);
    });
    $('.Lector').parent().mousemove(function(e){
        if (!pausa) {
            if (e.pageY >= 90)
                hand_thumb.stop().show().css('top', e.pageY-10).css('left', e.pageX-18);
            else
                hand_thumb.stop().hide();
        }
    });
    $('.MaquinasVotacion').parent().mousemove(function(e){
        if (!pausa) {
            if (e.pageY >= 90)
                hand_point.stop().show().css('top', e.pageY-8).css('left', e.pageX-10);
            else
                hand_point.stop().hide();
        }
    });
    var Caja = $('.Caja'),
        CajaTop = $('.CajaTop'),
        moveComp = $('.moveComp');
    CajaTop.parent().mousemove(function(e){
        if (!listoComp && !pausa) {
            var fixedLeft;
            if (comprobanteOver)
                fixedLeft = CajaTop.offset().left+moveComp.position().left-30;
            else
                fixedLeft = e.pageX-45;
            if (e.pageY >= 90)
                hand_comprobante.stop().show().css('top', e.pageY-47).css('left', fixedLeft);
            else
                hand_comprobante.stop().hide();
        }
    });
    moveComp.mouseenter(function(e){
        if (!listoComp) {
            Caja.css('z-index',20);
            comprobanteOver = true;
        }
    });
    moveComp.mouseleave(function(e){
        if (!listoComp) {
            Caja.css('z-index',1);
            comprobanteOver = false;
        }
    });
    $('.CompFin').mouseenter(function(e){
        listoComp = true;
        Caja.css('z-index',20);
        var fixedLeft = CajaTop.offset().left+moveComp.position().left-30;
        hand_comprobante.stop().show().css('left', fixedLeft);
        $('.CompOk').show();
        setTimeout(goTo4,1000);
    });
    $('.CompFin').parent().click(function(){
        $('.CompFin').mouseenter();
    });
    
    var Cuaderno = $('.Cuaderno');
    Cuaderno.parent().mousemove(function(e){
        if (!escribiendo) {
            if (e.pageY >= 90)
                hand_cuaderno.stop().show().css('top', e.pageY-80).css('left', e.pageX-5);
            else
                hand_cuaderno.stop().hide();
        }
    });
    $('#FirmaHuellaLink').click(function(){
        $('#firma').fadeIn(500);
        escribiendo = true;
        var offSetX = Cuaderno.offset().left,
            offSetY = Cuaderno.offset().top;
        hand_cuaderno.animate({'top':(151+offSetY)+'px','left':(385+offSetX)+'px'},100)
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
                         // Animacion Completa
                         hand_cuaderno.animate({'opacity':0},600,function(){
                             hand_cuaderno.removeClass('hand_firma')
                                          .addClass('thumb')
                                          .animate({'opacity':1},600,function(){
                                              hand_cuaderno.animate({'top':(205+offSetY)+'px','left':(420+offSetX)+'px'},100,
                                              function(){
                                                  setTimeout(function(){
                                                      hand_cuaderno.animate({'top':(230+offSetY)+'px','left':(470+offSetX)+'px'},400);
                                                      $('#huella').show();
                                                      setTimeout(goTo5,1300);
                                                  },500);
                                              });
                                          });
                         });
        });
    });
    
    var tintasAlert = $('.tintaAzul, .tintaBlanca'),
        tintaA = $('.tintaAzul'),
        tintaB = $('.tintaBlanca'),
        tintasCover = $('.TintasTop'),
        tintas = $('.Tintas');
    tintasAlert.mouseenter(function(e){
        tintasCover.css('z-index',20);
    }).mouseleave(function(e){
        tintasCover.css('z-index',1);
    });
    tintaB.mouseenter(function(e){
        BlancaOver = true;
    }).mouseleave(function(e){
        BlancaOver = false;
    }).click(function(){
        $('.tintaBlancaFin').mouseenter();
    });
    tintaA.mouseenter(function(e){
        AzulOver = true;
    }).mouseleave(function(e){
        AzulOver = false;
    }).click(function(){
        $('.tintaAzulFin').mouseenter();
    });
    $('.tintaBlancaFin').mouseenter(function(e){
        $('.BlancaOk').show();
        $('#indicacionesTinta > div').html("Ahora <b style='color:#333;'>limp&iacute;ate el dedo</b> y m&aacute;nchalo con<br><span>Tinta Indeleble</span");
        $('#indicacionesTinta').css('backgroundPosition','bottom right');
        BlancaOk = true;
    });
    $('.tintaAzulFin').mouseenter(function(e){
        if (BlancaOk) {
            $('.AzulOk').show();
            $('.dedoManchado').fadeIn();
            setTimeout(goToEnd,1600);
        }
    });
    tintas.parent().mousemove(function(e){
        if (!AzulOk) {
            var fixedLeft;
            if (BlancaOver)
                fixedLeft = tintas.offset().left+tintaB.position().left-105;
            else if (AzulOver)
                fixedLeft = tintas.offset().left+tintaA.position().left-105;
            else
                fixedLeft = e.pageX-125;

            if (e.pageY >= 90)
                hand_dedo.stop().show().css('top', e.pageY-300).css('left', fixedLeft);
            else
                hand_dedo.stop().hide();
        }
    });

	$('div#REC_orgs > a').hover(function(){
		$(this).tooltip('show');
	});
    
});
