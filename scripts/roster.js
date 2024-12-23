let rosterHTML = '';
roster.forEach((player) => {
    rosterHTML += `
        <li class="player">
            <img src="resources/${player.image}" alt="${player.name}">
                <table class="stats">
                   <caption>${player.name}</caption>
                            <tr>
                                <td>Points per game:</td>
                                <td>${player.stats.points}</td>
                            </tr>
                            <tr>
                                <td>Assists per game:</td>
                                <td>${player.stats.assists}</td>
                            </tr>
                            <tr>
                                <td>Rebounds per game:</td>
                                <td>${player.stats.rebounds}</td>
                            </tr>
                            <tr>
                                <td>Steals per game</td>
                                <td>${player.stats.steals}</td>
                            </tr>
                            <tr>
                                <td>Blocks per game</td>
                                <td>${player.stats.blocks}</td>
                            </tr>
                </table>
        </li>
    `;
});
document.querySelector('.roster').innerHTML = rosterHTML;