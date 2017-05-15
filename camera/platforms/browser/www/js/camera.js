var app = {
  inicio: function(){
    this.iniciaFastClick();
    this.iniciaBotones();
  },

  _chobi: undefined,
  _img: undefined,

  iniciaFastClick: function(){
    FastClick.attach(document.body);
  },

  iniciaBotones: function(){
    var buttonAction = document.querySelector('#button-action');
    buttonAction.addEventListener('click',this.tomarFoto);

    var filterButtons = document.querySelectorAll('.button-filter');
    filterButtons[0].addEventListener('click',function(){
      app.aplicaFiltro('blackAndWhite');
    });
    filterButtons[1].addEventListener('click',function(){
      app.aplicaFiltro('negative');
    });
    filterButtons[2].addEventListener('click',function(){
      app.aplicaFiltro('sepia');
    });
    filterButtons[3].addEventListener('click',function(){
      var img = document.getElementById('foto');
      app.loadImage(img);
    });
  },

  tomarFoto: function(){
    var opciones = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      targetWidth: 300,
      targetHeight: 300,
      correctOrientation: true
    };
    navigator.camera.getPicture(app.fotoTomada,app.errorAlTomarFoto,opciones);
  },

  fotoTomada: function(imageURI){
    img = document.getElementById('foto');
    img.onload = function(){
      app.pintarFoto(img);
    };
    img.src = imageURI;
  },

  loadImage: function(img){
    app._chobi = new Chobi(img);
    app._chobi.ready(function(){
      this.canvas = document.getElementById("canvas");
      this.loadImageToCanvas();
    });
  },

  pintarFoto: function(img){
    app.loadImage(img);
  },

  errorAlTomarFoto: function(message){
    console.log('Fallo al tomar foto o toma cancelada: '+ message)
  },

  aplicaFiltro: function(filterName){
    app._chobi[filterName]();
    app._chobi.loadImageToCanvas();
  }
};

if ('addEventListener' in document){
  document.addEventListener('DOMContentLoaded',function(){
    app.inicio();
  },false);
}