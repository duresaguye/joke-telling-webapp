let hideAnswer = document.getElementsByTagName('p')[3]
hideAnswer.style.display = 'none'
let mainText = document.getElementById('main-text')
let answer = document.getElementById('answer-text')
let apiData;
let generate = document.getElementById('generate')
let show = document.getElementById('show')

// hide first child div and display second one 
function hideInstruction(){
    document.getElementById('instruction').style.display = 'none'
    document.getElementById('jokesContainer').style.display = 'block'
}

function speech(text) {
    let utterance = new SpeechSynthesisUtterance();
    // Set the text that you want to read out
    utterance.text = text;
    console.log(text)
    // Use the default voice
    utterance.voice = speechSynthesis.getVoices()[0];

    // Speak the text out loud
    speechSynthesis.speak(utterance);
}
// fetch jokes from API
function getData(){
    fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious&type=twopart')
        .then(result => result.json())
        .then(data => {
            // here we assign object to variable to have access outside of current function
            apiData = data
            hideAnswer.style.display = 'none'
            mainText.innerText = data['setup']
            speech(data['setup'])
            isChecked = true
        })
}
// display joke
generate.addEventListener('click', () => {
    speechSynthesis.cancel()
    hideInstruction()
    getData()
    generate.style.display = 'none'
    show.style.display = 'block'
})
// display answer
show.addEventListener('click', ()=>{
    speechSynthesis.cancel()
    generate.style.display = 'block'
    hideAnswer.style.display = 'block'
    document.getElementById('answer-text').innerText = apiData['delivery']
    speech(apiData['delivery'])
})
// do same things with keyboard
document.addEventListener('keydown', ()=>{
    if(event.key.toLowerCase() === 'j'){

        hideInstruction()
        getData()
        speechSynthesis.cancel()

    } else if (event.key === 'a'){
        speechSynthesis.cancel()
        hideAnswer.style.display = 'block'
        document.getElementById('answer-text').innerText = apiData['delivery']
        speech(apiData['delivery'])
    }
})