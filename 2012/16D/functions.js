// Variables de votacion
var votoCand = false,
    votoLista = false,
    votoLeg1 = false,
    votoLeg2 = false,
    votoInd = false,
    hayVotoInd = false,
    haySegundoLeg = false;
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

$(window).load(function() {
    $('#spin').remove();
    goToInicio();
});

jQuery.fn.ForceNumericOnly =
function(){
    return this.each(function(){
        $(this).keydown(function(e){
            var key = e.charCode || e.keyCode || 0;
            return (
                key == 8 || 
                key == 9 ||
                key == 13 ||
                key == 46 ||
                (key >= 37 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};

function enviarCedula () {
    tipo = $('#comenzar #ci_tipo').attr('value');
    valor = $('#comenzar #ci_valor').attr('value');
    $.ajax({
        type: "GET",
        url: "http://dondevoto.net/conect.php",
        data: { ciL: tipo, ciN: valor }
    }).done(function( msg ) {
        var datos = msg.split('$');
        N = datos.length;
        if (N>=10) {
            if (datos[9]>1) {
                haySegundoLeg = true;
                $('.MaquinasVotacion').addClass('TarjetonDoble');
                $('.Candidato, .Candidata').removeClass('MenosVotos');
                $('.Hueco, .CandLink').removeClass('MenosVotosLink');
            } else {
                haySegundoLeg = false;
                $('.MaquinasVotacion').removeClass('TarjetonDoble');
                $('.Candidato, .Candidata').addClass('MenosVotos');
                $('.Hueco, .CandLink').addClass('MenosVotosLink');
            }
            
            $('img#mapa_centro').attr('src', 'http://maps.googleapis.com/maps/api/staticmap?center='+datos[11]+','+datos[12]+'&zoom=14&size=400x160&sensor=false');
            $('.datosElector .electorNombre').html(datos[0]);
            $('.datosElector .electorCI').text(datos[1]);
            $('.datos_varios .centro').html(datos[3]);
            $('.datos_varios .ubicacion').html(datos[4]);
            $('.datos_varios .ubic_estado').html(datos[5]);
            $('.datos_varios .ubic_municipio').html(datos[6]);
            $('.datos_varios .ubic_parroquia').html(datos[7]);
            $('.datos_varios .total_votos').text(datos[8]);
            $('.datos_varios .voto_leg .num_votos').text(datos[9]);
            
            $('#verTarjeton').show();
            $('#verTarjetonLink').show();
            
            if (datos[10]=='0') {
                hayVotoInd = false;
                $('#RepIndigenaWrapper').hide();
                $('#RepIndigenaLink').hide();
                $('.datos_varios .voto_ind').hide();
            } else {
                hayVotoInd = true;
                $('#RepIndigenaWrapper').show();
                $('#RepIndigenaLink').show();
                $('.datos_varios .voto_ind .num_votos').text(datos[10]);
                $('.datos_varios .voto_ind').show();
            }
            
            var datos_boleta = datos[2].split('-'),
                circuito = (datos_boleta[1]<10 ? '0' : '')+datos_boleta[1];
            var tarj1 = '<img src="http://www.cne.gob.ve/divulgacion_regional_2012/boletas/'+datos_boleta[0]+'/'+datos_boleta[0]+circuito+'1.jpg">',
                tarj2 = (haySegundoLeg ? '<img src="http://www.cne.gob.ve/divulgacion_regional_2012/boletas/'+datos_boleta[0]+'/'+datos_boleta[0]+circuito+'2.jpg">' : '')
            $('.tarjetonImagen').html(tarj1+tarj2);
            
            goToInfo();
        } else {
            $('#error_msg_ci').html(msg);
        }
    });
}

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
    $('#wrapper').animate({marginLeft:'0%'},1000);
    
    clearInterval(tiempoVoto);
    
}

function goToInfo () {
    // Animacion
    $('#wrapper').animate({marginLeft:'-100%'},1000);
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
    $('#wrapper').animate({marginLeft:'-200%'},1000);
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
    $('#ledCand').hide();
    $('#ledLista').hide();
    $('#ledLeg1').hide();
    $('#ledLeg2').hide();
    $('#ledInd').hide();
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
    $('.selectCand, .selectLista, .selectLeg1, .selectLeg2, .selectInd').attr('esVoto','');
    $('.back_paso2').hide();
    $('.info_paso2').hide();
    
    $('.showVoto > .showCand').hide();
    $('.showVoto > .showLista').hide();
    $('.showVoto > .showLeg1').hide();
    $('.showVoto > .showLeg2').hide();
    $('.showVoto > .showInd').hide();
    
    votoCand = false;
    votoLista = false;
    votoLeg1 = false;
    votoLeg2 = false;
    votoInd = false;
    pausa = false;
    
    // ANIMACION
    $('#wrapper').animate({marginLeft:'-300%'},1000);
    
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
    
    var cand_res = (votoCand ? 'Candidato(a)' : 'Voto nulo'),
        lista_res = (votoLista ? 'Partido' : 'Voto nulo'),
        leg1_res = (votoCand ? 'Candidato(a)' : 'Voto nulo'),
        leg2_res = (haySegundoLeg ? (votoCand ? ' y Candidato(a)' : ' y Voto nulo') : ''),
        ind_res = (hayVotoInd ? '</br>Rep. Ind&iacute;gena: <b>'+(votoInd ? 'Representante' : 'Voto nulo')+'</b>' : '');
    $('#mensaje3 .datosVota').html("Gobernaci&oacute;n: <b>"+cand_res
                                    +"<br></b>Voto Lista: <b>"+lista_res
                                    +"</b>"+"<br></b>Consejo Legislativo: <b>"
                                    +leg1_res+leg2_res+"</b>"+ind_res);
    // ANIMACION
    $('#wrapper').animate({marginLeft:'-400%'},1000);
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
    $('#wrapper').animate({marginLeft:'-500%'},1000);
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
    $('#wrapper').animate({marginLeft:'-600%'},1000);
}

function goToEnd () {

    // Inicializar
    $('#creditos').hide();
    $('#contacto').hide();
    $('.info_general').hide();
    $('.back_general').hide();

    // ANIMACION
    $('#wrapper').animate({marginLeft:'-700%'},1000);
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
    
    $('select#ci_tipo').change(function(){
        $('div#ci_tipo_show').text($(this).attr('value')+'-');
    });
    
    $('.mas_info').hide();
    $('.back_window').hide();
    
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
    $('.mas_info_general').click(function(){
        $('.info_general').fadeIn('fast');
        $('.back_general').fadeIn('fast');
        pausa = true;
    });
    
    $('.mas_info').each(function(){
        var y = -$(this).height()/2,
            x = -$(this).width()/2;
        $(this).css({'marginTop' : y, 'marginLeft' : x});
    });
    $('.mas_info .cerrar_mas_info').click(function(){
        $(this).parent().parent().fadeOut('fast');
        $(this).parent().parent().parent().children('.back_window').fadeOut('fast');
        pausa = false;
    });
    
    $('#comenzar .entregaLink').click(function(){
        $(this).hide();
        $('#comenzar .entregaTuCedula').hide();
        $('#comenzar').animate({paddingRight:'10px'});
        $('#comenzar #cedula_form').slideDown('fast');
        $('.hand_cedula').fadeOut('fast');
        $('#Portada').css({'cursor':'default'});
        $('#comenzar input').focus();
        $('#saltar_info').fadeIn();
        pausa = true;
    });
    $('#comenzar input').ForceNumericOnly()
                        .keypress(function (e) {
                          if (e.which == 13)
                            enviarCedula();
                        });
    $('#comenzar #cedula_button').click(enviarCedula);
    
    $('#saltar_info').click(function(){
        hayVotoInd = true;
        haySegundoLeg = true;
        $('#verTarjeton').hide();
        $('#verTarjetonLink').hide();
        $('.MaquinasVotacion').addClass('TarjetonDoble');
        $('.Candidato, .Candidata').removeClass('MenosVotos');
        $('.Hueco, .CandLink').removeClass('MenosVotosLink');
        $('#RepIndigenaWrapper').show();
        $('#RepIndigenaLink').show();
        goTo1();
    });
    
    $('#infoRE > div #continuar_pasos').click(goTo1);
    $('#infoRE > div #atras_info').click(goToInicio);
    
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
    $('.selectAll').click(function(){
        
        votoCand = false;
        votoLista = false;
        votoLeg1 = false;
        votoLeg2 = false;
        
        $('.CandLink > div').attr('esVoto','');
        $('.selectLeg1, .selectLeg2').attr('led','');
        
        var padre = $(this).parent();
        padre.find('.selectCand').click();
        padre.find('.selectLista').click();
        padre.find('.selectLeg1').click();
        if (haySegundoLeg)
            padre.find('.selectLeg2').click();
    });
    $('.selectCand').click(function(){
        if (!votoCand) {
            votoCand = true;
            var thisOne = $(this),
                led     = $('#ledCand');
            var newTop  = thisOne.position().top+35,
                newLeft = thisOne.position().left+61;
            led.css({'top':newTop,'left':newLeft});
            led.show();
            $(this).attr('esVoto','true');
            $('.showVoto > .showCand').slideDown('fast');
        } else if( $(this).attr('esVoto')=='true' ) {
            $(this).attr('esVoto','');
            $('#ledCand').hide();
            $('.showVoto > .showCand').slideUp('fast');
            votoCand = false;
        }
    });
    $('.selectLista').click(function(){
        if (!votoLista) {
            votoLista = true;
            var thisOne = $(this),
                led     = $('#ledLista');
            var newTop  = thisOne.position().top+35,
                newLeft = thisOne.position().left+61;
            led.css({'top':newTop,'left':newLeft});
            led.show();
            $(this).attr('esVoto','true');
            $('.showVoto > .showLista').slideDown('fast');
        } else if( $(this).attr('esVoto')=='true' ) {
            $(this).attr('esVoto','');
            $('#ledLista').hide();
            $('.showVoto > .showLista').slideUp('fast');
            votoLista = false;
        }
    });
    $('.selectLeg1, .selectLeg2').click(function(){
        
        var thisOne = $(this),
            led1    = $('#ledLeg1'),
            led2    = $('#ledLeg2');
        
        if( $(this).attr('esVoto')=='true' ) {
            if ( thisOne.attr('led')=='1' ) {
                thisOne.attr('led','');
                votoLeg1 = false;
                led1.hide();
                $('.showVoto > .showLeg1').slideUp('fast');
            } else {
                thisOne.attr('led','');
                votoLeg2 = false;
                led2.hide();
                $('.showVoto > .showLeg2').slideUp('fast');
            }
            thisOne.attr('esVoto','');
        } else if ( (!votoLeg1 && !votoLeg2) || (votoLeg1!=votoLeg2 && haySegundoLeg)) {
            var newTop  = thisOne.position().top+34,
                newLeft = thisOne.position().left+61;
            thisOne.attr('esVoto','true');
            
            if (!votoLeg1) {
                votoLeg1 = true;
                thisOne.attr('led','1');
                led1.css({'top':newTop,'left':newLeft});
                led1.show();
                $('.showVoto > .showLeg1').slideDown('fast');
            } else {
                votoLeg2 = true;
                thisOne.attr('led','2');
                led2.css({'top':newTop,'left':newLeft});
                led2.show();
                $('.showVoto > .showLeg2').slideDown('fast');
            }
        }
    });
    $('.selectInd').click(function(){
        if (!votoInd) {
            votoInd = true;
            var thisOne = $(this),
                led     = $('#ledInd');
            var newTop  = thisOne.position().top+26,
                newLeft = thisOne.position().left+68;
            led.css({'top':newTop,'left':newLeft});
            led.show();
            $(this).attr('esVoto','true');
            $('.showVoto > .showInd').slideDown('fast');
        } else if( $(this).attr('esVoto')=='true' ) {
            $(this).attr('esVoto','');
            $('#ledInd').hide();
            votoInd = false;
            $('.showVoto > .showInd').slideUp('fast');
        }
    });
    
    $('.nuloLink').click(function(){
        votoBool = false;
        $('.Pantalla > .duringVote .showVoto').removeClass('CandidataScreen');
        $('.Pantalla > .duringVote .showVoto').removeClass('CandidatoScreen');
        $('.Pantalla > .duringVote .showNadie').show();
        $('#led').hide();
    });
    
    // VOTAR
    $('.botonVotarLink').click(function(){
        if (votoCand && votoLista && ((haySegundoLeg && votoLeg1 && votoLeg2) || (!haySegundoLeg && (votoLeg1 || votoLeg2))) && (!hayVotoInd || votoInd)) {
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
    $('.deNuevo').click(goToInicio);
    $('.botonCreditos').click(function(){
        $('#contacto').fadeOut("fast");
        $('#creditos').fadeIn("fast");
        $('.back_general').fadeIn('fast');
    });
    $('#creditos #cerrarCred').click(function(){
        $('#creditos').fadeOut("fast");
        $('.back_general').fadeOut('fast');
    });
    $('.botonContacto').click(function(){
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
    
});
