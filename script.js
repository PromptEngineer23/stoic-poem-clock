const poemElement = document.getElementById('poem');

function generateStoicPoem()
    {const date = new Date();
    const options = { hour: 'numeric', minute: 'numeric' };
    const currentTime = date.toLocaleTimeString([], options);



    //const prompt = `Generate a stoic poem that rhymes with the word "bob".`;
    const prompt = `Imagine you are emperor marcus aurelius and you have some concise stoic advice to give someone, do not start the reply with "Some concise stoic advice"`;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            //'model': 'davinci',
            'prompt': prompt,
            'temperature': 0.7,
            'max_tokens': 1000,
            'stop': null
        })
    };

    fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', requestOptions)
        .then(response => response.json())
        .then(data => {
            const generatedPoem = data.choices[0].text.trim();
            console.log(generatedPoem)
            poemElement.innerText = `${currentTime}\n\n${generatedPoem}`;
        })
        .catch(error => {
            console.error('Error generating poem:', error);
        });
}

// Generate the first poem when the page loads
generateStoicPoem();

// Update the poem every minute
setInterval(generateStoicPoem, 60000);
