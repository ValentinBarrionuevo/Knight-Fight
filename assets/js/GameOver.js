class GameOver extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  create() {
    this.add.image(960, 540, "gameoverfondo");
    nivel1.stop();
    nivel2.stop();
    nivel3.stop();
    titulo.play();
    tituloplay=true
    const pulsar = this.add
      .image(200, 1000, "menuprincipal")
      .setInteractive({ cursor: "pointer", pixelPerfect: "true" });

    pulsar.on("pointerdown", () => {
      this.scene.start("inicio");
      tiempo = 300;
      mover = true;
      hp = 20;
      tiempoataque = true;
      repetir = 0;
      doblesalto = false;
      tenersalto = false;
      daño1 = true;
      score = 0;
      DobleSalto = false;
      BolaObtenida = false;
      bolausada = true;
      tocarbola = true;
      pociones = 2;
      pocionusada = false;
      dañojefe1 = false;
      fase = 1;
      start = true;
      dañohecho = 1;
      moverIZQ = false;
      moverIZQ2 = false;
      drop1 = false;
      drop2 = false;
      drop3 = false;
    });
    pulsar.on("pointerover", () => {
      pulsar.setTint(0x808080);
    });
    pulsar.on("pointerout", () => {
      pulsar.clearTint();
    });

    const pulsar2 = this.add
      .image(1700, 1000, "reintentar")
      .setInteractive({ cursor: "pointer", pixelPerfect: "true" });

    pulsar2.on("pointerdown", () => {
      this.scene.start("lobby");
      this.scene.run("hud")
      tiempo = 300;
      mover = true;
      hp = 20;
      tiempoataque = true;
      repetir = 0;
      doblesalto = false;
      tenersalto = false;
      daño1 = true;
      score = 0;
      DobleSalto = false;
      BolaObtenida = false;
      bolausada = true;
      tocarbola = true;
      pociones = 2;
      pocionusada = false;
      dañojefe1 = false;
      fase = 1;
      start = true;
      dañohecho = 1;
      moverIZQ = false;
      moverIZQ2 = false;
      drop1 = false;
      drop2 = false;
      drop3 = false;
    });
    pulsar2.on("pointerover", () => {
      pulsar2.setTint(0x808080);
    });
    pulsar2.on("pointerout", () => {
      pulsar2.clearTint();
    });
  }
}
