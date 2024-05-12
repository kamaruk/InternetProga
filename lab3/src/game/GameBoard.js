//GameBoard.js 

import React from "react"; 
import Data from "./data"; 
import Card from "./Card"; 
function GameBoard() { 
	const [cardsArray, setCardsArray] = React.useState([]); 
	const [firstCard, setFirstCard] = React.useState(null); 
	const [secondCard, setSecondCard] = React.useState(null); 
	const [stopFlip, setStopFlip] = React.useState(false); 



	function NewGame() { 
		setTimeout(() => { 
			const randomOrderArray = Data.sort(() => 0.5 - Math.random()); 
			setCardsArray(randomOrderArray); 
			setFirstCard(null); 
			setSecondCard(null); 
		}, 1200); 
	} 


	function handleSelectedCards(item) { 
		console.log(typeof item); 
		if (firstCard !== null && firstCard.id !== item.id) { 
			setSecondCard(item); 
		} else { 
			setFirstCard(item); 
		} 
	} 

	React.useEffect(() => { 
		if (firstCard && secondCard) { 
			setStopFlip(true); 
			if (firstCard.name === secondCard.name) { 
				setCardsArray((prevArray) => { 
					return prevArray.map((unit) => { 
						if (unit.name === firstCard.name) { 
							return { ...unit, matched: true }; 
						} else { 
							return unit; 
						} 
					}); 
				}); 
				removeSelection(); 
			} else { 
				setTimeout(() => { 
					removeSelection(); 
				}, 1000); 
			} 
		} 
	}, [firstCard, secondCard]); 

	function removeSelection() { 
		setFirstCard(null); 
		setSecondCard(null); 
		setStopFlip(false); 

	} 
	React.useEffect(() => { 
		NewGame(); 
	}, []); 

	return ( 
		<div className="container"> 
			<div className="header"> 
				<h1>Memory Game</h1> 
			</div> 
			<div className="board"> 
				{ 
					cardsArray.map((item) => ( 
						<Card 
							item={item} 
							key={item.id} 
							handleSelectedCards={handleSelectedCards} 
							toggled={ 
								item === firstCard || 
								item === secondCard || 
								item.matched === true
							} 
							stopflip={stopFlip} 
						/> 
					)) 
				} 
			</div> 
			<button className="button" onClick={NewGame}> 
				New Game 
			</button> 
		</div> 
	); 
} 

export default GameBoard; 
