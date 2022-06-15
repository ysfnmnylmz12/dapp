export class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
  }

  draw(ctx) {
    console.log(2);
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x, this.position.y, 50, 100);
  }

  update() {
    this.draw();
    this.position.y += 10;
  }
}
