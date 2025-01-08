let rosterHTML = '';
let idcounter;
function buildRoster() {
    rosterHTML = '<ul class="roster">';
    idcounter = 0;
    roster.forEach((player) => {
        rosterHTML += `
        
            <li class="player">
                <button data-player="${player.id}" class="player-button">
                <img src="${player.image}" alt="${player.name}">
                    <table class="stats">
                       <caption>${player.name}</caption>
                                <tr>
                                    <td>Points per game</td>
                                    <td>${player.stats.points.toFixed(1)}</td>
                                </tr>
                                <tr>
                                    <td>Assists per game</td>
                                    <td>${player.stats.assists.toFixed(1)}</td>
                                </tr>
                                <tr>
                                    <td>Rebounds per game</td>
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
                </button>
            </li>
        `;
    });
    rosterHTML += '</ul>';
    document.querySelector('.build').innerHTML = rosterHTML;

    document.querySelectorAll('.player-button').
    forEach((button) => {
    button.addEventListener('click', () => {
        const playerId = button.dataset.player;
        idcounter = parseInt(playerId, 10);
        console.log(idcounter);
        showPlayerStats(idcounter);
    })});   
}



function showPlayerStats(playerId) {
    rosterHTML = '';
    console.log(playerId);
    let stats = roster.find((player) => player.id === playerId);
    console.log(stats);
    rosterHTML = `<div class="advanced">
                <div class="player-profile">                    
                            <div class="player-change">
                                <div>
                                    <h3>${stats.name}</h3>
                                    <p>${stats.position} #${stats.number}</p>
                                </div>
                                <div class="player-profile">
                                    <button class="btn" onclick="
                                    if (${idcounter} != 0) {idcounter -= 1; showPlayerStats(idcounter);}"><i class="fas fa-chevron-left"></i></button>
                                    <img src=${stats.image} alt="${stats.name}">
                                    <button class="btn" onclick = "
                                    if (${idcounter} != 12) {idcounter += 1; showPlayerStats(idcounter);}"
                                    ><i class="fas fa-chevron-right"></i></button>
                                </div>
                                   
                            </div>
                            <div class="player-info">
                                <table class="physical-stats">
                                    <tr>
                                        <td>Height</td>
                                        <td>${feetToMeters(stats.basicStats.feet, stats.basicStats.inches)}m (${stats.basicStats.height})</td>
                                    </tr>
                                    <tr>
                                        <td>Weight</td>
                                        <td>${(stats.basicStats.weight * 0.453592).toFixed(1)}kg (${stats.basicStats.weight}lbs)</td>
                                    </tr>
                                    <tr>
                                        <td>Age</td>
                                        <td>${stats.basicStats.age} years</td>
                                    </tr>
                                    <tr>
                                        <td>Birthdate</td>
                                        <td>${stats.basicStats.birthdate}</td>
                                    </tr>
                                </table>
                                <table class="physical-stats">
                                    <tr>
                                        <td>Country</td>
                                        <td>${stats.basicStats.country}</td>
                                    </tr>
                                    <tr>
                                        <td>Draft pick</td>
                                        <td>${stats.basicStats.draftPick}</td>
                                    </tr>
                                    <tr>
                                        <td>Aquired</td>
                                        <td>${stats.basicStats.aquired}</td>
                                    </tr>
                                    <tr>
                                        <td>Experience</td>
                                        <td>${stats.basicStats.experience}</td>
                                    </tr>
                                </table>
                            </div>
                            <button class="btn cancel-btn" onclick="window.location.href = 'roster.html'"><i class="fas fa-times"></i></button>
                </div>
                
                <div class="player-stats">
                        <ul class="common-data">                        
                            <li class="third"><p>Height</p><p>${feetToMeters(stats.basicStats.feet, stats.basicStats.inches)}m</p></li>
                            <li class="third"><p>Weight</p><p>${(stats.basicStats.weight * 0.453592).toFixed(1)}kg</p></li>
                            <li class="third"><p>Age</p><p>${stats.basicStats.age} years</p></li>
                            <li class="third"><p>Country</p><p>${stats.basicStats.country}</p></li>
                            <li class="third"><p>Draft pick</p><p>${stats.basicStats.draftPick}</p></li>
                            <li class="third"><p>Aquired</p><p>${stats.basicStats.aquired}</p></li>
                            <li class="half"><p>Birthdate</p><p>${stats.basicStats.birthdata}</p></li>
                            <li class="half"><p>Experience</p><p>${stats.basicStats.experience}</p></li>
                        </ul>

                        <ul class="main-stats">
                            <li>Season stats 2023-2024</li>
                            <li><p>Ppg</p><p>${stats.stats.points.toFixed(1)}</p></li>
                            <li><p>Rpg</p><p>${stats.stats.rebounds.toFixed(1)}</p></li>
                            <li><p>Apg</p><p>${stats.stats.assists.toFixed(1)}</p></li>
                            <li><p>Spg</p><p>${stats.stats.steals.toFixed(1)}</p></li>
                            <li><p>Bpg</p><p>${stats.stats.blocks.toFixed(1)}</p></li>
                            <li><p>Tpg</p><p>${stats.advancedStats.turnoversPerGame.toFixed(1)}</p></li>
                            <li><p>Gp</p><p>${stats.advancedStats.gamesPlayed}</p></li>
                            <li><p>Gs</p><p>${stats.advancedStats.gamesStarted}</p></li>
                            <li><p>Mpg</p><p>${stats.advancedStats.minutesPerGame.toFixed(1)}</p></li>
                            <li><p>Pf</p><p>${stats.advancedStats.personalFoulsPerGame.toFixed(1)}</p></li>
                            <li><p>+/-</p><p>${stats.advancedStats.plusMinus.toFixed(1)}</p></li>
                            <li><p>Ts%</p><p>${stats.advancedStats.trueShootingPercentage.toFixed(1)}</p></li>
                        </ul>   
                        <div class="player-highlights">
                            <iframe 
                                src=${stats.highlight}
                                allow="autoplay; encrypted-media"
                                allowfullscreen>
                            </iframe>
                        </div>
                                           
                </div>
            </div>`
    document.querySelector('.build').innerHTML = rosterHTML;
}
function feetToMeters(feet, inches ) {
    const totalInches = (feet * 12) + inches;
    const meters = totalInches * 0.0254;
    return meters.toFixed(2);
}
window.addEventListener('DOMContentLoaded', buildRoster);