
/**
 * Модуль стенок
 */




import Border from './Border';
import {WIDTH, HEIGHT, PADDING} from './Constants';

class Borders
{
    public pattern: Array<Border>;

    constructor( levelNum : number )
    {
        this.pattern = new Array;
        this.initWalls();

        if (levelNum == 1)
        {
            this.init1();
        }
        else if (levelNum == 2)
            {
                this.init2();
            }
    }

    public initWalls()
    {
        this.pattern[0] = new Border( WIDTH - PADDING / 2, HEIGHT / 2, HEIGHT, PADDING );
        this.pattern[1] = new Border( PADDING / 2, HEIGHT / 2, HEIGHT, PADDING );
        this.pattern[2] = new Border( WIDTH / 2, PADDING / 2, PADDING, WIDTH - PADDING * 2 );
    }

    public init1()
    {
//        let brickW = ( WIDTH - PADDING * 2) / 6;
    //    let brickH = PADDING;
  //      this.pattern[3] = new Border( PADDING + brickW / 2, PADDING + brickH * 8.5, brickH, brickW);
//       this.pattern[4] = new Border( WIDTH - PADDING - brickW / 2, PADDING + brickH * 8.5 , brickH, brickW);
    }

    public init2()
    {
        let brickW = ( WIDTH - PADDING * 2) / 8;
        let brickH = brickW / 2;
        this.pattern[3] = new Border( PADDING + brickW / 2, PADDING + brickH * 3.5 , brickH - 8, brickW - 8);
        this.pattern[4] = new Border( WIDTH - PADDING - brickW / 2, PADDING + brickH * 3.5 , brickH - 8, brickW - 8);
    }

    public draw( context: CanvasRenderingContext2D )
    {
        
        this.pattern.forEach(
            (b : Border) => b.draw(context)
        );

    }
}

export{
    Borders as default,
}