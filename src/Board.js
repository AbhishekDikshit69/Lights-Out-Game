import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps={
    ncols:5,
    nrows:5,
    chanceLightStartsOn:.25
  }
  constructor(props) {
    super(props);
    this.state={
      board:this.createBoard(),
      hasWon:false,
      lightsOn:0
    }
  }

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let index = 0; index < this.props.nrows; index++) {
      board.push([]);
      for (let i =0; i<this.props.ncols;i++) {
        board[index].push(Math.random()<this.props.chanceLightStartsOn);
      }
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround=(coord)=> {
    console.log(coord);
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      console.log('Flipping' ,x,y);
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y,x);
    flipCell(y,x+1);
    flipCell(y,x-1);
    flipCell(y+1,x);
    flipCell(y-1,x);
    const hasWon=board.every(row=>row.every(cell=>!cell));
    this.setState({
      board:board,
      hasWon:hasWon
    })
    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

    // this.setState({board, hasWon});
  }
  renderBoard(){
    return (
      
        !this.state.hasWon ?
        <div>
          <div className='Board-title'>
            <div className="neon">Lights</div>
            <div className="flux">Out</div>
          </div>
          <table className='Board'>
        <tbody>
        {this.state.board.map((element,rowIndex)=>(
            <tr key={rowIndex}>
             {element.map((current,colIndex)=> <Cell key={rowIndex + '-'+  colIndex} flipCellsAroundMe={this.flipCellsAround} coordinates={rowIndex + '-'+  colIndex} isLit={current} />)}    
            </tr>))} 
        </tbody>
      </table>
        </div>
        :
          <div>
            <span className="neon" id="Winner">YOU</span>
            <span className="flux" id="Winner">WIN!!!</span>
          </div>
      
        
    )
    
  }

  /** Render game board or winning message. */

  render() {
    return(
      <div>
          {/* <h1>Just getting started</h1> */}
          {this.renderBoard()}
          
      </div>
    

    )
    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
    
  }
}


export default Board;
