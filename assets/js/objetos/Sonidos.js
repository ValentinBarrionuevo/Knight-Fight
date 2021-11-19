class Sonidos extends Phaser.Scene {
  constructor() {
    super("sonidos");
  }

  create() {
    pocionPick = this.sound.add("pocionpick");
    puntosPick = this.sound.add("puntospick");
    daño = this.sound.add("daño");
    morirEnemigo = this.sound.add("morirEnemigo");
    golpear = this.sound.add("golpear");
    jefeGrito = this.sound.add("jefeGrito");
    jefeMorir = this.sound.add("jefeMorir");
    powerup = this.sound.add("powerup");
    usarPocion = this.sound.add("usarPocion");
    usarBola = this.sound.add("usarBola");
    bolaSalir = this.sound.add("bolaSalir");
    titulo = this.sound.add("titulo");
    nivel1 = this.sound.add("nivel1");
    nivel2 = this.sound.add("nivel2");
    nivel3 = this.sound.add("nivel3");
    this.scene.start("inicio");
  }
}
