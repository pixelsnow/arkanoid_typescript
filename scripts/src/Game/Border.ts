

/**
 * Модуль элемента стенок-преград
 */

import GameObject, {Rectangle} from './GameObject';
import {WIDTH, HEIGHT} from './Constants';

class Border extends Rectangle
{
    
    constructor ( x: number, y: number, h: number, w: number )
    {
        super(x,y,h,w);
        this.reset();
    }

    public reset(): void {

    }

    
    public update(): void
    {
        
    }

    public draw( context: CanvasRenderingContext2D ) : void
    {
        
        context.beginPath();
        context.moveTo( this.x - this.width / 2, this.y );
        context.strokeStyle = '#333333';
        context.lineWidth = this.height;
        context.lineTo( this.x + this.width / 2, this.y );
        context.stroke();

    }

}

export{
    Border as default,
};