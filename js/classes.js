//  create class name Lego
class Lego {
  constructor({position, imageSrc}) {
    this.position = position
    this.width = 50
    this.height = 100
    this.image = new Image()
    this.image.src = imageSrc
  }

  draw() {
    context.drawImage(this.image, this.position.x, this.position.y)
  }

  update() {
    this.draw()
  }
}


//  create class name Fighter
class Fighter {
  constructor({position, velocity, color = 'red'}) {
    this.position = position
    this.velocity = velocity
    this.width = 50
    this.height = 100
    this.attackBox = {
      position: this.position,
      width: 100,
      height: -50
    }
    this.color = color
  }

  draw() {
    context.fillStyle = this.color
    context.fillRect(
      this.position.x, 
      this.position.y, 
      this.width, 
      this.height
    )
  
    // attackBox
    if (this.isAttacking) {
      context.fillStyle = 'yellow'
      context.fillRect(
        this.attackBox.position.x, 
        this.attackBox.position.y, 
        this.attackBox.width, 
        this.attackBox.height
      )
    }
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 45) {
      this.velocity.y = 0
    } else this.velocity.y += gravity
  }
}