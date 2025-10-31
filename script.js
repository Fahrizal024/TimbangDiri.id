document.getElementById("healthForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Ambil data input
  const nama = document.getElementById("nama").value;
  const gender = document.getElementById("gender").value;
  const berat = parseFloat(document.getElementById("berat").value);
  const tinggi = parseFloat(document.getElementById("tinggi").value);

  // Cek validasi
  if (!nama || !gender || !berat || !tinggi) {
    alert("Mohon isi semua data dengan lengkap!");
    return;
  }

  // Sembunyikan form dan tampilkan loading
  document.getElementById("formSection").classList.add("hidden");
  document.getElementById("loadingSection").classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("loadingSection").classList.add("hidden");
    document.getElementById("resultSection").classList.remove("hidden");

    // Hitung BMI
    const tinggiMeter = tinggi / 100;
    const bmi = berat / (tinggiMeter * tinggiMeter);
    let status = "";
    let tips = "";

    if (bmi < 18.5) {
      status = "Kurus";
      tips = `
        <strong>Kamu perlu menambah asupan bergizi!</strong><br>
        Coba konsumsi makanan tinggi protein seperti telur, daging, dan susu.<br>
        <em>Ingat, tubuh sehat adalah investasi masa depanmu 💪</em>
      `;
    } else if (bmi >= 18.5 && bmi < 25) {
      status = "Normal";
      tips = `
        <strong>Berat badanmu ideal! 🎯</strong><br>
        Pertahankan pola makan sehat dan tetap aktif bergerak.<br>
        <em>Kamu sudah di jalur yang tepat, terus semangat menjaga diri!</em>
      `;
    } else if (bmi >= 25 && bmi < 30) {
      status = "Berlebih";
      tips = `
        <strong>Kamu sedikit berlebih, tapi jangan khawatir!</strong><br>
        Mulailah dengan olahraga ringan dan kurangi makanan manis.<br>
        <em>Setiap langkah kecil menuju sehat adalah kemenangan besar 💫</em>
      `;
    } else {
      status = "Obesitas";
      tips = `
        <strong>Waktunya berubah untuk kesehatanmu! ❤️</strong><br>
        Konsultasikan dengan ahli gizi dan mulai pola hidup aktif.<br>
        <em>Tubuhmu pantas mendapatkan versi terbaiknya — mulai hari ini!</em>
      `;
    }

    // Tampilkan tanggal
    const tanggal = new Date();
    const tanggalLengkap = `${tanggal.getDate()}-${tanggal.getMonth() + 1}-${tanggal.getFullYear()}`;
    document.getElementById("tanggalHasil").textContent = `Tanggal: ${tanggalLengkap}`;

    // Tampilkan hasil ke tabel
    const tableBody = document.getElementById("dataTable");
    tableBody.innerHTML = `
      <tr>
        <td>${nama}</td>
        <td>${gender}</td>
        <td>${berat}</td>
        <td>${tinggi}</td>
        <td>${bmi.toFixed(1)}</td>
        <td>${status}</td>
      </tr>
    `;

    // Tampilkan tips dengan animasi
    const tipsBox = document.getElementById("bmiTips");
    tipsBox.innerHTML = tips;
    tipsBox.classList.add("show"); // tambahkan animasi CSS
  }, 2000); // waktu loading
});

// Tombol kembali
document.getElementById("backButton").addEventListener("click", () => {
  document.getElementById("resultSection").classList.add("hidden");
  document.getElementById("formSection").classList.remove("hidden");
  document.getElementById("healthForm").reset();
});

// Simpan PDF
document.getElementById("savePDF").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const tanggal = document.getElementById("tanggalHasil").textContent;
  const isi = document.getElementById("dataTable").innerText;
  const tips = document.getElementById("bmiTips").innerText;

  doc.text("Hasil TimbangDiri.id", 10, 10);
  doc.text(tanggal, 10, 20);
  doc.text(isi, 10, 40);
  doc.text(tips, 10, 80);

  doc.save("Hasil_TimbangDiri.pdf");
});

