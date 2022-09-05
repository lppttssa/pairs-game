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

        let firstOpened = null;
        let isClickDisabled = false;

        const clearOpenedCards = () => {
          firstOpened = null;
        };

        const createCard = (number) => {
            let h2 = document.createElement('h2');
            h2.classList.add('cardText')
            h2.textContent = number;
            h2.classList.add('hiddenNumber')
            h2.addEventListener('click', handleCardClick)
            return h2;
        };

        const handleCardClick = async (e) => {
            if (!isClickDisabled) {
                let el = e.target;
                clearTimeout();
                console.log('firstOpenedZZZfirstOpened')
                const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
                if (firstOpened) {
                    if (firstOpened.innerText === el.innerText) {
                        el.classList.remove('hiddenNumber');
                        clearOpenedCards();
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