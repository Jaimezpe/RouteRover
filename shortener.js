document.getElementById("urlForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario haga una recarga de la página

    var longUrl = document.getElementById("url").value;

    createFileOnGitHub(longUrl);
});

function createFileOnGitHub(longUrl) {
    var randomName = generateRandomName();
    var shortUrl = window.location.origin + "/" + randomName + ".html";

    var htmlContent = '<meta http-equiv="refresh" content="0;url=' + longUrl + '">';

    var apiUrl = 'https://api.github.com/routerover1/routero.ver/contents/' + randomName + '.html';

    var requestData = {
        message: 'Creating file',
        content: btoa(htmlContent), // Convertir el contenido HTML a base64
        branch: 'main' // Cambia esto si estás usando otra rama
    };

    fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Authorization': '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', // Reemplaza 'tu_token_de_acceso' con tu token de acceso de GitHub
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Link created');
            console.log('NEW link:', shortUrl);
            document.getElementById("shortenedUrl").innerHTML = '<p>New URL: <a href="' + shortUrl + '">' + shortUrl + '</a></p>';
        } else {
            console.error('Error al crear el archivo en GitHub:', response.status);
        }
    })
    .catch(error => {
        console.error('Error al crear el archivo en GitHub:', error);
    });
}

function generateRandomName() {
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    var randomName = "";

    for (var i = 0; i < 6; i++) {
        randomName += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return randomName;
}
