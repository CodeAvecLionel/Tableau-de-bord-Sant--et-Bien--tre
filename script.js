
    // Fonction pour générer des données aléatoires
    function generateRandomData(min, max, count) {
      return Array.from({length: count}, () => Math.floor(Math.random() * (max - min + 1) + min));
    }

    // Mise à jour des statistiques d'activité
    document.getElementById('steps').textContent = Math.floor(Math.random() * 10000);
    document.getElementById('distance').textContent = (Math.random() * 10).toFixed(1);
    document.getElementById('calories').textContent = Math.floor(Math.random() * 500);

    // Graphique d'activité
    let activityChart, sleepChart, nutritionChart;

    function createCharts() {
      // Graphique d'activité
      const activityCtx = document.getElementById('activityChart').getContext('2d');
      activityChart = new Chart(activityCtx, {
        type: 'line',
        data: {
          labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
          datasets: [{
            label: 'Pas',
            data: generateRandomData(5000, 15000, 7),
            borderColor: '#4a90e2',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      // Graphique de sommeil
      const sleepCtx = document.getElementById('sleepChart').getContext('2d');
      sleepChart = new Chart(sleepCtx, {
        type: 'bar',
        data: {
          labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
          datasets: [{
            label: 'Heures de sommeil',
            data: generateRandomData(5, 9, 7),
            backgroundColor: '#4a90e2'
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 12
            }
          }
        }
      });

      // Graphique d'alimentation
      const nutritionCtx = document.getElementById('nutritionChart').getContext('2d');
      nutritionChart = new Chart(nutritionCtx, {
        type: 'doughnut',
        data: {
          labels: ['Protéines', 'Glucides', 'Lipides'],
          datasets: [{
            data: [25, 50, 25],
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
          }]
        },
        options: {
          responsive: true
        }
      });
    }

    createCharts();

    // Gestion du thème
    const themeSelect = document.getElementById('themeSelect');
    themeSelect.addEventListener('change', function() {
      if (this.value === 'dark') {
        document.documentElement.style.setProperty('--background-color', '#1a1a1a');
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--card-background', '#2c2c2c');
        document.documentElement.style.setProperty('--primary-color', '#6ab0ff');
        document.documentElement.style.setProperty('--advice-background', '#2e4132');
        document.documentElement.style.setProperty('--advice-border', '#4caf50');
      } else {
        document.documentElement.style.setProperty('--background-color', '#f0f4f8');
        document.documentElement.style.setProperty('--text-color', '#333');
        document.documentElement.style.setProperty('--card-background', 'white');
        document.documentElement.style.setProperty('--primary-color', '#4a90e2');
        document.documentElement.style.setProperty('--advice-background', '#e8f5e9');
        document.documentElement.style.setProperty('--advice-border', '#4caf50');
      }
    });

    // Gestion de la langue
    const langSelect = document.getElementById('langSelect');
    const translations = {
      fr: {
        mainTitle: "Tableau de bord Santé et Bien-être",
        activityTitle: "Activité Physique",
        sleepTitle: "Sommeil",
        nutritionTitle: "Alimentation",
        goalsTitle: "Objectifs Personnels",
        stepsLabel: "Pas",
        distanceLabel: "km",
        caloriesLabel: "Cal",
        goals: [
          "Marcher 10 000 pas par jour",
          "Dormir 8 heures par nuit",
          "Boire 2L d'eau par jour",
          "Méditer 10 minutes chaque matin"
        ],
        advices: [
          "Prenez le temps de respirer profondément plusieurs fois par jour pour réduire le stress.",
          "Essayez d'incorporer plus de fruits et légumes dans votre alimentation pour booster votre système immunitaire.",
          "N'oubliez pas de vous étirer régulièrement, surtout si vous travaillez assis toute la journée.",
          "La gratitude peut améliorer votre bien-être mental. Notez trois choses pour lesquelles vous êtes reconnaissant chaque jour."
        ]
      },
      en: {
        mainTitle: "Health and Wellness Dashboard",
        activityTitle: "Physical Activity",
        sleepTitle: "Sleep",
        nutritionTitle: "Nutrition",
        goalsTitle: "Personal Goals",
        stepsLabel: "Steps",
        distanceLabel: "km",
        caloriesLabel: "Cal",
        goals: [
          "Walk 10,000 steps a day",
          "Sleep 8 hours a night",
          "Drink 2L of water a day",
          "Meditate for 10 minutes every morning"
        ],
        advices: [
          "Take time to breathe deeply several times a day to reduce stress.",
          "Try to incorporate more fruits and vegetables into your diet to boost your immune system.",
          "Don't forget to stretch regularly, especially if you work sitting all day.",
          "Gratitude can improve your mental well-being. Write down three things you're grateful for each day."
        ]
      }
    };

    function updateLanguage(lang) {
      const t = translations[lang];
      document.getElementById('mainTitle').textContent = t.mainTitle;
      document.getElementById('activityTitle').textContent = t.activityTitle;
      document.getElementById('sleepTitle').textContent = t.sleepTitle;
      document.getElementById('nutritionTitle').textContent = t.nutritionTitle;
      document.getElementById('goalsTitle').textContent = t.goalsTitle;
      document.getElementById('stepsLabel').textContent = t.stepsLabel;
      document.getElementById('distanceLabel').textContent = t.distanceLabel;
      document.getElementById('caloriesLabel').textContent = t.caloriesLabel;

      const goalsList = document.getElementById('goalsList');
      goalsList.innerHTML = '';
      t.goals.forEach(goal => {
        const li = document.createElement('li');
        li.textContent = goal;
        goalsList.appendChild(li);
      });

      const adviceBox = document.getElementById('adviceBox');
      adviceBox.textContent = t.advices[Math.floor(Math.random() * t.advices.length)];

      // Mise à jour des labels des graphiques
      activityChart.data.datasets[0].label = t.stepsLabel;
      activityChart.update();

      sleepChart.data.datasets[0].label = lang === 'fr' ? 'Heures de sommeil' : 'Sleep hours';
      sleepChart.update();

      nutritionChart.data.labels = lang === 'fr' ? ['Protéines', 'Glucides', 'Lipides'] : ['Proteins', 'Carbs', 'Fats'];
      nutritionChart.update();
    }

    langSelect.addEventListener('change', function() {
      updateLanguage(this.value);
    });

    // Initialisation
    updateLanguage('fr');
