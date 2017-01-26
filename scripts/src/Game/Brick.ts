

import GameObject, {Rectangle} from './GameObject';

/**
 * Класс кирпичика
 */

class Brick extends Rectangle
{
    
    public lives : number; //количество раз, которое нужно ударить кирпичик, чтобы убить его

    constructor ( x: number, y: number, h: number, w: number, lives: number )
    {
        super(x,y,h,w); //создаём прямоугольник
        if (lives == 0) //если жизней 0, деактивировать элемент
        {
            this.active = false;
        }
        this.lives = lives; 
    }

    /**
     * возвращает правду, если у кирпичика была отнята жизнь
     */
    public hit() : boolean
    {
        this.lives = this.lives - 1;
        return true;
    }

    /**
     * функция обновления кирпичиков
     */    
    public update(): void
    {

        if ( this.lives == 0 ) //если жизней не осталось, деактивировать кирпичик
        {
            this.active = false;
        }

    }

    /**
     * функция рендера кирпичиков
     */
    public draw( context: CanvasRenderingContext2D ) : void
    {
        if ( !this.active ) //если кирпичик мёртвый, рендерить не надо
            return;

        context.beginPath();
        context.moveTo( this.x - this.width / 2, this.y );

        //в зависимости от кол-ва жизней выбрать цвет
        switch(this.lives) 
        {
            case 1: {
                context.strokeStyle = '#9ae21d';
                break;
            }
            case 2: {
                context.strokeStyle = '#e8e129';
                break;
            }
            case 3: {
                context.strokeStyle = '#ed9d1c';
                break;
                }
            case 4: {
                context.strokeStyle = '#e04f35';
                break;
                }
            default: {
                context.strokeStyle = '#666666';
            }
        };

        context.lineWidth = this.height;
        context.lineTo( this.x + this.width / 2, this.y );
        context.stroke();

    }
}


/**
 * Экспортировать класс
 */
export{
    Brick as default,
};