/**
 * Tetris based on https://github.com/jakesgordon/javascript-tetris
 * Copyright (c) 2011, 2012, 2013, 2014, 2015, 2016 Jake Gordon and contributors
 */
export declare class Tetris {
    private $canvas;
    private $playBtn;
    private $rows;
    private $score;
    private ctx;
    private $ucanvas;
    private $menu;
    private uctx;
    private speed;
    private nu;
    private vw;
    private vh;
    private aspectRatio;
    private orientation;
    private nx;
    private ny;
    private lineWidthXl;
    private dx;
    private dy;
    private dnextx;
    private dnexty;
    private blocks;
    private actions;
    private playing;
    private dt;
    private current;
    private next;
    private score;
    private vscore;
    private rows;
    private step;
    private i;
    private j;
    private l;
    private o;
    private s;
    private t;
    private z;
    private pieces;
    private invalid;
    constructor();
    /**
     * GAME LOOP
     */
    run(): void;
    /**
     * base helper methods
     */
    private get;
    private timestamp;
    private random;
    private eachblock;
    private occupied;
    private unoccupied;
    /**
     * start with 4 instances of each piece and
     * pick randomly until the 'bag is empty'
     */
    private randomPiece;
    private addEvents;
    private resize;
    private keydown;
    private swipe;
    private tab;
    /**
     * GAME LOGIC
     */
    /**
     *
     *
     * @private
     * @memberof Tetris
     */
    private play;
    private lose;
    private setVisualScore;
    private setScore;
    private addScore;
    private clearScore;
    private clearRows;
    private setRows;
    private addRows;
    private getBlock;
    private setBlock;
    private clearBlocks;
    private clearActions;
    private setCurrentPiece;
    private setNextPiece;
    private reset;
    private update;
    private handle;
    private move;
    private rotate;
    private drop;
    private dropPiece;
    private removeLines;
    private removeLine;
    /**
     * RENDERING
     */
    private invalidate;
    private invalidateNext;
    private invalidateScore;
    private invalidateRows;
    private draw;
    /**
     * Spielfeld
     *
     * @private
     * @memberof Tetris
     */
    private drawCourt;
    private drawNext;
    private drawScore;
    private drawRows;
    private drawPiece;
    private drawBlock;
}
