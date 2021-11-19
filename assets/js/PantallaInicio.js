class PantallaInicio extends Phaser.Scene {
  constructor() {
    super("inicio");
  }

  create() {
    this.add.image(960, 540, "menu");
    if (tituloplay == false) {
      titulo.play({
        volume: 0.15,
      });
    }
    const pulsar = this.add
      .image(960, 540, "jugar")
      .setInteractive({ cursor: "pointer", pixelPerfect: "true" });

    pulsar.on("pointerdown", () => {
      this.scene.start("lobby");
      this.scene.run("hudds");
      tituloplay = false;
    });
    pulsar.on("pointerover", () => {
      pulsar.setTint(0x808080);
    });
    pulsar.on("pointerout", () => {
      pulsar.clearTint();
    });

    const pulsar2 = this.add
      .image(960, 700, "creditos")
      .setInteractive({ cursor: "pointer", pixelPerfect: "true" });

    pulsar2.on("pointerdown", () => {
      this.scene.start("lobby");
    });
    pulsar2.on("pointerover", () => {
      pulsar2.setTint(0x808080);
    });
    pulsar2.on("pointerout", () => {
      pulsar2.clearTint();
    });
  }
}
