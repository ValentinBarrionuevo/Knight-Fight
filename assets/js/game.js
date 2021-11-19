var config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    width: 1920,
    height: 1080,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 400 },
      debug: true,
    },
  },
  scene: [
    Preload,
    PantallaInicio,
    Lobby,
    Castillo,
    Cueva,
    Creditos,
    HUD,
    GameOver,
    Sonidos,
    Final,
  ],
};

var game = new Phaser.Game(config);

var timedEvent;
var tiempo = 300;
var mover = true;
var ataque;
var bolakey;
var pocionkey;
var gameOver;
var cursors;
var player;
var hp = 20;
var espada;
var tiempoataque = true;
var tiempo;
var enemigo;
var enemigo2;
var enemigo3;
var platforms;
var repetir = 0;
var doblesalto = false;
var tenersalto = false;
var daño1 = true;
var score = 0;
var DobleSalto = false;
var bola;
var BolaObtenida = false;
var bolausada = true;
var salto;
var tocarbola = true;
var camara;
var pocion;
var pocion2;
var pocion3;
var pociones = 2;
var pocionusada = false;
var puerta;
var jefe;
var dañojefe1 = false;
var oraculo1;
var oraculo2;
var oraculo3;
var fase = 1;
var empezar;
var orientacion;
var platforms2;
var start = true;
var dañohecho = 1;
var moverIZQ = false;
var moverIZQ2 = false;
var patron;
var drop1 = false;
var drop2 = false;
var drop3 = false;
var rubi;
var rubi2;
var rubi3;
var moneda;
var moneda2;
var moneda3;
var vida1;
var vida2;
var vida3;
var vida4;
var pocionPick;
var puntosPick;
var daño;
var morirEnemigo;
var golpear;
var jefeGrito;
var jefeMorir;
var powerup;
var usarPocion;
var usarBola;
var bolaSalir;
var titulo;
var nivel1;
var nivel2;
var nivel3;
var tituloplay=false
