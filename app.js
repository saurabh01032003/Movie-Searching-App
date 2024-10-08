let input = document.querySelector('input');
let list = document.querySelector('#list');
let btn = document.querySelector('button');

btn.addEventListener('click', function () {
    let searchText = input.value;
    console.log(searchText);
    getData(searchText);
});

function getData(searchText) {
    let res = axios.get(`https://api.tvmaze.com/search/shows?q=${searchText}`);
    res.then(function (response) {
        console.log(response);
        manipulationDom(response.data);
    }).catch(function (err) {
        console.log("Error");
    });
}

function manipulationDom(allData) {
    // remove previous search histories
    while (list.firstChild) {
        list.firstChild.remove();
    }

    console.log(allData);
    for (let item of allData) {
        let figure = document.createElement('figure');
        console.log(item);
        if (item.show.image) {
            figure.innerHTML = `
                <img src=${item.show.image.original} alt="Movie Poster" />
                <h2 style="color: red"> ${item.show.name}</h2>    
                <h2 style="color: red">Launch : ${item.show.premiered}</h2>    
            `;
        }

        // Add animation to newly created figures
        figure.style.animation = 'fadeIn 0.6s ease-in-out';
        list.append(figure);
    }
}

