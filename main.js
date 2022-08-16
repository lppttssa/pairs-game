(function() {
    function createPairGame(container) {

        const shuffle = (arr) => {
            let j, temp;
            for (let i = arr.length - 1; i > 0; i--) {
                j = Math.floor(Math.random()*(i + 1));
                temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
            }
	        return arr;
        }

        let openedCards = {
            firstOpened: null,
            secondOpened: null,
        }

        const clearOpenedCards = () => {
          openedCards = {
              firstOpened: null,
              secondOpened: null,
          }
        };

        const openCard = (number) => {

        }

        const createCard = (number) => {
            let card = document.createElement('div');
            card.classList.add('card');
            card.classList.add('hiddenNumber')
            card.textContent = number;
            card.addEventListener('click', handleCardClick)
            return card;
        };

        const handleCardClick = (e) => {
            let el = e.target;
            if (openedCards.firstOpened) {
                if (openedCards.firstOpened.innerText === el.innerText) {
                    el.classList.remove('hiddenNumber');
                    clearOpenedCards();
                    return;
                } else {
                    el.classList.remove('hiddenNumber');
                    setTimeout(() => {
                        el.classList.add('hiddenNumber');
                        openedCards.firstOpened.classList.add('hiddenNumber')
                        clearOpenedCards();
                    }, 500)
                    return;
                }
            }
            openedCards.firstOpened = el;
            el.classList.remove('hiddenNumber');
        };

        const createRow = () => {
            let row = document.createElement('div');
            row.classList.add('row');
            return row;
        };

        const numbers = shuffle([1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]);
        let shift = 0;
        for (let i = 0; i < 4; i++) {
            let row = createRow();
            for (let j = 0; j < 4; j++) {
                let card = createCard(numbers[shift + j + i]);
                row.append(card);
            }
            shift += 3;
            container.append(row);
        };
    }
    window.createPairGame = createPairGame;
})();