var games
var categories = ["Deck building",
    "Card Game",
    "Numbers",
    "Communication",
    "Strategy",
    "Party",
    "Rival",
    "Co-op",
    "City Building",
    "Civilization",
    "Word Game"]
var selectedCat = []
$(document).ready(function () {
    $('.sidenav').sidenav();
    $('.collapsible').collapsible();
    renderFilters();
    $.ajax({
        type: 'GET',
        url: 'static/data.json',
        dataType: 'json',
        success: function (data) {
            games = data;
            renderGames(filter());
        }
    })
    $('#search').on("keyup", function () {
        $('.collapsible').each(function () {
            var search= $('#search').val()
            if ($(this).text().search(search) > 0){
                $(this).parent().fadeIn()
            }else{
                $(this).parent().fadeOut()
            }
	    if (search == ""){
                $(this).parent().fadeIn()
            }
        })

    })
})

function renderGames(data) {
    for (var i = 0; i < data.length; i++) {
        img_path = data[i].IMG === "" ? 'default.png' : data[i].IMG

        var html = `<div class="card col s12 m6 l4 collapsible">  
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="activator game-img" src="static/IMG/${img_path}"> 
                            </div>
                            <div class="">
                                <div class="card-content">
                                    <span class="activator card-title">
                                        ${(data[i].Name_eng != "") ? data[i].Name_eng : data[i].Name_zh}
                                        <i class="material-icons right blue-text text-darken-3">more_vert</i>
                                    </span>
                                    <p class="players" min="${data[i].players_min}" max="${data[i].players_max}">
                                        Player:${data[i].players_min}~${data[i].players_max}
                                    </p>
                                    <p class="time">Est:${data[i].Est_Duration}</p>
                                </div>
                            </div>
                            <div class="card-reveal">
                                <span class="card-title grey-text text-darken-4">${data[i].Name_eng}<i class="material-icons right">close</i></span>
                                <p>${data[i].Description}</p>
                                <a href="${data[i].BGG}">See on BGG</a>
                            </div>
                    </div>`
        $('#catelogue').append(html);
    }
}

function renderFilters() {
    for (var i = 0; i < categories.length; i++) {
        var html = `
        <p>
            <label>
            <input type="checkbox" class="filled-in" id="${categories[i]}"/>
            <span>${categories[i]}</span>
            </label>
        </p>
        `
        $('#filterForm').append(html);
    }
}

function filter() {
    var slice = [];
    if (selectedCat.length == 0) {
        slice = games
    } else {
        games.forEach(game => {
            for (var i = 0; i < selectedCat.length; i++) {
                if (game.categories.contains(selectedCat[i])) {
                    slice += game
                }
            }
        });
    }
    return slice
}

