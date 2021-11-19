class Moneda extends Phaser.GameObjects.Sprite {
    constructor(config) {
      super(config.scene, config.x, config.y, "moneda");
  
      config.scene.add.existing(this);
      config.scene.physics.world.enableBody(this);
      this.body.setCollideWorldBounds(true);
      this.visible=false
  
    }
  
  }