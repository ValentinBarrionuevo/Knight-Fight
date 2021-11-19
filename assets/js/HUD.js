var textopociones;
var scoretexto;
var tiempotexto;
var tutopegar;
var tutopocion;
var tutobola;
class HUD extends Phaser.Scene {
  constructor() {
    super("hud");
  }

  create() {
    vida1 = this.add.image(100, 80, "vida");
    vida2 = this.add.image(170, 80, "vida");
    vida3 = this.add.image(240, 80, "vida");
    vida4 = this.add.image(310, 80, "vida");

    this.add.image(100, 180, "pocion").setScale(1.4);
    textopociones = this.add.text(120, 170, "x" + pociones, {
      fontSize: 40,
    });

    this.add.image(1730, 80, "moneda").setScale(1.2);
    scoretexto = this.add.text(1760, 63, " = " + score, {
      fontSize: 40,
    });

    timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    });
    tiempotexto = this.add.text(800, 70, "Tiempo:" + tiempo, {
      fontSize: 40,
    });

    tutopegar = this.add.text(100, 900, "Pulsa Z para Atacar", {
      fontSize: 40,
    });

    tutobola = this.add.text(100, 900, "Pulsa X para hacerte chiquito", {
      fontSize: 40,
    });
    tutobola.visible = false;

    tutopocion = this.add.text(100, 950, "Pulsa C para utilizar una Pocion", {
      fontSize: 40,
    });
  }
  update() {
    textopociones.setText("x" + pociones);
    scoretexto.setText("=" + score);
    tiempotexto.setText("Tiempo:" + tiempo);

    if (BolaObtenida == true) {
      tutobola.visible = true;
      this.time.addEvent({
        delay: 5000, // ms
        callback: () => {
          tutobola.visible = false;
        },
        loop: false,
      });
    }

    this.time.addEvent({
      delay: 8000, // ms
      callback: () => {
        (tutopegar.visible = false), (tutopocion.visible = false);
      },
      loop: false,
    });

    if (hp == 20) {
      vida4.visible = true;
    } else if (hp == 15) {
      vida4.visible = false;
      vida3.visible = true;
    } else if (hp == 10) {
      vida3.visible = false;
      vida2.visible = true;
    } else if (hp == 5) {
      vida2.visible = false;
      vida1.visible = true;
    } else {
      vida1.visible = false;
    }
  }

  onSecond() {
    if (!gameOver) {
      tiempo = tiempo - 1; // One second

      if (tiempo == 0) {
        timedEvent.paused = true;
        gameover.gameOver();
      }
    }
  }

  gameOver() {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    var gameOverButton = this.add
      .image(700, 500, "gameover")
      .setInteractive()
      .on("pointerdown", () => this.scene.start("creditos"));
    Phaser.Display.Align.In.Center(
      gameOverButton,
      this.add.zone(400, 300, 800, 600)
    );
  }
}
