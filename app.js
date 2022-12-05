const main = document.querySelector('main');
const buttonInsertText = document.querySelector('.btn-toggle');
const buttonReadText = document.querySelector('#read');
const divTextBox = document.querySelector('.text-box');
const closeDivTextBox = document.querySelector('.close');
const selectElement = document.querySelector('select');
const textArea = document.querySelector('textarea');

const humanExpressions = [

    { img: './img/drink.jpg', text: 'Estou com sede' },
    { img: './img/food.jpg', text: 'Estou com fome' },
    { img: './img/tired.jpg', text: 'Estou cansado' },
    { img: './img/hurt.jpg', text: 'Estou machudada' },
    { img: './img/happy.jpg', text: 'Estou feliz' },
    { img: './img/angry.jpg', text: 'Estou com raiva' },
    { img: './img/sad.jpg', text: 'Estou triste' },
    { img: './img/scared.jpg', text: 'Estou assustada' },
    { img: './img/outside.jpg', text: 'Quero ir lá fora' },
    { img: './img/home.jpg', text: 'Quero ir para casa' },
    { img: './img/school.jpg', text: 'Quero ir para a escola' },
    { img: './img/grandma.jpg', text: 'Quero ver a vovó' },
];

// [reproduzir a fala do texto]
const utterance = new SpeechSynthesisUtterance();

const setTextMessage = text => {

    utterance.text = text;
};

const speakText = () => {

    speechSynthesis.speak(utterance);
};

// [reproduzir a voz selecionada]
const setVoice = event => {

    const selectedVoice = voices.find(voice => voice.name === event.target.value);
    utterance.voice = selectedVoice;
};

const addExpressionBoxesIntoDOM = () => {

    main.innerHTML = humanExpressions.map(({ img, text }) => `<div class="expression-box"><img src="${img}" alt="${text}" data-js="${text}"><p class="info" data-js="${text}">${text}</p></div>`).join('');
};

addExpressionBoxesIntoDOM()

// [adiciona e remove a sombra ao clicar na imagem]
const setStyleOfClickedDiv = dataValue => {

    const div = document.querySelector(`[data-js="${dataValue}"]`);

    div.classList.add('active');

    setTimeout(() => {
        div.classList.remove('active')
    }, 1000);
};

main.addEventListener('click', event => {
    
    const clickedElement = event.target;
    const clickedElementText = clickedElement.dataset.js;
    const clickedElementTextMustBeSpoken = ['img', 'p'].some(elementName => clickedElement.tagName.toLowerCase() === elementName.toLowerCase());

    if (clickedElementTextMustBeSpoken) {

        setTextMessage(clickedElementText);
        speakText();
        setStyleOfClickedDiv(clickedElementText);
    }
});

let voices = [];

// [obter as vozes]
speechSynthesis.addEventListener('voiceschanged', () => {

    voices = speechSynthesis.getVoices();

    const googleVoice = voices.find(voice => voice.name === 'Google português do Brasil');
    const microsoftVoice = voices.find(voice => voice.name === 'Microsoft Maria Desktop - Portuguese(Brazil)');


    // [reduce - deve sempre retornar algo 
    // e devemos especificar o valor inicial ou de partida(''); depois da primeira execução da função,
    // esquece que esse valor('') passado nesse argumento existe]
    const optionElements = voices.reduce((accumulator, voice) => {

        accumulator += `<option>${voice.name}</option>`
        return accumulator
    }, '')

    console.log(optionElements)

    /*voices.forEach(({ name, lang }) => {

        const option = document.createElement('option');

        option.value = name;

        if (googleVoice && option.value === googleVoice.name) {

            utterance.voice = googleVoice;
            option.selected = true;
    
        } else if (microsoftVoice && option.value === microsoftVoice) {
            
            utterance.voice = microsoftVoice;
            option.selected = true;
        }

        option.textContent = `${lang} | ${name}`;
        selectElement.appendChild(option);
    });*/
});

// [mostrar e remover a caixa de texto]
buttonInsertText.addEventListener('click', () => {

    divTextBox.classList.add('show');
});

closeDivTextBox.addEventListener('click', () => {

    divTextBox.classList.remove('show');
});

// [mudar para a linguagem selecionada]
selectElement.addEventListener('change', setVoice);

buttonReadText.addEventListener('click', () => {

    setTextMessage(textArea.value);
    speakText();
});