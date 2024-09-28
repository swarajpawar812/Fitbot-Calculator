let macronutrientChart;
document.getElementById('show-result-main').addEventListener('click', function() {
    console.log("Button clicked, starting calculations...");


    // Gather form inputs
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = parseInt(document.getElementById('age').value);
    let weight = parseFloat(document.getElementById('weight').value);
    let height = parseFloat(document.getElementById('height').value);
    const weightUnit = document.getElementById('weight-unit').value;
    const heightUnit = document.getElementById('height-unit').value;
    const activity = document.getElementById('activity').value;
    const goal = document.querySelector('input[name="goal"]:checked').value;

    // Convert units if necessary
    if (weightUnit === 'lbs') {
        weight = weight * 0.453592; // Convert lbs to kg
    }
    if (heightUnit === 'ft') {
        height = height * 30.48; // Convert feet to cm
    }

    // Validate inputs
    if (isNaN(weight) || isNaN(height) || isNaN(age) || weight <= 0 || height <= 0 || age <= 0) {
        alert('Please provide valid values for weight, height, and age.');
        return;
    }

    // Calculate BMI
    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    let bmiComment = '';
    if (bmi < 18.5) {
        bmiComment = 'Need To Gain Weight';
    } else if (bmi < 24.9) {
        bmiComment = 'Perfectly Healthy';
    } else if (bmi < 29.9) {
        bmiComment = 'Slightly Overweight';
    } else {
        bmiComment = 'Need To Lose Weight';
    }
    document.getElementById('bmi-result').textContent = `BMI: ${bmi} (${bmiComment})`;

    // Calculate BMR based on gender
    let bmr;
    if (gender === 'male') {
        bmr = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)).toFixed(2);
    } else {
        bmr = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)).toFixed(2);
    }
    document.getElementById('bmr-result').textContent = `BMR: ${bmr} kcal/day`;

    // Calculate TDEE
    const activityFactors = {
        sedentary: 1.2,
        low: 1.375,
        moderate: 1.55,
        high: 1.725,
        'very-high': 1.9
    };
    const tdee = (bmr * activityFactors[activity]).toFixed(2);
    document.getElementById('tdee-result').textContent = `TDEE: ${tdee} kcal/day`;

    // Calculate Macronutrients (Protein, Fats, Carbs, Fiber)
    let proteinFactor, fatFactor, carbFactor;
    if (goal === 'lose') {
        proteinFactor = 0.35;
        fatFactor = 0.25;
        carbFactor = 0.40;
    } else if (goal === 'maintain') {
        proteinFactor = 0.30;
        fatFactor = 0.30;
        carbFactor = 0.40;
    } else {
        proteinFactor = 0.30;
        fatFactor = 0.25;
        carbFactor = 0.45;
    }
    const protein = (tdee * proteinFactor / 4).toFixed(2);
    const fats = (tdee * fatFactor / 9).toFixed(2);
    const carbs = (tdee * carbFactor / 4).toFixed(2);
    const fiber = (tdee * 0.05 / 4).toFixed(2); // Adding fiber breakdown

    // Destroy existing chart instance if it exists
    if (macronutrientChart) {
        macronutrientChart.destroy();
    }

    // Display Macronutrient Breakdown using a Bar Chart
    const ctx = document.getElementById('macronutrient-bar-chart').getContext('2d');
    macronutrientChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Protein', 'Fats', 'Carbs', 'Fiber'],
            datasets: [{
                label: 'Grams per day',
                data: [protein, fats, carbs, fiber],
                backgroundColor: ['#4A90E2', '#E2A94A', '#4AE290', '#E24A4A'],
                borderColor: ['#357ABD', '#BD7E35', '#35BD76', '#BD3535'],
                borderWidth: 1
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

    // Show Results Section
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('definitions').classList.remove('hidden');
    document.getElementById('example-meal-plan').classList.remove('hidden');
    
});
