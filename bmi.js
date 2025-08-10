// script.js

document.getElementById("calculateBtn").addEventListener("click", function () {
  const heightInput = document.getElementById("height").value;
  const weightInput = document.getElementById("weight").value;

  // تحقق من المدخلات
  if (!heightInput || !weightInput || heightInput <= 0 || weightInput <= 0) {
    alert("يرجى إدخال قيم صحيحة للطول والوزن.");
    return;
  }

  const heightM = heightInput / 100; // تحويل من سم لمتر
  const weight = parseFloat(weightInput);

  // حساب BMI
  const bmi = weight / (heightM * heightM);
  const bmiRounded = bmi.toFixed(1);

  // حساب الوزن المثالي (حدود BMI: 18.5 - 24.9)
  const minIdealWeight = 18.5 * heightM * heightM;
  const maxIdealWeight = 24.9 * heightM * heightM;

  // تحديد التصنيف النصي واللون للبار
  let bmiText = "";
  let barPercent = 0; // نسبة عرض البار من 0% إلى 100%
  let barColor = "";
  let weightAdvice = "";

  if (bmi < 18.5) {
    bmiText = "وزنك أقل من الطبيعي (نحيف)";
    // برتقالي أحمر للبداية
    barPercent = (bmi / 18.5) * 40; // نسبي في نطاق 0-40%
    weightAdvice =` ننصحك بزيادة ${(minIdealWeight - weight).toFixed(1)} كغ للوصول للوزن الصحي.`;
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    bmiText = "وزنك مثالي";
    barPercent = 50 + ((bmi - 18.5) / (24.9 - 18.5)) * 30; // بين 50% و80%
    weightAdvice = "استمر على نمط حياة صحي!";
  } else if (bmi > 24.9 && bmi <= 29.9) {
    bmiText = "زيادة في الوزن";
    barPercent = 80 + ((bmi - 24.9) / (29.9 - 24.9)) * 20; // بين 80% و100%
    weightAdvice =` ننصحك بخسارة ${(weight - maxIdealWeight).toFixed(1)} كغ لتحسين صحتك.`;
  } else {
    bmiText = "سمنة مفرطة";
    barPercent = 100;
    weightAdvice =` ننصحك بخسارة ${(weight - maxIdealWeight).toFixed(1)} كغ بشكل صحي ومستمر.`;
  }

  // حد أقصى للبار
  if (barPercent > 100) barPercent = 100;
  if (barPercent < 0) barPercent = 0;

  // تحديث النتائج في الصفحة
  document.getElementById("bmiValue").textContent =` مؤشر كتلة الجسم (BMI): ${bmiRounded}`;
  document.getElementById("bmiText").textContent = bmiText;
  document.getElementById("weightAdvice").textContent = weightAdvice;

  // تحريك البار وتلوينه حسب النسبة
  const bmiBar = document.getElementById("bmiBar");
  bmiBar.style.width = barPercent + "%";

  // تدرج ألوان من الأحمر إلى الأخضر
  // نستخدم تدرج ثابت من CSS linear-gradient، فاللون يتغير بالتدرج
});