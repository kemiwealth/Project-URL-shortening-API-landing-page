// Access token: 0233e996c6c7d9a40cbbf0d8c56c53fe4485f01b for bitly
const longURLinput = document.getElementById(`usertextURL`);
const submitInput = document.getElementById(`submit`);

// after user submit
submitInput.addEventListener("click", async () => {
	console.log(`This is the URL : ${longURLinput.value}`);
	const longURL = longURLinput.value;
	try {
		const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
			method: "POST",
			headers: {
				Authorization: `Bearer 0233e996c6c7d9a40cbbf0d8c56c53fe4485f01b`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				long_url: longURL,
				domain: "bit.ly",
			}),
		});
        const data = await response.json()
        console.log(data)
    } catch (error) {
        
        console.error(error)
    }
});
