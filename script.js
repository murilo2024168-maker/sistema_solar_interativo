// Mapeamento das imagens de fundo (reintroduzido para o novo layout)
const backgroundImages = {
    'sol': 'https://images-assets.nasa.gov/image/PIA18485/PIA18485~orig.jpg',
    'mercurio': 'https://images-assets.nasa.gov/image/PIA13645/PIA13645~orig.jpg',
    'venus': 'https://images-assets.nasa.gov/image/PIA00271/PIA00271~orig.jpg',
    'terra': 'https://images-assets.nasa.gov/image/PIA12809/PIA12809~orig.jpg',
    'marte': 'https://images-assets.nasa.gov/image/PIA04222/PIA04222~orig.jpg',
    'jupiter': 'https://images-assets.nasa.gov/image/PIA21757/PIA21757~orig.jpg',
    'saturno': 'https://images-assets.nasa.gov/image/PIA17652/PIA17652~orig.jpg',
    'urano': 'https://images-assets.nasa.gov/image/PIA18182/PIA18182~orig.jpg',
    'netuno': 'https://images-assets.nasa.gov/image/PIA01142/PIA01142~orig.jpg'
};

const body = document.body;

/**
 * Função principal para mostrar as informações de um planeta específico.
 */
function showPlanet(planetId) {
    // 1. Mudar o Fundo Dinamicamente
    const newBackground = backgroundImages[planetId];
    if (newBackground) {
        body.style.backgroundImage = `url('${newBackground}')`;
    }

    const allInfoPanels = document.querySelectorAll('.planet-info');
    const selectedPlanetPanel = document.getElementById(planetId);
    
    // 2. Inicia o FADE-OUT e esconde todos os painéis
    allInfoPanels.forEach(panel => {
        panel.classList.remove('visible'); // Remove a classe para iniciar fade-out
        // Após a transição CSS (0.6s), esconde o elemento
        setTimeout(() => {
            panel.style.display = 'none';
        }, 600); // Deve ser igual ao tempo da transição em CSS (0.6s = 600ms)
    });

    // 3. Remove o destaque de todos os botões
    const allButtons = document.querySelectorAll('nav button');
    allButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // 4. Garante que o novo painel seja mostrado APENAS após o anterior ter começado a desaparecer.
    setTimeout(() => {
        if (selectedPlanetPanel) {
            selectedPlanetPanel.style.display = 'block'; // Mostra o painel
            
            // Usa requestAnimationFrame para garantir que o display:block seja aplicado
            // antes de adicionar a classe 'visible' para o fade-in.
            window.requestAnimationFrame(() => {
                selectedPlanetPanel.classList.add('visible'); // Adiciona a classe para iniciar fade-in
            });
        }
    }, 610); // 600ms (transição CSS) + 10ms (buffer)

    // 5. Destaca o botão ativo
    const clickedButton = document.querySelector(`button[onclick="showPlanet('${planetId}')"]`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

// ----------------------------------------------------
// O QUIZ FOI REMOVIDO
// ----------------------------------------------------

/**
 * Inicia a página com as informações do Sol (CORRIGIDO PARA EVITAR PISCA-PISCA)
 */
window.onload = () => {
    // 1. Define o fundo inicial
    document.body.style.backgroundImage = `url('${backgroundImages['sol']}')`;
    
    // 2. Define o painel inicial (Sol) como visível (sem transição)
    const solElement = document.getElementById('sol');
    if (solElement) {
        solElement.style.display = 'block'; // Mostra
        solElement.classList.add('visible'); // Aplica opacidade 1
    }
    
    // 3. Define o botão inicial (Sol) como ativo
    const solButton = document.querySelector('button[onclick="showPlanet(\'sol\')"]');
    if (solButton) {
        solButton.classList.add('active');
    }
};