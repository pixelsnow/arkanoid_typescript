

/**
 * Класс, хранящий кол-во жизней игрока
 */

class Lives 
{

    private num: number; //кол-во жизней
    private block : HTMLSpanElement; //блок веб-страницы, куда будет отображаться
    private res : string = ''; //строка, которая будет отображаться
    
    /**
     * Конструктор
     */
    constructor ( n : number, tagName : string )
    {
        this.num = n; //устанавливаем кол-во
        this.block = document.getElementById( tagName ) as HTMLParagraphElement; //устанавливаем блок
        this.updateElement(); //обновляем текст
    }

    /**
     * Возвращает кол-во жизней
     */
    public getNum(): number
    {
        return this.num;
    }

    /**
     * Уменьшает кол-во жизней на 1
     */
    public minus() : void
    {
        this.num = this.num - 1; //изменяет число
        this.res = this.res.slice( 1 , this.res.length ); //изменяет строку-результат, отрезая одно сердечко
        this.updateElement(); //обновляет веб-страницу
    }
    
    /**
     * Обновляет блок на веб-странице в соответствии со счётом
     */
    private updateElement(): void 
    {
        this.res = '';
        for (let i : number = 0; i < this.num; i++) //по количеству жизней
        {
            this.res = this.res.concat(String.fromCharCode(10084)); //присоединить к строке по сердечку
        }
        this.block.innerHTML = this.res; //записать строку в блок
    }
    
}

/**
 * Экспорт
 */
export{
    Lives as default,
};