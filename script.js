document.getElementById('macroForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const gender = document.querySelector('input[name="gender"]:checked').value;
  const age = parseInt(document.getElementById('age').value);
  const height = parseInt(document.getElementById('height').value);
  const weight = parseInt(document.getElementById('weight').value);
  const activity = parseFloat(document.getElementById('activity').value);
  const goal = document.querySelector('input[name="goal"]:checked').value;

  // معادلة Mifflin-St Jeor
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  let tdee = bmr * activity;

  // التعديل حسب الهدف
  if (goal === 'gain') {
    tdee += 300;
  } else if (goal === 'loss') {
    tdee -= 300;
  }

  // توزيع الماكروز
  const protein = weight * 2.2;
  const fat = weight * 0.9;
  const proteinCalories = protein * 4;
  const fatCalories = fat * 9;
  const carbCalories = tdee - (proteinCalories + fatCalories);
  const carbs = carbCalories / 4;

  // عرض النتيجة
  const result = `
    <h2>النتائج:</h2>
    <p><strong>السعرات اليومية:</strong> ${Math.round(tdee)} سعرة</p>
    <p><strong>البروتين:</strong> ${Math.round(protein)} غ</p>
    <p><strong>الكاربوهيدرات:</strong> ${Math.round(carbs)} غ</p>
    <p><strong>الدهون:</strong> ${Math.round(fat)} غ</p>
  `;

  document.getElementById('result').innerHTML = result;
});