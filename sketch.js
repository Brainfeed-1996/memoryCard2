let faceUpCards
let faceDownCard

let deck = []
let tiles = []
let flippedCards = []

let cooldown = null

const rows = 3
const columns = 4

class Tile{
  constructor(x, y, faceUpImage){
    this.x = x
    this.y = y
    this.width = 250
    this.height = 250
    this.faceUpImage = faceUpImage
    this.faceDownImage = faceDownCard
    this.isFaceUp = false
  }
  
  render(){
    fill(93, 81, 124)
    stroke(0, 0, 0)
    strokeWeight(4)
    rect(this.x, this.y, this.width, this.width, 20)
   
    if(this.isFaceUp){
       image(this.faceUpImage, this.x, this.y, this.width, this.width)
    }
    else{
      image(this.faceDownImage, this.x, this.y, this.width, this.width)
    }
  }


  setIsFaceUp(isFaceUp){
    this.isFaceUp = isFaceUp
  }

  isUnderMouse(x, y){
    return x >= this.x && x < this.x + this.width && y >= this.y && y < this.y + this.height
  }
}

function loadFaceUpCards(){
  faceUpCards = [
    loadImage("assets/1.png"),
     loadImage("assets/2.png"),
     loadImage("assets/3.png"),
     loadImage("assets/4.png"),
     loadImage("assets/5.png"),
     loadImage("assets/react.jpg")
  ]
}
function createDeck(images){
  for(let i=0; i < faceUpCards.length; i++){
    deck.push(images[i])
    deck.push(images[i])
  }
  
  //mélanger les cartes
  deck.sort(function(){
    return 0.5 - random()
  })
}

function createTiles(){
  for(let i=0; i<columns; i++)
  {
    for(let j=0; j < rows; j++)
    {
        //rendre l'image
        let tile = new Tile(
        i * 280 + 40,
        j* 280 + 40,
        deck.pop()
        )
        tiles.push(tile)
    }
  }
}

function drawResultOnWin(){
  let matches = true
  
  for(let i = 0; i < tiles.length; i++)
    {
      matches = matches && tiles[i].isMatch
    }
  if(matches){
    //code
    fill(0, 0, 0)
    text("Bravo tu as tout trouvé !", 20, 360)
  }
}

function setup() {
  createCanvas(1200, 1000)
  
  faceDownCard = loadImage("assets/onyx.PNG")
  
  loadFaceUpCards()
  createDeck(faceUpCards)
  createTiles()
}

function updateLogic(){
  if(cooldown && frameCount - cooldown > 30){
     for(let i = 0; i < tiles.length; i++)
  {
    if(!tiles[i].isMatch && tiles[i].isFaceUp){
       tiles[i].setIsFaceUp(false)
       }
  }
  //remettre la liste de cartes flipped
  flippedCards = []
  cooldown = null
}
     }

function draw() {
  updateLogic()
  for(let i = 0; i < tiles.length; i++)
  {
      tiles[i].render()
  }
  drawResultOnWin()
}

function mouseClicked(){
  for(let i = 0; i < tiles.length; i++)
    {
      if(tiles[i].isUnderMouse(mouseX, mouseY))
      {
        //Clic sur la carte
        if(flippedCards.length < 2 && !tiles[i].isFaceUp){
          
       
        //Retournement de la carte
        tiles[i].setIsFaceUp(true)
        flippedCards.push(tiles[i])
        
        //verifier si les cartes sont similaires
          if(flippedCards.length === 2){
               if(flippedCards[0].faceUpImage === flippedCards[1].faceUpImage){
                  flippedCards[0].isMatch = true
                  flippedCards[1].isMatch = true
                  }
              cooldown = frameCount
             }
        }
      }
    }
}
