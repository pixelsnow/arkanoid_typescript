

import GameObject, {Rectangle} from './GameObject';
import Brick from './Brick';
import Bricks from './Bricks';
import Ball from './Ball';
import Paddle from './Paddle';
import Controllers from './Controllers';
import Score from './Score';
import Border from './Border';
import Borders from './Borders';
import Lives from './Lives';
import {WIDTH, HEIGHT, PADDING} from './Constants';

/**
 * Модуль инициализации игры
 */
;

/**
 * Возможные состояния игры
 */
enum GameState {
    Reset,
    Ready,
    Playing,
	Lost,
	Win
}

/**
 * Класс игры
 */
class Game {

	private state: GameState = GameState.Reset; //текущее состояние игры
	private score: Score; //счёт
	private playerLives : Lives; //жизни игрока

	private gameObjects: Array<GameObject> = []; //массив, хранящий все физические объекты игры

    private paddle: Paddle; //платформа
    private ball: Ball; //мяч
    private bricks: Bricks; //кирпичики
	private borders: Borders; //стены

	private ballBounce: Array<Rectangle> = []; //массив, хранящиц все объекты игры, от которых отскакивает мяч
    
	private controls : Controllers; //управление игрой с помощью мышки  обрабатывается тут

	private canvas : HTMLCanvasElement; //канвас
	private context : CanvasRenderingContext2D; //контекст канваса

	/**
	 * Конструктор: что происходит при создании новой игры
	 */
	constructor ()
	{

		//устанавливаем холст

		this.canvas = document.getElementById( 'draw-canvas' ) as HTMLCanvasElement;
		if ( !this.canvas )
		{
			return;
		}	

		//инициализирует управление на канвасе
		this.controls = new Controllers(this.canvas);
		//инициализируем счёт и передаём туда имя HTML элемента, куда ходим отображать его
		this.score = new Score( "score" );
		//инициализируем счёт жизней и передаём туда имя HTML элемента, куда ходим отображать его
		this.playerLives = new Lives( 3, "lives" );
		//инициализируем основные параметры
		this.paddle = new Paddle();
		this.bricks = new Bricks(1);
		this.borders = new Borders(1);
		//создаём мяч и массив объектов, от которых он будет отскакивать
		this.ballBounce = this.ballBounce.concat(this.bricks.pattern, this.borders.pattern );
		this.ball = new Ball( this.paddle, this.ballBounce, this.ballOut.bind(this), this.brickHit.bind(this) );
		//создаём массив всех объектов на поле
		this.gameObjects = this.gameObjects.concat(this.ball, this.paddle, this.bricks.pattern, this.borders.pattern);
		//инициализируем контекст
		this.context = this.canvas.getContext( '2d' ) as CanvasRenderingContext2D;
		console.log ('created');
		//игра в готовом состоянии

	}

	/**
	 * начинаем новую игру
	 */

	public reset(): void
	{
        this.ball.reset();
		this.paddle.reset();
        this.state = GameState.Ready;
    }

	public play()
	{
		console.log ('started play');
		this.reset();
		console.log ('first reset');
		this.gameLoop();
		console.log ('after loop');
	}

	private startGame() 
	{
		this.ball.launch();
        this.state = GameState.Playing;
		console.log('startGame()');
    }

	private bricksLeft() : boolean 
	{
		let i : number = 0;
		let lim = this.bricks.pattern.length;
		for ( i=0; i<lim; i++)
		{
			if ( this.bricks.pattern[i].isActive() )
			{
				return true;
			}
		}
		return false;
	}

	public gameLoop() : void
	{

		switch ( this.state )
		{
			
			case GameState.Playing:

			{
				/**
				 * считываем позицию мышки
				 */
				this.paddle.setX( this.controls.getMousePosition() );

				/**
				 * проверяем на наличие столкновений шарика с чем-либо
				 */
				this.gameObjects.forEach(( obj: GameObject ) => obj.update() );

				/**
				 * рендерим всё на холст
				 */
				this.context.clearRect(0,0, this.canvas.width, this.canvas.height);

				this.gameObjects.forEach(( obj: GameObject ) => obj.draw(this.context) );

				this.context.restore();

				if ( ! this.bricksLeft() )
				{
					this.state = GameState.Win;
				}

				break;

			}

			case GameState.Lost:

			{
				this.context.clearRect(0,0, this.canvas.width, this.canvas.height);

				this.context.font="50px Helvetica";
				this.context.fillStyle = "#e04f35";
				this.context.textAlign = "center";
				this.context.fillText("GAME OVER :(", WIDTH/2, HEIGHT/2);
				this.context.font="20px Helvetica";
				this.context.fillStyle = "#25afea";
				this.context.fillText("you got " + this.score.getN().toString() + " points!", WIDTH/2, HEIGHT/2 + 50);

				this.context.restore();

				break;
			}


			case GameState.Ready:

			{
				this.startGame();

				break;
			}

			case GameState.Reset:

			{
				this.reset();

				break;
			}

			case GameState.Win:

			{
				this.context.clearRect(0,0, this.canvas.width, this.canvas.height);

				this.context.font="50px Helvetica";
				this.context.fillStyle = "#9ae21d";
				this.context.textAlign = "center";
				this.context.fillText("WOW! YOU WIN:)", WIDTH/2, HEIGHT/2);
				this.context.font="20px Helvetica";
				this.context.fillStyle = "#25afea";
				this.context.fillText("you got " + this.score.getN().toString() + " points!", WIDTH/2, HEIGHT/2 + 50);

				this.context.restore();

				break;
			}

			default:

			{
				this.context.clearRect(0,0, this.canvas.width, this.canvas.height);

				this.context.font="30px Helvetica";
				this.context.fillStyle = "red";
				this.context.textAlign = "center";
				this.context.fillText("ERROR", WIDTH/2, HEIGHT/2);

				this.context.restore();

				break;
			}
		}

		requestAnimationFrame( () => this.gameLoop() );

	}

	/**
	 * выполняется, когда мяч вылетает за пределы поля
	 */
	public ballOut()
	{
		this.ball.disable(); //перестать отображать мяч
		this.playerLives.minus(); //отнять одну жизнь
		if ( this.playerLives.getNum() == 0 )
		{
			this.state = GameState.Lost ;
		}
		else
		{
			this.reset(); //начать игру заново
		}
	}

	public brickHit()
	{
		this.score.add();
	}


}



/**
 * Модуль
 */

function main()
{
	let myGame : Game = new Game();
	myGame.play();
}

export {
	main as default,
};