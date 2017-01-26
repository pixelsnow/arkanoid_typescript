

import Brick from './Brick';
import {WIDTH, HEIGHT, PADDING} from './Constants';

/**
 * Класс массива кирпичиков
 */

class Bricks
{

    public pattern: Array<Brick>; //массив

    /**
     * Конструктор
     */
    constructor( levelNum : number )
    {

        this.pattern = new Array; //объявить массив

        if (levelNum == 1)
        {
            this.init1(); //заполнить в порядке, соотв. уровню
        }

        else if (levelNum == 2)
            {
                this.init2();
            }
    }

    /**
     * Уровень 1
     */
    public init1()
    {
        let brickW = ( WIDTH - PADDING * 2) / 6;
        let brickH = PADDING * 2;
        let i : number;
        for (i=0; i < 24; i++)
        {
            this.pattern[i] = new Brick ( PADDING + ( i % 6 ) * brickW + brickW / 2, PADDING + ( Math.floor( i / 6 ) ) * brickH + brickH / 2,
                                        brickH - 8, brickW - 8, 4 - Math.floor( i / 6 ) );
        }
    }

    /**
     * Уровень 2
     */
    public init2()
    {
        let brickW = ( WIDTH - PADDING * 2) / 8;
        let brickH = brickW / 2;
        let i : number;
        for (i=0; i < 24; i++)
        {
            this.pattern[i] = new Brick ( PADDING + ( i % 8 ) * brickW + brickW / 2, PADDING + ( Math.floor( i / 8 ) ) * brickH + brickH / 2,
                                        brickH - 8, brickW - 8, 3 - Math.floor( i / 8 ) );
        }

    }


    /**
     * Функция рендера кирпичиков
     */
    public draw( context: CanvasRenderingContext2D )
    {
        
        this.pattern.forEach(
            (b : Brick) => b.draw(context) //вызов ф-и рендера для каждого элемента массива
        );

    }
}


/**
 * Экспортировать модуль
 */
export{
    Bricks as default,
}