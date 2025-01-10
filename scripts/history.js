let history= "";
let colorChange= "";
function homePage(){
    clearInterval(colorChange);
    history = `<div class="home">`;
    history += `<h2 class="fade-up">${home.title}</h2>
                <p class="fade-up delay1">${home.text1}</p>
                <p class="fade-up delay2">${home.text2}</p>`;
    history += `</div>`;
    history += `<h3 class="fade-up delay3">Explore the Lakers' Eras</h3>`;
    history += `<div class="eras">`;
    eras.forEach((era) => {
       
        history += `<button class="era fade-up delay3" id="${era.id}">
                        ${era.start}-${era.end}
                    </button>`;
    });
    history += `</div>`;
    history += `<div class="eraStory"></div>`;
    document.querySelector('.history').innerHTML = history;

    setTimeout(() => {
        document.querySelectorAll('.fade-up').forEach(element => {
            element.classList.add('visible');
        });

    }, 1000);

   
        const eraButtons = document.querySelectorAll('.era');
        eraButtons.forEach((button) => {
            let buttonId = parseInt(button.id, 10);
            if (buttonId %2 === 0){ 
                button.style.backgroundColor = '#FFC72C';
                button.style.color = '#582C83';
            }
            else{
                button.style.backgroundColor = '#582C83';
                button.style.color = '#FFC72C';
            }
          
        });

        eraButtons.forEach(button => {
            let eraFind = eras.find(era => era.id === button.id);     

            eraText = document.querySelector('.eraStory');
            button.addEventListener('click', () => {
                eraText.innerHTML = `<button class="btn cancel-btn" onclick="eraText.innerHTML='';
                eraText.style.backgroundColor = '';
                "><i class="fas fa-times"></i></button>
                <h3>${eraFind.start}-${eraFind.end}</h3>
                <h3>${eraFind.name}</h3>
                <p>${eraFind.text}<p>`;
                eraText.style.backgroundColor = button.style.backgroundColor;
                eraText.style.color = button.style.color;
                let eraIndex = eras.findIndex(era => era.id === button.id);
                let storyButtons = document.querySelectorAll('.btn');
                storyButtons.forEach(button => {
                    button.style.color = eraText.style.color;
                   
                });
                window.addEventListener('keydown', (event) => {
                    if (event.key === 'Escape') {
                        eraText.innerHTML = '';
                        eraText.style.backgroundColor = '';
                    }
                });
            });
            
        });


    
}

window.addEventListener('DOMContentLoaded', homePage);