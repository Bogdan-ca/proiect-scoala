let rosterHTML = '';
roster.forEach((player) => {
    rosterHTML += `
        <li class="player">
            <img src="${player.image}" alt="${player.name}">
                <table class="stats">
                   <caption>${player.name}</caption>
                            <tr>
                                <td>Points per game:</td>
                                <td>${player.stats.points.toFixed(1)}</td>
                            </tr>
                            <tr>
                                <td>Assists per game:</td>
                                <td>${player.stats.assists.toFixed(1)}</td>
                            </tr>
                            <tr>
                                <td>Rebounds per game:</td>
                                <td>${player.stats.rebounds.toFixed(1)}</td>
                            </tr>
                            <tr>
                                <td>Steals per game</td>
                                <td>${player.stats.steals.toFixed(1)}</td>
                            </tr>
                            <tr>
                                <td>Blocks per game</td>
                                <td>${player.stats.blocks.toFixed(1)}</td>
                            </tr>
                </table>
        </li>
    `;
});
document.querySelector('.roster').innerHTML = rosterHTML;