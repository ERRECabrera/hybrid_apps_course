var app = {
  inicio: function(){
    this.iniciaFastClick();
  },

  iniciaFastClick: function(){
    FastClick.attach(document.body);
  },

  dispositivoListo: function(){
    navigator.geolocation.getCurrentPosition(app.pintaCoordenadasEnMapa,app.errorAlSolicitarLocalizacion);
  },

  pintaCoordenadasEnMapa: function(position){
    var miMapa = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={access_token}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      access_token: 'pk.eyJ1IjoiZXJycmUiLCJhIjoiY2oycTczNnBsMDJuNDJ4bWg3MGFocjY4biJ9.YIIDA59xkjvH2HwwPZmjmg'
    }).addTo(miMapa);

    app.pintaMarcador([position.coords.latitude, position.coords.longitude], '¡Estoy aquí!', miMapa);

    miMapa.on('click', function(evento){
      var texto = 'Marcador en l(' + evento.latlng.lat.toFixed(2) + ') y L(' + evento.latlng.lng.toFixed(2) + ')';
      app.pintaMarcador(evento.latlng, texto, miMapa);
    });
  },

  pintaMarcador: function(latlng, texto, mapa){
    var marcador = L.marker(latlng).addTo(mapa);
    marcador.bindPopup(texto).openPopup();
  },

  errorAlSolicitarLocalizacion: function(error){
    console.log(error.code+": "+error.message);
  }
};

if ('addEventListener' in document){
  document.addEventListener('DOMContentLoaded',function(){
    app.inicio();
  },false);
  document.addEventListener('deviceready',function(){
    app.dispositivoListo();
  },false);
}