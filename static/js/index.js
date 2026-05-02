var games;
var categories = ["Deck building", "Card Game", "Numbers", "Communication", "Strategy", "Party", "Rival", "Co-op", "City Building", "Civilization", "Word Game"];
var selectedCat = [];

$(document).ready(function () {
    $('.sidenav').sidenav();
    renderFilters();
    // Fetch from SheetDB
    $.ajax({
        type: 'GET',
        url: 'https://sheetdb.io/api/v1/z0s8q3hocr77j', 
        dataType: 'json',
        success: function (data) {
            games = data;
            renderGames(games); // Initial render with all games
        }
    });

    // Integrated Search Logic
    $('#search').on("keyup", function () {
        var search = $(this).val().toLowerCase();
        
        $('.boardgame-card').each(function () {
            // Search within the title and description
            var content = $(this).text().toLowerCase();
            var $column = $(this).closest('.col'); // Target the grid column
            
            if (content.indexOf(search) > -1 || search === "") {
                $column.fadeIn();
            } else {
                $column.fadeOut();
            }
        });
    });

    // Downward Expansion Logic
    $(document).on('click', '.card-trigger', function() {
        var $reveal = $(this).siblings('.reveal-content');
        
        // Close other open cards first for a cleaner look
        $('.reveal-content').not($reveal).slideUp(300);
        
        // Toggle this specific card
        $reveal.slideToggle(300);
    });

    // Handle Category Filter Changes
    $(document).on('change', '.filled-in', function() {
        var category = $(this).attr('id');
        if ($(this).is(':checked')) {
            selectedCat.push(category);
        } else {
            selectedCat = selectedCat.filter(c => c !== category);
        }
        renderGames(filter());
    });
});

function renderGames(data) {
    $('#catelogue').empty(); // Clear existing games before re-rendering
    
    for (var i = 0; i < data.length; i++) {
        var img_path = data[i].IMG === "" ? 'default.png' : data[i].IMG;
        var name = (data[i].Name_eng && data[i].Name_eng !== "") ? data[i].Name_eng : data[i].Name_zh;

        var html = `
        <div class="col s12 m6 l4">
            <div class="card hoverable boardgame-card">
                <div class="card-image card-trigger" style="cursor: pointer;">
                    <img class="game-img" src="static/IMG/${img_path}">
                    <div class="card-overlay-content">
                        <h5 class="card-title-overlay">${name}</h5>
                    </div>
                </div>
                <div class="reveal-content" style="display: none; padding: 20px; border-top: 1px solid #eee;">
                    <p><strong>Full Name:</strong> ${data[i].Name_eng} ${data[i].Name_zh}</p>
                    <p>Player: ${data[i].players_min}~${data[i].players_max}</p>
                    <p>Est. Time: ${data[i].Est_Duration}</p>
                    <p><strong>Language:</strong> ${data[i].Lang}</p>
                    <p><strong>Category:</strong> ${data[i].Category}</p>
                    <p>${data[i].Description}</p>
                    <div class="actions" style="margin-top:15px;">
                        <a class="btn blue" href="${data[i].BGG}" target="_blank">BGG Link</a>
                    </div>
                </div>
            </div>
        </div>`;
        $('#catelogue').append(html);
    }
}

function filter() {
    if (selectedCat.length === 0) return games;

    return games.filter(game => {
        // Assuming your Google Sheet 'Category' column is comma-separated like "Strategy, Party"
        var gameCats = game.Category ? game.Category.split(',').map(c => c.trim()) : [];
        return selectedCat.some(cat => gameCats.includes(cat));
    });
}

function renderFilters() {
    categories.forEach(cat => {
        var html = `
        <p>
            <label>
                <input type="checkbox" class="filled-in" id="${cat}"/>
                <span>${cat}</span>
            </label>
        </p>`;
        $('#filterForm').append(html);
    });
}