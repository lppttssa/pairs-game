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
        };

        let firstOpened = null;
        let isClickDisabled = false;
        let openedCardsNumber = 0;
        let fieldSize = 4;

        const clearOpenedCards = () => {
          firstOpened = null;
        };

        const handleCardClick = async (e) => {
            if (!isClickDisabled) {
                let el = e.target;
                clearTimeout();
                const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
                if (firstOpened) {
                    if (firstOpened.innerText === el.innerText) {
                        el.classList.remove('hiddenNumber');
                        clearOpenedCards();
                        openedCardsNumber += 2;
                        showPlayAgainText();
                        return;
                    } else {
                        el.classList.remove('hiddenNumber');
                        isClickDisabled = true;
                        await sleep(500);
                        el.classList.add('hiddenNumber');
                        firstOpened.classList.add('hiddenNumber')
                        clearOpenedCards();
                        isClickDisabled = false;
                        return;
                    }
                }
                firstOpened = el;
                el.classList.remove('hiddenNumber');
            }
        };

        const showPlayAgainText = () => {
            if (openedCardsNumber === fieldSize) {
                let btn = document.createElement('button');
                btn.classList.add('btn');
                btn.textContent = 'Сыграть еще раз';
                btn.addEventListener('click', playAgain);
                container.append(btn);
            }
        };

        const playAgain = () => {
            document.location.reload();
        };

        const createCard = (number) => {
            let h2 = document.createElement('h2');
            h2.classList.add('cardText')
            h2.textContent = number;
            h2.classList.add('hiddenNumber')
            h2.addEventListener('click', handleCardClick)
            return h2;
        };

        const createRow = () => {
            let row = document.createElement('div');
            row.classList.add('row');
            return row;
        };

        const createPlayField = (numbers) => {
            let shift = 0;
            let itemsInRow = Math.sqrt(numbers.length);
            for (let i = 0; i < itemsInRow; i++) {
                let row = createRow();
                for (let j = 0; j < itemsInRow; j++) {
                    let card = createCard(numbers[shift + j + i]);
                    row.append(card);
                }
                shift += itemsInRow - 1;
                container.append(row);
            };
        };

        const createNumberArray = (size) => {
            let numbers = [];
            for (let i = 1; i <= size*size/2; i++) {
                numbers.push(i);
                numbers.push(i);
            }
            return numbers;
        };

        const play = (numbers) => {
            createPlayField(numbers);
            openedCardsNumber = 0;
            fieldSize = numbers.length;
        };

        const startGame = (e) => {
            e.preventDefault();
            let fieldRowSize = document.getElementById('inputCardNumber').value;
            if (fieldRowSize % 2 || null) {
                fieldRowSize = 2;
            }
            const numbers = createNumberArray(fieldRowSize);
            let form = document.getElementById('startForm');
            form.classList.add('formHidden');
            play(shuffle(numbers));
        };

        const createForm = () => {
            let form = document.createElement('form');
            form.classList.add('form');
            form.id = 'startForm';

            let text = document.createElement('h2');
            text.textContent = 'Введите количество карточеу по вертикали/горизонтали';
            text.classList.add('formDescription');
            form.append(text);

            let input = document.createElement('input');
            input.classList.add('formInput');
            input.type = 'number';
            input.min = 2;
            input.id = 'inputCardNumber';
            form.append(input);

            let btn = document.createElement('button');
            btn.textContent = 'Начать игру';
            btn.classList.add('btn');
            btn.classList.add('startGameBtn')
            btn.addEventListener('click', startGame)
            form.append(btn);
            container.append(form);
        };

        //const numbers = shuffle([1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]);
        createForm();
    
    }
    window.createPairGame = createPairGame;
})();