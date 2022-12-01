const btn = document.querySelector("#search-btn");
btn.addEventListener("click", getCountries);

function getCountries(event) {
    event.preventDefault();
    const inputLang = document.querySelector("#user-input");
    const language = inputLang.value.toLowerCase();
    fetchLanguage(language);
}

function fetchLanguage(lang) {
    const url = `https://restcountries.com/v3.1/lang/${lang}`;

    fetch(url)
        .then(response => response.json())
        .then(displayCountry)
        .catch(handleError);
}

function displayCountry(langData) {
    document.querySelector("#country-container").innerHTML = '';
    const popArr = [];

    for (i = 0; i < langData.length; i++) {
        // Divs:
        const divs = document.createElement('div');
        document.querySelector("#country-container").append(divs);
        
        // Names:
        const name = document.createElement('h2');
        name.innerHTML = langData[i].name.common;

        // Subregions:
        const subregion = document.createElement('p');
        subregion.innerHTML = langData[i].subregion;

        // Capitals:
        const capital = document.createElement('p');
        capital.innerHTML = langData[i].capital;

        // populations:
        const population = document.createElement('p');
        population.innerHTML = langData[i].population;
        popArr.push(langData[i].population);

        // Flags;
        const flagImg = document.createElement('img');
        flagImg.src = langData[i].flags.png;

        // Appends:
        divs.append(name, subregion, capital, population, flagImg);

    }

    let biggestPop = Math.max(...popArr);
    let index = popArr.indexOf(biggestPop);
    
    const countryDivs = document.querySelectorAll("#country-container>div");
    console.log(countryDivs[index]);
    countryDivs[index].style.backgroundColor = "red";

}

function handleError(error){
    console.log(error);
    const errorP = document.querySelector("#error-message");
    errorP.innerText = error;
}
