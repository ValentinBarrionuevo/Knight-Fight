class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("menu", "./assets/image/pantallamenu.png");
    this.load.image("nivel1", "./assets/image/nivel1.png");
    this.load.image("nivel2", "./assets/image/nivel2.png");
    this.load.image("ground", "./assets/image/platform.png");
    this.load.image("piso2", "./assets/image/suelolvl2.png");
    this.load.image("plataforma2", "./assets/image/plataforma2.png");
    this.load.image("pocion", "./assets/image/pocion.png");
    this.load.image("puerta", "./assets/image/puerta.png");
    this.load.image("bola", "./assets/image/bola.png");
    this.load.image("salto", "./assets/image/salto.png");
    this.load.image("rubi", "./assets/image/rubi.png");
    this.load.image("oraculo", "./assets/image/esmeralda.png");
    this.load.image("moneda", "./assets/image/moneda.png");
    this.load.image("tiles", "./assets/image/cave.png");
    this.load.image("vida", "./assets/image/corazon.png");
    this.load.image("nivel3", "./assets/image/nivel3.png");
    this.load.image("jugar", "./assets/image/botonjugar.png");
    this.load.image("creditos", "./assets/image/botoncred.png");
    this.load.image("menuprincipal", "./assets/image/botonmenu.png");
    this.load.image("creditosfondo", "./assets/image/creditos.png");
    this.load.image("gameoverclick", "./assets/image/gameoverclick.png");
    this.load.image("gameoverfondo", "./assets/image/gameover.png");
    this.load.image("reintentar", "./assets/image/botonreint.png");
    this.load.image("final", "./assets/image/fin.png");


    this.load.audio("pocionpick", "./assets/sound/agarrarpocion.ogg");
    this.load.audio("puntospick", "./assets/sound/agarrarpuntos.ogg");
    this.load.audio("daño", "./assets/sound/daño.ogg");
    this.load.audio("morirEnemigo", "./assets/sound/enemigomorir.ogg");
    this.load.audio("golpear", "./assets/sound/golpear.ogg");
    this.load.audio("jefeGrito", "./assets/sound/jefeEmpezar.ogg");
    this.load.audio("jefeMorir", "./assets/sound/morirjefe.ogg");
    this.load.audio("powerup", "./assets/sound/powerup.ogg");
    this.load.audio("usarPocion", "./assets/sound/usarpocion.ogg");
    this.load.audio("usarBola", "./assets/sound/usarbola.ogg");
    this.load.audio("bolaSalir", "./assets/sound/bolano.ogg");
    this.load.audio("titulo", "./assets/sound/titulo.ogg");
    this.load.audio("nivel1", "./assets/sound/nivel1.ogg");
    this.load.audio("nivel2", "./assets/sound/nivel2.ogg");
    this.load.audio("nivel3", "./assets/sound/nivel3.ogg");



    this.load.tilemapTiledJSON("cueva", "./assets/json/nivel3.json");


    this.load.spritesheet("espada", "./assets/image/golpe.png", {
      frameWidth: 74,
      frameHeight: 80,
    });

    this.load.spritesheet("dude", "./assets/image/dude.png", {
      frameWidth: 41,
      frameHeight: 83,
    });

    this.load.spritesheet("jefe1", "./assets/image/jefe.png", {
      frameWidth: 39,
      frameHeight: 83,
    });

    this.load.spritesheet("rata", "./assets/image/enemyrat.png", {
      frameWidth: 29,
      frameHeight: 30,
    });
  }

  create() {

    this.anims.create({
      key: "hit",
      frames: this.anims.generateFrameNumbers("espada", { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "leftidle",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "rightidle",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left1",
      frames: this.anims.generateFrameNumbers("jefe1", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "leftidle1",
      frames: this.anims.generateFrameNumbers("jefe1", { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn1",
      frames: [{ key: "jefe1", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right1",
      frames: this.anims.generateFrameNumbers("jefe1", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "rightidle1",
      frames: this.anims.generateFrameNumbers("jefe1", { start: 5, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "izqrata",
      frames: this.anims.generateFrameNumbers("rata", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });


    this.anims.create({
      key: "derrata",
      frames: this.anims.generateFrameNumbers("rata", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.start("sonidos");
    // Funcion FLECHA
    // (param1, param2, …, paramN) => { sentencias }
    // (param1, param2, …, paramN) => expresion
    // Equivalente a: () => { return expresion; }
  }
}
