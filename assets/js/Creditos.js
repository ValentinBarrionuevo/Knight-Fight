class Creditos extends Phaser.Scene {
  constructor() {
    super("creditos");
  }

  create() {
    this.add.image(960, 540, "creditosfondo");

    const pulsar = this.add
      .image(200, 1000, "menuprincipal")
      .setInteractive({ cursor: "pointer", pixelPerfect: "true" });

    pulsar.on("pointerdown", () => {
      this.scene.start("inicio");
    });
    pulsar.on("pointerover", () => {
      pulsar.setTint(0x808080);
    });
    pulsar.on("pointerout", () => {
      pulsar.clearTint();
    });
  }
}
