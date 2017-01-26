/**
 * класс мяч
 */

import GameObject, {Rectangle} from './GameObject';
import {WIDTH, HEIGHT} from './Constants';
//import Velocity from './Velocity';

class Ball implements GameObject
{
    
    private x : number = 0;
    private y : number = 0;
    private dx : number = 0;
    private dy : number = 0;
    private speed = 8;
    private radius : number = 15;
    private active : boolean = true;


    /**
     * 
     */
    constructor( private racket : Rectangle, 
                private bounceFrom: Array<Rectangle>,
                private onOut: () => void,
                private brickHit: () => void,
     )
    {
        this.reset();
    }


    public reset()
    {
        this.x = WIDTH / 2;
        this.y = HEIGHT / 2;
        this.dx = 0;
        this.dy = 0;
        this.active = true;
        this.launch();
    }

    /**
     * запускает мяч
     */
    
    public launch(): void
    {

        var angle = Math.random()*Math.PI*2;
        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);

    }

    public disable() : void
    {
        this.active = false;
    }

    public isActive() : boolean
    {
        return this.active;
    }

    /**
     * 
     */
    private setPosition( newX: number, newY: number ) : void
    {
        this.x = newX;
        this.y = newY;
    }

    public flipX() : void
    {
        this.dx *= -1;
    }

    public flipY() : void
    {
        this.dy *= -1;
    }

    public getX() : number
    {
        return this.x;
    }

    public getY() : number
    {
        return this.y;
    }

    public getR() : number
    {
        return this.radius;
    }

    public getnextX() : number
    {
        return ( this.x + this.dx * this.speed );
    }

    public getnextY() : number
    {
        return ( this.y + this.dy * this.speed );
    }

    
    private modulate() : void
    {
        if ( Math.abs (this.dx) <= 0.8 )
        {
            return;
        }
        else
        {
            if ( this.dx >= 0)
            {
                this.dx = 0.8;
            }
            else
            {
                this.dx = -0.8;
            }
            this.scaleD();
        }
    }

    private scaleD() : void
    {    
        let supposed1 = this.dx*this.dx + this.dy*this.dy;
        let coeffD = Math.sqrt ( 1 / supposed1 );
        this.dx = this.dx * coeffD;
        this.dy = this.dy * coeffD;
    }

    public update()
    {

        this.modulate();
        
        var nextX = this.x + this.dx * this.speed;
        var nextY = this.y + this.dy * this.speed;  

        /**
         * Обработать удары по кирпичикам и стенкам
         */
        this.bounceFrom.forEach( ( rect : Rectangle ) =>
        {
            if ( rect.isActive() == false )
            {
                return;
            }

            //обработка ударов блока слева или справа
			if (
                ( Math.abs ( nextX - rect.getX() ) <= ( this.radius + rect.getW() / 2 ) ) &&
				( Math.abs ( nextX - rect.getX() ) > ( rect.getW() / 2 ) )  &&
				( Math.abs ( nextY - rect.getY() ) < ( this.radius + rect.getH() / 2 ) )
			)
			{
                console.log ('side hit', rect.getX(), rect.getY() );
				this.flipX();
				if ( rect.hit() )
                {
                    this.brickHit();
                }
			}
			//Обработка ударов сверху или снизу
			else if (
                ( Math.abs ( nextY - rect.getY() ) <= ( this.radius + rect.getH() / 2 ) ) &&
				( Math.abs ( nextY - rect.getY() ) > ( rect.getH() / 2 ) )  &&
				( Math.abs ( nextX- rect.getX() ) < ( this.radius + rect.getW() / 2 ) )
			)
			{
				console.log ('top/bottom hit', rect.getX(), rect.getY() );
                this.flipY();
				if ( rect.hit() )
                {
                    this.brickHit();
                }
			}
        }
        )

        /**
         * Обработать удары по ракетке
         */

        
        let xDiff = ( nextX - this.racket.getX() );
        let xDiffMax = ( this.radius + this.racket.getW() / 2 );
        
        if (
            ( ( this.racket.getY() - nextY ) < ( this.racket.getH() / 2 + this.radius ) ) &&
            ( Math.abs ( xDiff ) < xDiffMax )
        )
        {
            let coeff = 1 / xDiffMax; //коэффициент, на который домножим xDiff, чтобы он был меньше 1
            this.dx = xDiff * coeff + this.dx; //новый dx, но он может быть немного больше 1
            this.scaleD();
            this.flipY();
        }
        

        /**
         * установить новые координаты мячу
         */
        this.x = nextX;
        this.y = nextY;

        /**
         * Если мяч вылетел за пределы поля, вызвать соотв ф-ю
         */
        if ( this.y > ( HEIGHT ) )
			{
				this.onOut();
			}

    }

    public draw( context: CanvasRenderingContext2D ) : void
    {
        
        if ( !this.active )
            return;
        
        context.strokeStyle = '#25afea';
        context.lineWidth = 1;
        context.beginPath();
        context.arc( this.x, this.y, this.radius, 0, Math.PI * 2 );
        context.fillStyle = '#25afea';
        context.fill();
//        context.stroke();

    }

}

export{
    Ball as default,
};