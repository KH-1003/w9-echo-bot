const abortController = new AbortController();
let requestInFlight = undefined;

function main() {

    const input = document.querySelector("input");
    const output = document.querySelector("#output")
    console.log(input.value);

    input.addEventListener('input', function() {
        const changedText = input.value.toUpperCase();

        output.textContent = changedText;
});

    input.addEventListener("change", makeRequest)

    input.addEventListener("change", () => {
        if(requestInFlight) {
            abortController.abort("aborting");

        }
    })
}
    
function makeRequest(event) {
    requestInFlight = true;

    fetch(`https://jsonplaceholder.typicode.com/posts/${event.target.value}`, {
        signal: abortController.signal,
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Fetch error:", error))
        .finally(() => {
            requestInFlight = false;
        });
}

   
  document.addEventListener("DOMContentLoaded", main);