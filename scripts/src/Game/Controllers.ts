/**
 * 
 * Класс обработчиков управления
 * 
 */





class Controllers {

	private cursorX: number = 0; //координата х курсора
    
//    private end : boolean = false; //закончить игру

	private canvas: HTMLCanvasElement; //холст, на котором происходит игра

    //добавляем слушатели событий
	constructor(canvas: HTMLCanvasElement ) {

		this.canvas = canvas;

		canvas.addEventListener("mousemove", (event: MouseEvent) => 
        {
			this.handleMouseMove(event);
		});


    }

    /**
     * Геттеры
     */

    //геттер для курсора
	public getMousePosition(): number 
    {
		return this.cursorX;
	}



    /**
     * Обработчики событий
     */

	private handleMouseMove(event: MouseEvent): void {

		this.cursorX  = event.clientX - this.canvas.offsetLeft;

	}

	
}


/**
 * Экспортировать класс
 */
export{
    Controllers as default,
}