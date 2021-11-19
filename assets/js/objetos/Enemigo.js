class Enemigo extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, "rata");

    config.scene.add.existing(this);
    config.scene.physics.world.enableBody(this);
    this.body.setCollideWorldBounds(true);
    this.setScale(1.5)

  }

  movimiento() {
    if (moverIZQ == true) {
      this.body.setVelocityX(-90);
      this.anims.play("izqrata", true);

    } else  {
      this.body.setVelocityX(90);
      this.anims.play("derrata", true);

  }
  }
}
