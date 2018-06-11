import $ = require('jquery'); // not working on parcel.js: import * as $ from 'jquery';

enum Direction {
  UP = 0,
  RIGHT = 1,
  DOWN = 2,
  LEFT = 3,
  MIN = 0,
  MAX = 3,
}

enum Key {
  ESC = 27,
  SPACE = 32,
  LEFT = 37,
  UP = 38,
  RIGHT = 39,
  DOWN = 40,
}

interface IPiece {
  name: string;
  size: number;
  blocks: number[];
  color: string;
}

interface IPiecePosition {
  type: IPiece;
  dir: Direction;
  x: number;
  y: number;
}

/**
 * Tetris based on https://github.com/jakesgordon/javascript-tetris
 * Copyright (c) 2011, 2012, 2013, 2014, 2015, 2016 Jake Gordon and contributors
 */
export class Tetris {

  // -------------------------------------------------------------------------
  // game constants
  // -------------------------------------------------------------------------
  // private KEY: Key;         // = { ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
  // private DIR: Direction;  // = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3, MIN: 0, MAX: 3 };
  private $canvas: JQuery<HTMLCanvasElement>;
  private $playBtn: JQuery<HTMLElement>;
  private $rows: JQuery<HTMLElement>;
  private $score: JQuery<HTMLElement>;
  private ctx: CanvasRenderingContext2D | null;
  private $ucanvas: JQuery<HTMLCanvasElement>;
  private $menu: JQuery<HTMLElement>;
  private uctx: CanvasRenderingContext2D | null;
  private speed       = { start: 0.6, decrement: 0.005, min: 0.1 }; // how long before piece drops by 1 row (seconds)
  private nu          = 5;  // width/height of upcoming preview (in blocks)
  private vw: number; // viewport width
  private vh: number; // viewport height
  private aspectRatio: number[]; // Spielfeld Seitenverhältnis [1,2]: 1:2 [2,1]: 2:1
  private orientation: string;
  private nx: number; // width of tetris court (in blocks)
  private ny: number; // height of tetris court (in blocks)
  private lineWidthXl: number;

  // -------------------------------------------------------------------------
  // game variables (initialized during reset)
  // -------------------------------------------------------------------------

  // pixel size of a single tetris block
  private dx: number;
  // pixel size of a single tetris block
  private dy: number;
  // pixel size of a single tetris block in upcoming preview
  private dnextx: number;
  // pixel size of a single tetris block in upcoming preview
  private dnexty: number;
  // 2 dimensional array (nx*ny) representing tetris court - either empty block or occupied by a 'piece'
  private blocks: IPiece[][];
  // queue of user actions (inputs)
  private actions: Direction[];
  // true|false - game is in progress
  private playing: boolean;
  // time since starting this game
  private dt: number;
  // the current piece
  private current: IPiecePosition;
  // the next piece
  private next: IPiecePosition;
  // the current score
  private score: number;
  // the currently displayed score (it catches up to score in small chunks - like a spinning slot machine)
  private vscore: number;
  // number of completed rows in the current game
  private rows: number;
  // how long before current piece drops by 1 row
  private step: number;

  // -------------------------------------------------------------------------
  // tetris pieces
  //
  // blocks: each element represents a rotation of the piece (0, 90, 180, 270)
  //         each element is a 16 bit integer where the 16 bits represent
  //         a 4x4 set of blocks, e.g. j.blocks[0] = 0x44C0
  //
  //             0100 = 0x4 << 3 = 0x4000
  //             0100 = 0x4 << 2 = 0x0400
  //             1100 = 0xC << 1 = 0x00C0
  //             0000 = 0x0 << 0 = 0x0000
  //                               ------
  //                               0x44C0
  //
  // -------------------------------------------------------------------------

  private i: IPiece = { name: 'i', size: 4, blocks: [0x0F00, 0x2222, 0x00F0, 0x4444], color: '#0A9177' };
  private j: IPiece = { name: 'j', size: 3, blocks: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: '#AB1A62' };
  private l: IPiece = { name: 'l', size: 3, blocks: [0x4460, 0x0E80, 0xC440, 0x2E00], color: '#050506' };
  private o: IPiece = { name: 'o', size: 2, blocks: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: '#0A9177' };
  private s: IPiece = { name: 's', size: 3, blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: '#AB1A62' };
  private t: IPiece = { name: 't', size: 3, blocks: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: '#050506' };
  private z: IPiece = { name: 'z', size: 3, blocks: [0x0C60, 0x4C80, 0xC600, 0x2640], color: '#0A9177' };

  // -----------------------------------------
  // start with 4 instances of each piece and
  // pick randomly until the 'bag is empty'
  // -----------------------------------------
  private pieces = new Array<IPiece>();

  // -------------------------------------------------------------------------
  // RENDERING
  // -------------------------------------------------------------------------

  private invalid = {
    court: false,
    next: false,
    rows: false,
    score: false,
  };

  constructor() {
    this.$canvas     = $('#canvas') as JQuery<HTMLCanvasElement>;
    this.$playBtn    = $('#start');
    this.$rows       = $('#rows');
    this.$score      = $('#score');
    this.$ucanvas    = $('#upcoming') as JQuery<HTMLCanvasElement>;
    this.$menu       = $('#menu');

    if (!this.$canvas.length) {
      throw new Error('$canvas not set');
    }

    this.ctx = this.$canvas.get(0).getContext('2d');

    if (this.ctx === null) {
      throw new Error('ctx not set');
    }

    this.uctx        = this.$ucanvas.get(0).getContext('2d');
    this.speed       = { start: 0.6, decrement: 0.005, min: 0.1 }; // how long before piece drops by 1 row (seconds)
    this.nu          = 5;  // width/height of upcoming preview (in blocks)
    this.vw          = Math.max(document.documentElement.clientWidth, window.innerWidth || 0); // viewport width
    this.vh          = Math.max(document.documentElement.clientHeight, window.innerHeight || 0); // viewport height
    this.aspectRatio = this.vh < this.vw ? [1, 2] : [2, 1];  // Spielfeld Seitenverhältnis [1,2]: 1:2 [2,1]: 2:1
    this.orientation = this.aspectRatio[0] < this.aspectRatio[1] ? 'landscape' : 'portrait';
    this.nx          = this.aspectRatio[1] * 10; // width of tetris court (in blocks)
    this.ny          = this.aspectRatio[0] * 10; // height of tetris court (in blocks)
    this.lineWidthXl = 3;

    this.$menu.hide();

    // -------------------------------------------------------------------------
    // FINALLY, lets run the game
    // -------------------------------------------------------------------------

    // this.run();
    // console.log('tetris constructor', this);
    this.resize();
    this.reset();
  }

  /**
   * GAME LOOP
   */
  public run() {
    // showStats(); // initialize FPS counter
    this.addEvents(); // attach keydown and resize events
    let now = this.timestamp();
    let last = now;
    const frame = () => {
      now = this.timestamp();
      this.update(Math.min(1, (now - last) / 1000.0)); // using requestAnimationFrame have to be able to handle large delta's caused when it 'hibernates' in a background or non-visible tab
      this.draw();
      // stats.update();
      last = now;
      window.requestAnimationFrame(frame/*, $canvas.get(0)*/);
    };

    this.resize(); // setup all our sizing information
    this.reset();  // reset the per-game variables
    frame();  // start the first frame
  }

  /**
   * base helper methods
   */

  private get(id: string) {
    return document.getElementById(id);
  }

  private timestamp() {
    return new Date().getTime();
  }

  private  random(min: number, max: number) {
    return (min + (Math.random() * (max - min)));
  }

  // private randomChoice(choices) {
  //   return choices[Math.round(random(0, choices.length-1))];
  // }

  // ------------------------------------------------
  // do the bit manipulation and iterate through each
  // occupied block (x,y) for a given piece
  // ------------------------------------------------
  private eachblock(type: IPiece, x: number, y: number, dir: Direction, fn: (x: number, y: number) => void ) {
    let bit;
    // let result;
    let row = 0;
    let col = 0;
    const blocks = type.blocks[dir];
    for (bit = 0x8000 ; bit > 0 ; bit = bit >> 1) {
      if (blocks & bit) {
        fn(x + col, y + row);
      }
      if (++col === 4) {
        col = 0;
        ++row;
      }
    }
  }

  // -----------------------------------------------------
  // check if a piece can fit into a position in the grid
  // -----------------------------------------------------
  private occupied(type: IPiece, x: number, y: number, dir: Direction) {
    let result = false;
    this.eachblock(type, x, y, dir, (currX, currY) => {
      if ((currX < 0) || (currX >= this.nx) || (currY < 0) || (currY >= this.ny) || this.getBlock(currX, currY)) {
        result = true;
      }
    });
    return result;
  }

  private unoccupied(type: IPiece, x: number, y: number, dir: Direction) {
    return !this.occupied(type, x, y, dir);
  }

  /**
   * start with 4 instances of each piece and
   * pick randomly until the 'bag is empty'
   */
  private randomPiece(): IPiecePosition {
    if (this.pieces.length === 0) {
      this.pieces = [ this.i, this.i, this.i, this.i, this.j, this.j, this.j, this.j, this.l, this.l, this.l, this.l, this.o, this.o, this.o, this.o, this.s, this.s, this.s, this.s, this.t, this.t, this.t, this.t, this.z, this.z, this.z, this.z];
    }
    const type = this.pieces.splice(this.random(0, this.pieces.length - 1), 1)[0];
    return { type, dir: Direction.UP, x: Math.round(this.random(0, this.nx - type.size)), y: 0 };
  }

  private addEvents() {
    const self = this;
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      self.keydown(event);
    }, false);
    window.addEventListener('resize', (event: Event) => {
      self.resize(event);
    }, false);
    // TODO https://github.com/benmajor/$-Touch-Events
    // this.$canvas.on('singletap', this.tab);
    // this.$canvas.on('swipe', this.swipe);

    this.$playBtn.click(() => {
      if (self.playing) {
        self.lose();
      } else {
        self.play();
      }
    });
  }

  private resize(event?: Event) {
    this.vw          = Math.max(document.documentElement.clientWidth, window.innerWidth || 0); // viewport width
    this.vh          = Math.max(document.documentElement.clientHeight, window.innerHeight || 0); // viewport height
    this.aspectRatio = this.vh < this.vw ? [1, 2] : [2, 1];  // Spielfeld Seitenverhältnis [1,2]: 1:2 [2,1]: 2:1
    this.orientation = this.aspectRatio[0] < this.aspectRatio[1] ? 'landscape' : 'portrait';
    this.nx          = this.aspectRatio[1] * 10; // width of tetris court (in blocks)
    this.ny          = this.aspectRatio[0] * 10; // height of tetris court (in blocks)

    if (this.orientation === 'landscape') {
      this.$canvas.height(this.$canvas.width() / this.aspectRatio[1]); // half height of width
    } else {
      this.$canvas.height(this.$canvas.width() * this.aspectRatio[0]); // double height of width
    }

    this.$canvas.attr('width', this.$canvas.width());   // set canvas logical size equal to its physical size
    this.$canvas.attr('height', this.$canvas.height()); // (ditto)

    this.$ucanvas.attr('width', this.$ucanvas.width());
    this.$ucanvas.attr('height', this.$ucanvas.height());
    this.$ucanvas.height(this.$ucanvas.width()); // 1:1

    this.dx = this.$canvas.width() / this.nx; // pixel size of a single tetris block
    this.dy = this.$canvas.height() / this.ny; // (ditto)

    this.dnextx = this.$ucanvas.width() / this.nu; // pixel size of a single tetris block for the upcomming preview
    this.dnexty = this.$ucanvas.height() / this.nu; // (ditto)

    this.invalidate();
    this.invalidateNext();
  }

  // keyboard events for playing on desktop
  private keydown(ev: KeyboardEvent) {
    let handled = false;
    if (this.playing) {
      switch (ev.keyCode) {
        case Key.LEFT:
          this.actions.push(Direction.LEFT);
          handled = true;
          break;
        case Key.RIGHT:
          this.actions.push(Direction.RIGHT);
          handled = true;
          break;
        case Key.UP:
          this.actions.push(Direction.UP);
          handled = true;
          break;
        case Key.DOWN:
          this.actions.push(Direction.DOWN);
          handled = true;
          break;
        case Key.ESC:
          this.lose();
          handled = true;
          break;
      }
    } else if (ev.keyCode === Key.SPACE) {
      this.play();
      handled = true;
    }
    if (handled) {
      ev.preventDefault(); // prevent arrow keys from scrolling the page (supported in IE9+ and all other browsers)
    }
  }

  // swipe gestures for playing on touch devices
  private swipe(e: Event, touch: any) {
    let handled = false;
    if (this.playing) {
      switch (touch.direction) {
        case 'left':
          this.actions.push(Direction.LEFT);   handled = true; break;
        case 'right':
          this.actions.push(Direction.RIGHT);  handled = true; break;
        case 'up':
          this.actions.push(Direction.UP);     handled = true; break;
        case 'down':
          this.actions.push(Direction.DOWN);   handled = true; break;
      }
    }
  }

  // tab gestures for playing on touch devices
  private tab(e: Event, touch: any) {
    let handled = false;
    if (this.playing) {
      this.actions.push(Direction.UP);
      handled = true;
    }
  }

  /**
   * GAME LOGIC
   */

  /**
   *
   *
   * @private
   * @memberof Tetris
   */
  private play() {
    this.$menu.show();
    // $playBtn.prop('disabled', true);
    this.$playBtn.text('Give Up');
    this.reset();
    this.playing = true;
  }

  private lose() {
    // $playBtn.prop('disabled', false);
    this.$playBtn.text('Play');
    // $menu.hide();
    this.setVisualScore();
    this.playing = false;
  }

  private setVisualScore(n?: number)      { this.vscore = n || this.score;  this.invalidateScore(); }
  private setScore(n: number)            { this.score = n;  this.setVisualScore(n); }
  private addScore(n: number)            { this.score =  this.score + n; }
  private clearScore()           { this.setScore(0); }
  private clearRows()            { this.setRows(0); }
  private setRows(n: number)             { this.rows = n;  this.step = Math.max( this.speed.min,  this.speed.start - ( this.speed.decrement * this.rows));  this.invalidateRows(); }
  private addRows(n: number)             { this.setRows(this.rows + n); }
  private getBlock(x: number, y: number)          { return ( this.blocks &&  this.blocks[x] ?  this.blocks[x][y] : null); }
  private setBlock(x: number, y: number, type: IPiece)     { this.blocks[x] =  this.blocks[x] || [];  this.blocks[x][y] = type;  this.invalidate(); }
  private clearBlocks()          { this.blocks = [];  this.invalidate(); }
  private clearActions()         { this.actions = new Array<Direction>(); }
  private setCurrentPiece(piece: IPiecePosition) { this.current = piece ||  this.randomPiece();  this.invalidate();     }
  private setNextPiece(piece?: IPiecePosition)    { this.next    = piece ||  this.randomPiece();  this.invalidateNext(); }

  private reset() {
    this.dt = 0;
    this.clearActions();
    this.clearBlocks();
    this.clearRows();
    this.clearScore();
    this.setCurrentPiece(this.next);
    this.setNextPiece();
  }

  private update(idt: number) {
    if (this.playing) {
      if (this.vscore < this.score) {
        this.setVisualScore(this.vscore + 1);
      }
      this.handle(this.actions.shift());
      this.dt = this.dt + idt;
      if (this.dt > this.step) {
        this.dt = this.dt - this.step;
        this.drop();
      }
    }
  }

  private handle(action: Direction) {
    switch (action) {
      case Direction.LEFT:  this.move(Direction.LEFT);  break;
      case Direction.RIGHT: this.move(Direction.RIGHT); break;
      case Direction.UP:    this.rotate();        break;
      case Direction.DOWN:  this.drop();          break;
    }
  }

  private move(dir: Direction) {
    // console.log('move', dir);
    let x = this.current.x;
    let y = this.current.y;
    switch (dir) {
      case Direction.RIGHT: x = x + 1; break;
      case Direction.LEFT:  x = x - 1; break;
      case Direction.DOWN:  y = y + 1; break;
    }
    if (this.unoccupied(this.current.type, x, y, this.current.dir)) {
      this.current.x = x;
      this.current.y = y;
      this.invalidate();
      return true;
    } else {
      return false;
    }
  }

  private rotate() {
    const newdir = (this.current.dir === Direction.MAX ? Direction.MIN : this.current.dir + 1);
    if (this.unoccupied(this.current.type, this.current.x, this.current.y, newdir)) {
      this.current.dir = newdir;
      this.invalidate();
    }
  }

  private drop() {
    if (!this.move(Direction.DOWN)) {
      this.addScore(10);
      this.dropPiece();
      this.removeLines();
      this.setCurrentPiece(this.next);
      this.setNextPiece(this.randomPiece());
      this.clearActions();
      if (this.occupied(this.current.type, this.current.x, this.current.y, this.current.dir)) {
        this.lose();
      }
    }
  }

  private dropPiece() {
    this.eachblock(this.current.type, this.current.x, this.current.y, this.current.dir, (x, y) => {
      this.setBlock(x, y, this.current.type);
    });
  }

  private removeLines() {
    let x;
    let y;
    let complete;
    let n = 0;
    for (y = this.ny ; y > 0 ; --y) {
      complete = true;
      for (x = 0 ; x < this.nx ; ++x) {
        if (!this.getBlock(x, y)) {
          complete = false;
        }
      }
      if (complete) {
        this.removeLine(y);
        y = y + 1; // recheck same line
        n++;
      }
    }
    if (n > 0) {
      this.addRows(n);
      this.addScore(100 * Math.pow(2, n - 1)); // 1: 100, 2: 200, 3: 400, 4: 800
    }
  }

  private removeLine(n: number) {
    let x;
    let y;
    for (y = n ; y >= 0 ; --y) {
      for (x = 0 ; x < this.nx ; ++x) {
        this.setBlock(x, y, (y === 0) ? null : this.getBlock(x, y - 1));
      }
    }
  }

  /**
   * RENDERING
   */

  private invalidate() { this.invalid.court  = true; }
  private invalidateNext() { this.invalid.next   = true; }
  private invalidateScore() { this.invalid.score  = true; }
  private invalidateRows() { this.invalid.rows   = true; }

  private draw() {
    this.ctx.save();
    this.ctx.lineWidth =  this.lineWidthXl;
    this.ctx.translate( this.lineWidthXl / 2,  this.lineWidthXl / 2); // for crisp 1px black lines
    this.drawCourt();
    this.drawNext();
    this.drawScore();
    this.drawRows();
    this.ctx.restore();
  }

  /**
   * Spielfeld
   *
   * @private
   * @memberof Tetris
   */
  private drawCourt() {
    if ( this.invalid.court) {
      this.ctx.clearRect(0, 0, this.$canvas.width() || 0,  this.$canvas.height() || 0);
      if (this.playing) {
        this.drawPiece(this.ctx, this.current.type, this.current.x, this.current.y, this.current.dir, this.dx, this.dy);
      }
      let x;
      let y;
      let block;
      for (y = 0 ; y < this.ny ; y++) {
        for (x = 0 ; x < this.nx ; x++) {
          block = this.getBlock(x, y);
          if (block) {
            this.drawBlock(this.ctx, x, y, block.color, this.dx, this.dy);
          }
        }
      }
      this.ctx.strokeStyle = 'black';
      this.ctx.lineWidth =  this.lineWidthXl;
      this.ctx.strokeRect(0, 0, this.nx * this.dx - this.lineWidthXl, this.ny * this.dy - this.lineWidthXl); // court boundary / Spielfeldrand
      this.invalid.court = false;
    }
  }

  private drawNext() {
    if ( this.invalid.next) {
      const padding = (( this.nu -  this.next.type.size) / 2);
      // padding = 1; // WORKAROUND
      // console.log('drawNext padding', padding, 'dnextx',  this.dnextx, 'nu',  this.nu, 'next',  this.next);
      this.uctx.save();
      this.uctx.translate(this.lineWidthXl / 2, this.lineWidthXl / 2);
      this.uctx.clearRect(0, 0, this.$ucanvas.width(), this.$ucanvas.height());
      this.drawPiece(this.uctx, this.next.type, padding, padding, this.next.dir, this.dnextx, this.dnexty);
      this.uctx.strokeStyle = 'black';
      this.ctx.lineWidth = this.lineWidthXl;
      this.uctx.strokeRect(0, 0, this.nu * this.dnextx - this.lineWidthXl, this.nu * this.dnexty - this.lineWidthXl);
      this.uctx.restore();
      this.invalid.next = false;
    }
  }

  private drawScore() {
    if (this.invalid.score) {
      // html('score', ("00000" + Math.floor(vscore)).slice(-5));
      this.$score.text(('00000' + Math.floor(this.vscore)).slice(-5));
      this.invalid.score = false;
    }
  }

  private drawRows() {
    if (this.invalid.rows) {
      // html('rows', rows);
      this.$rows.text(this.rows);
      this.invalid.rows = false;
    }
  }

  private drawPiece(ctx: CanvasRenderingContext2D, type: IPiece, x: number, y: number, dir: Direction, dx: number, dy: number) {
    this.eachblock(type, x, y, dir, (currX: number, currY: number) => {
      this.drawBlock(ctx, currX, currY, type.color, dx, dy);
    });
  }

  private drawBlock(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, dx: number, dy: number) {
    ctx.fillStyle = 'transparent';
    ctx.lineWidth = this.lineWidthXl;
    ctx.strokeStyle = color;
    ctx.fillRect(x * dx, y * dy, dx, dy);
    ctx.strokeRect(x * dx, y * dy, dx, dy);
  }
}
