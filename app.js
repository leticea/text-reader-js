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

// [mostrar as imagens na tela]
const createExpressionBox = ({ img, text }) => {

    const div = document.createElement('div');

    div.classList.add('expression-box');
    div.innerHTML = `<img src="${img}" alt="${text}"><p class="info">${text}</p>`;

    div.addEventListener('click', () => {

        setTextMessage(text);
        speakText();

        // [adiciona e remove a sombra ao clicar na imagem]
        div.classList.add('active');

        setTimeout(() => {
            div.classList.remove('active')
        }, 1000);
    });

    main.appendChild(div);
}

humanExpressions.forEach(createExpressionBox);

let voices = [];

// [obter as vozes]
speechSynthesis.addEventListener('voiceschanged', () => {

    voices = speechSynthesis.getVoices();

    voices.forEach(({ name, lang }) => {

        const option = document.createElement('option');

        option.value = name;
        option.textContent = `${lang} | ${name}`;
        selectElement.appendChild(option);
    });
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

    setTextMessage(textarea.value);
    speakText();
});
