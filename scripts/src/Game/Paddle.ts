

import GameObject, {Rectangle} from './GameObject';
import {WIDTH, HEIGHT, PADDING} from './Constants';

/**
 * Класс платформы
 */
class Paddle extends Rectangle
{

    /**
     * Конструктор :  используем конструктор родительского класса
     */
    constructor()
    {
        super(0, 0, PADDING, WIDTH / 6 );
    }

    public reset() : void
    {
        this.x = WIDTH/2;
        this.y = HEIGHT - this.height / 2;
    }

    /**
     * Функция обновления. Возвращаемая ложь означает, что столкновение никак не повлияло на этот объект
     */
    public update(): void
    {
        
    }

    /**
     * Функция рендеринга
     */
    public draw( context: CanvasRenderingContext2D ) : void
    {
        
        context.strokeStyle = '#333333';
        context.beginPath();
        context.moveTo( this.x - this.width / 2, this.y );
        context.lineWidth = this.height;
        context.lineTo( this.x + this.width / 2, this.y );
        context.stroke();
        context.restore();

    }
}

/**
 * Экспортируем класс
 */
export {
	Paddle as default,
};