
/**
 * Класс, хранящий счёт
 */

class Score 
{
    private num: number = 0; //счёт

    private block : HTMLParagraphElement; //HTML блок, в котором будут отображаться результаты
    
    /**
     * конструктор
     */
    constructor ( tagName : string )
    {
        this.block = document.getElementById( tagName ) as HTMLParagraphElement; //специфицируем блок страницы
        this.updateElement(); //обновляем счёт на странице
    }

    public getN() : number
    {
        return this.num;
    }
    
    /**
     * функция прибавления счёта на 1
     */
    public add(): void 
    {
        this.num += 1; //обновить номер
        this.updateElement(); //обновить текст на веб-странице
    }

    /**
     * функция одновления текста на веб-странице
     */
    private updateElement(): void 
    {
        this.block.innerHTML = this.num.toString(); //записываем в параграф счёт в виде строки
    }
    
}

/**
 * Экспорт в игру
 */
export{
    Score as default,
};