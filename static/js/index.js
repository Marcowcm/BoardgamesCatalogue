var games   
$(document).ready(function(){
    $.ajax({ 
    type: 'GET', 
    url: 'static/data.json', 
    dataType: 'json',
    success: function (data) { 
        games = data;
        renderGames(games);
    }})
    renderGames(games);
})

function renderGames(data){
    console.log(data);
    console.log(games);
    for (var i = 0; i < data.length; i++) {
            var html = `<div class="col s12 m6 l4"> 
                        <div class="card horizontal"> 
                            <div class="card-image waves-effect waves-block waves-light">
                                <img class="activator" src="static/${(data[i].IMG="")?"IMG/default.png":data[i].IMG}"> 
                            </div>
                            <div class="">
                                <div class="card-content">
                                    <span class="activator card-title">
                                        ${(data[i].Name_eng != "")?data[i].Name_eng :data[i].Name_zh}
                                        <i class="material-icons right blue-text text-darken-3">more_vert</i>
                                    </span>
                                    <p class="players" min="${data[i].players_min}" max="${data[i].players_max}">
                                        Player:${data[i].players_min}~${data[i].players_max}
                                    </p>
                                    <p class="time">Est:${data[i].Est_Duration}</p>
                                </div>
                            </div>
                            <div class="card-reveal">'
                                <span class="card-title grey-text text-darken-4">${data[i].Name_eng}<i class="material-icons right">close</i></span>
                                <p>${data[i].Description}</p>
                                {}<a href="${data[i].BGG}">See on BGG</a>
                            </div>
                        </div>
                        </div>`
            $('#catelogue').append(html);
            console.log(i)
    }
}