
    });
});


// Function to load data from the specified sheet (tab)
function loadData(sheetName) {
  // Replace YOUR_SHEET_ID with the actual ID from your Google Sheet URL
  const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/.../pub?output=csv';

  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: function(data, tabletop) {
      // When simpleSheet is false, data is organized in tabletop.sheets()
      // Get the data for the specified sheet/tab
      const sheetData = tabletop.sheets(sheetName).all();
      renderGrid(sheetData);
    },
    simpleSheet: false
  });
}
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("favoritesBtn").addEventListener("click", function() {
        fetchWatchlist('YOUR_FAVORITES_SHEET_URL');
    });

    document.getElementById("watchlistBtn").addEventListener("click", function() {
        fetchWatchlist('YOUR_2025_WATCHLIST_URL');
    });
});

// Function to build and render the grid view in the 'watchlist-grid' container
function renderGrid(data) {
  const container = document.getElementById('watchlist-grid');
  
  // Clear any existing content
  container.innerHTML = '';
  
  data.forEach(function(item) {
    // Create a card for each entry
    const card = document.createElement('div');
    card.className = 'watchlist-card';
    
    // Create and set the image element
    const img = document.createElement('img');
    img.src = item.imageurl;        // Column name 'imageurl' must match exactly
    img.alt = item.title;
    
    // Create a title element with the movie/serie title
    const title = document.createElement('h3');
    title.textContent = item.title;
    
    // Create a paragraph for type, year, and duration
    const details = document.createElement('p');
    details.textContent = `${item.type} | ${item.year} | ${item.duration}`;
    
    // (Optional) Create paragraphs for seasons and episodes if applicable
    if(item.seasons) {
      const seasons = document.createElement('p');
      seasons.textContent = `Seasons: ${item.seasons}`;
      card.appendChild(seasons);
    }
    if(item.episodes) {
      const episodes = document.createElement('p');
      episodes.textContent = `Episodes: ${item.episodes}`;
      card.appendChild(episodes);
    }
    
    // Append the elements to the card
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(details);
    
    // Append the card to the grid container
    container.appendChild(card);
  });
}


console.log("Fetching data from sheet...");


async function fetchWatchlist(sheetUrl) {
    const response = await fetch(sheetUrl);
    const data = await response.text();
    
    // Convert CSV format to an array
    const rows = data.split("\n").map(row => row.split(","));

    let gridHtml = '<div class="grid-container">';
    
    rows.forEach((row, index) => {
        if (index === 0) return; // Skip header row
        let [title, type, year, image] = row; 
        
        gridHtml += `
            <div class="grid-item">
                <img src="${image}" alt="${title}">
                <h3>${title}</h3>
                <p>${type} - ${year}</p>
            </div>
        `;
    });

    gridHtml += '</div>';

 document.getElementById("watchlist-grid").innerHTML = gridHtml;

}

// Call the function with the Google Sheet URL
fetchWatchlist('https://docs.google.com/spreadsheets/d/e/2PACX-1vRD-8tUObA46flYxB9f2bSvzNsPTLiDGxhmLSvRW9N5keIKlDW5J6uWiTgsgB85C_xovHxBwzNvdN0/pubhtml');
//////


