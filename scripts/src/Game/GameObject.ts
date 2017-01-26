

/**
 * Интерфейс для игровых объектов, которые будут рендериться
 */

interface GameObject {

    isActive() : boolean; //ф-я, возвращающая активность объекта
    update() : void;
    draw(context: CanvasRenderingContext2D): void; //ф-я рендеринга на канвас

}

/**
 * Класс прямоугольника : дочерними классами будут кирпичики, платформа, стены
 */
class Rectangle implements GameObject
{
    protected x : number; //координаты
    protected y : number;
    protected width : number; //габариты
    protected height : number;
    protected active : boolean; //активность
    protected hittable : boolean;

    //геттеры и сеттеры
    public getW() : number { return this.width; } 
    public getH() : number { return this.height; }
    public getX() : number { return this.x; }
    public getY() : number { return this.y; }
    public isActive() : boolean { return this.active; }

    public hit() : boolean { return false; }

    public setX( newX : number ) { this.x = newX; }
    public setY( newY : number ) { this.y = newY; }

    //конструктор по основным параметрам
    constructor(x: number, y: number, h: number, w: number){

        this.active = true;

        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        this.hittable = false;
    }

    //ф-я обновления на очередной итерации
    public update() : void
    {

    }

    //ф-я рендеринга
    public draw(context: CanvasRenderingContext2D): void{};

}


/**
 * Экспорт
 */
export{
    GameObject as default,
    Rectangle,
}; 