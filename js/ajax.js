const SELECTORS = {
    currentURL: document.querySelector('#current-url'),
    showContentButton: document.querySelector('#show-content-button'),
    showStatusResult: document.querySelector('#show-state-result'),
    showHeadersResult: document.querySelector('#show-headers-result'),
    showContentResult: document.querySelector('#show-content-result'),
    showStatusCodeResult: document.querySelector('#show-code-and-status-result')
};

/**
 * Escribe la url actual en un campo de texto
 */
function setCurrentURL() {
    SELECTORS.currentURL.value = window.location.href;
}

/**
 * Realiza la petición ajax en la url en el campo de texto
 */
function makeAjaxRequest() {
    SELECTORS.showStatusResult.textContent = "🟡 Iniciada...";

    fetch(SELECTORS.currentURL.value)
        .then(res => {
            printRequestStatus(res.status);
            printHeaders(res.headers);
            printStatusCodeAndText(res);
            return res.text();
        })
        .then(data => showContent(data));
}

/**
 * Mostrar las cabeceras de la petición en pantalla
 * @param {[string]} headers 
 */
function printHeaders(headers) {
    SELECTORS.showHeadersResult.innerHTML = "";
    headers.forEach((value, key) => {
        const newListItem = document.createElement('li');
        newListItem.innerHTML = `<strong>${key}:</strong> ${value}`;
        SELECTORS.showHeadersResult.appendChild(newListItem);
    });
}

/**
 * Muestra el estatus de la respuesta
 * @param {Number} status 
 * @returns 
 */
function printRequestStatus(status) {
    if (status >= 400) {
        SELECTORS.showStatusResult.textContent = "🔴 Error";
        return;
    }

    SELECTORS.showStatusResult.textContent = "🟢 Éxito";
}

/**
 * Muestra el contenido de la respuesta del servidor en pantalla
 * @param {string} content 
 */
function showContent(content) {
    SELECTORS.showContentResult.textContent = content;
};

/**
 * Muestra el código y el texto de la respuesta del servidor en pantalla
 * @param {Response} response 
 */
function printStatusCodeAndText(response) {
    SELECTORS.showStatusCodeResult
        .textContent = `${response.status}, ${response.statusText}`;
}

document.addEventListener('DOMContentLoaded', function () {
    SELECTORS.showContentButton.addEventListener('click', makeAjaxRequest);

    setCurrentURL();
});