var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

var $paleta = $("#paleta"),
    $grillaPixeles = $("#grilla-pixeles"),
    $indicadorColor = $("#indicador-de-color"),
    colorPersonalizado = document.getElementById('color-personalizado'),
    mouseApretado = false;


function nuevaPaleta(){
  for (var i = 0; i < nombreColores.length; i++) {
    var nuevoColor = $("<div>");
    nuevoColor.addClass("color-paleta").css("background-color",nombreColores[i]);
    $paleta.append(nuevoColor);
  };
};
nuevaPaleta();

function  crearGrilla(){
  for (var i = 0; i < 1750; i++) {
    var nuevoPixel =$("<div>");
    $grillaPixeles.append(nuevoPixel);
  };
};
crearGrilla();

function seleccionarColor(){
  $("#paleta div").click(function(e){
    $("#indicador-de-color").css("background-color", e.target.style.backgroundColor);
  });
};
seleccionarColor();

function pintarPixel(){
  $("#grilla-pixeles div").click(function(e) {
   e.target.style.backgroundColor = $("#indicador-de-color").css("background-color");
 });
};
pintarPixel();

colorPersonalizado.addEventListener('change',
  (function() {

    colorActual = colorPersonalizado.value;
    $("#indicador-de-color").css("background-color", colorActual);
  })
)

function pintarEnMovimiento(e){
  if (mouseApretado) {
    console.log('aca deberia estar pintando el aerosol');
    e.target.style.backgroundColor = $("#indicador-de-color").css("background-color");
  };
}
  pintarEnMovimiento();

$("#grilla-pixeles div").mousedown(activarMovimiento);
$("#grilla-pixeles div").mouseup(desactivarMovimiento);
$("#grilla-pixeles").mouseleave(desactivarMovimiento);

function activarMovimiento(){
    console.log('activarMovimiento');
    mouseApretado = true;
}
function desactivarMovimiento(){
    console.log('desactivarMovimiento');
    mouseApretado = false;
}
$("#grilla-pixeles div").mousemove(pintarEnMovimiento);
console.log(mouseApretado);

function borrarPantalla(){
  $("#borrar").click(function(){
    $("#grilla-pixeles div").animate({"background-color":"white"},1000);
  })
}
borrarPantalla();

function cargarSuperheroe(superheroe) {
  var $pixeles = $("#grilla-pixeles div");
  for (var i = 0; i < superheroe.length; i++) {
    $pixeles[i].style.backgroundColor = superheroe[i];
  }
}

function queSuperheroe(){
  $("ul.imgs li img").click(function() {
    switch($(this).attr('id')){
      case "wonder":
        cargarSuperheroe(wonder);
      break;
      case "batman":
        cargarSuperheroe(batman);
      break;
      case "flash":
        cargarSuperheroe(flash);
      break;
      case "invisible":
        cargarSuperheroe(invisible);
      break;
    }
  });
}
queSuperheroe();

function guardarPixelArt() {
  html2canvas($("#grilla-pixeles") , {
    onrendered: function(canvas) {
      theCanvas = canvas;
      canvas.toBlob(function(blob) {
        saveAs(blob, "pixel-art.png");
      });
    }
  });
}

$("#guardar").click(function(){
  guardarPixelArt();
})
