$(document).ready(function() {

  $.getJSON('http://elpueblodecide16j.com/restapi/estados', function(data) {
    var estados = data.data;
    var select = $('#state');
    select.html('');
    $.each(estados, function(i, val) {
      select.append('<option value="' + val.edo + '">' + val.estado + '</option>');
    });
    sort_select(select);
  });

  $.getJSON('http://elpueblodecide16j.com/restapi/municipios?edo=99', function(data) {
    var countries = data.data;
    var select = $('#country');
    select.html('');
    $.each(countries, function(i, val) {
      select.append('<option value="' + val.mun + '">' + val.municipio + '</option>');
    });
    sort_select(select);
  });

  $('#state').change(function() {
    $('#county').hide();
    var edo = $(this).val();
    $.getJSON('http://elpueblodecide16j.com/restapi/municipios?edo=' + edo, function(data) {
      var muns = data.data;
      var select = $('#county');
      select.html('');
      $.each(muns, function(i, val) {
        select.append($("<option></option>").attr("value",val.mun).text(val.municipio));
      });
      sort_select(select);
    });
  });

  $('#county').change(function() {
    clear_results();
    var mun = $(this).val();
    get_results(mun);
  });

  $('#country').change(function() {
    clear_results();
    var pais = $('#country').val();
    get_country_results(pais);
  });

  $('#search .btn').click(function(e) {
    e.preventDefault();
    clear_results();
    $('#search').animate({ opacity : 0 }, 400, function() {
      $('#search').delay(100).slideUp();
      $('#state').prop('selectedIndex',0);
      $('#county').hide();
    });
    $('#overseas').css({opacity : 1 }).fadeIn(300);
  });

  $('#overseas .btn').click(function(e) {
    e.preventDefault();
    clear_results();
    $('#overseas').animate({ opacity : 0 }, 400, function() {
      $('#overseas').delay(100).slideUp();
      $('#country').prop('selectedIndex',0);
    });
    $('#search').css({opacity : 1 }).fadeIn(300);
  });

  $('#email').on('focus keyup keydown', function() {
    error = 0;
    if ( $(this).siblings('span').length ) {
      $('#reg-form').find('span').fadeOut(300, function() {
        $(this).remove();
      });
    }
    if ( $('p.result').length ) {
      $('p.result').fadeOut(300, function() {
        $(this).remove();
      });
    }
  });

  $('#reg-form').submit(function(event) {

    var email = $('#email').val();

    if ( email === '' || email === ' ' ) {
      error = 1;
      $('#reg-form').append('<span>Por favor, ingresa un correo electrónico</span>');
    }
    if( !isValidEmailAddress(email) ) {
      $('#reg-form').append('<span>Por favor, ingresa un correo electrónico válido</span>');
    }

    if ( error === 0 ) {

      var data = $('#reg-form').serialize();

      $.ajax({
        url : 'http://elpueblodecide16j.com/restapi/registra_email',
        type : 'POST',
        data: data,
        dataType: 'json',
        success : function(data) {
          $('#email').val('');
          $('#register .wrapper').append('<p class="result">' + data.estado + '</p>');
        }
      });
    }

    event.preventDefault();
  });

});

function isValidEmailAddress(emailAddress) {
  var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  return pattern.test(emailAddress);
};

function get_country_results(pais) {
  var results = $.getJSON('http://elpueblodecide16j.com/restapi/centros_paises?mun=' + pais, function(data) {
    var centers = $('#results').html('');
    $.each(data.data, function(item, val) {
      if ( val.centro ) {
        centers.append('<div class="result"><p>' + val.centro + '</p></div>');
      }
    });
    centers.fadeIn(500);
  });
}

function get_results(par) {
  var results = $.getJSON('http://elpueblodecide16j.com/restapi/centros_municipios?mun=' + par, function(data) {
    var centers = $('#results').html('');
    $.each(data.data, function(item, val) {
      if ( val.centro ) {
        centers.append('<div class="result"><p>' + val.centro + '</p></div>');
      }
    });
    centers.fadeIn(500);
  });
}

function clear_results() {
  $('#results').fadeOut(300);
}

function sort_select(select) {
  if ( select.attr('id') === 'state' ) {
    var text = 'Selecciona tu estado...';
  } else if ( select.attr('id') === 'county' ) {
    var text = 'Selecciona tu municipio...';
  } else {
    var text = 'Selecciona el país...';
  }
  var options = select.find('option');
  var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value }; }).get();
  arr.sort(function(o1, o2) { return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0; });
  options.each(function(i, o) {
    o.value = arr[i].v;
    $(o).text(arr[i].t);
  });
  select.html('<option val="">' + text + '</option>').append(options).prop('selectedIndex',0);
  if ( !select.is(':visible') ) {
    select.fadeIn(400);
  }
}
