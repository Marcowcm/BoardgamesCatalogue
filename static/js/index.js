
$(document).ready(function(){   
    $.ajax({ 
    type: 'GET', 
    url: '../data.json', 
    dataType: 'json',
    success: function (data) { 
        for (var i = 0; i < data.length; i++) {
            var html = '<div class="col s12 m6 l4">';
            html += '<div class="card horizontal">';
            html += '<div class="card-image waves-effect waves-block waves-light"><img class="activator" src="static/'+data[i].IMG+'"> </div>';
            html += '<div class="">';
            html += '<div class="card-content"><span class="activator card-title">';
            if(data[i].Name_eng != ""){
                html += data[i].Name_eng + '<br>';
            }
            if(data[i].Name_zh != ""){
                html += data[i].Name_zh;
            }
            html+='<i class="material-icons right blue-text text-darken-3">more_vert</i></span>';
            html+='<p class="players" min="'+data[i].players_min+'" max="'+data[i].players_max+'">Player:'+data[i].players_min+'~'+data[i].players_max+'</p>'
            html+='<p class="time">Est:'+data[i].Est_Duration+'</p>'
            
            html += '</div>';
            html += '</div>';
            html +='<div class="card-reveal">'
            html += '<span class="card-title grey-text text-darken-4">'+ data[i].Name_eng + '<i class="material-icons right">close</i></span>'
            html += '<p>'+data[i].Description+'</p>'
            html += '<a href="'+data[i].BGG+'">See on BGG</a>'
            html += '</div>';//end of reveal
            html += '</div>';
            html += '</div>';
            $('#catelogue').append(html);
            console.log(i)
            
        }
}})
})