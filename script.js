/**
 * Entry point of the application.
 */
function main() {
	const form = document.querySelector('form');
	form.addEventListener('submit', handleSubmit);

	const urlsInput = document.querySelector('#urls');
	urlsInput.addEventListener('keydown', function(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
			const currentValue = this.value;
			const newValue = currentValue + '\n';
			this.value = newValue;
		}
	});
}

/**
 * Handles form submission.
 * @param {Event} event - The form submission event.
 */
function handleSubmit(event) {
	event.preventDefault();
	const urlsInput = document.querySelector('#urls');
	const urls = urlsInput.value.split(',').map(url => url.trim()).slice(0, 10);
	checkPrices(urls);
}

/**
 * Checks prices for the given list of URLs and called API.
 * @param {string[]} urls - The list of URLs to check prices for.
 */
function checkPrices(urls) {
    const results = [];

    urls.forEach(url => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url
            })
        };

        fetch('https://ap-iprice-o17sn7tih-yulsep.vercel.app/course_price', requestOptions)
            .then(response => response.json())
            .then(data => results.push(`<p>${data.url}: ${data.price}</p>`))
            .catch(error => results.push(`<p>${url}: Error al obtener información de precio (${error}).</p>`))
            .finally(() => {
                if (results.length === urls.length) {
                    displayResults(results);
                }
            });
    });
}


/**
 * Displays the results in the results <div>.
 * @param {string[]} results - The list of results to display.
 */
function displayResults(results) {
	const resultsDiv = document.querySelector('#result-div');
	resultsDiv.innerHTML = results.join('');
}

main();
