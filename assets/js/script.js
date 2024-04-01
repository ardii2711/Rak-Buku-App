document.addEventListener("DOMContentLoaded", function () {
  // Fungsi ketika checkbox di klik
  const checkbox = document.getElementById("cek-buku-selesai");
  const statusBuku = document.getElementById("status-buku");

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      statusBuku.innerText = "Selesai Dibaca";
    } else {
      statusBuku.innerText = "Belum Selesai Dibaca";
    }
  });

  // simapan data buku ke array
  let buku = [];

  // Render buku
  function renderBuku() {
    const listBukuBelumSelesaiDibaca = document.getElementById("list-buku-belum-selesai-dibaca");
    const listBukuSelesaiDibaca = document.getElementById("list-buku-selesai-dibaca");
    listBukuBelumSelesaiDibaca.innerHTML = "";
    listBukuSelesaiDibaca.innerHTML = "";

    for (const bukuItem of buku) {
      const infoBuku = buatBuku(bukuItem);
      if (bukuItem.isComplete) {
        listBukuSelesaiDibaca.appendChild(infoBuku);
      } else {
        listBukuBelumSelesaiDibaca.appendChild(infoBuku);
      }
    }
  }

  // Tambah buku
  const inputBuku = document.getElementById("input-buku");

  inputBuku.addEventListener("submit", function (event) {
    event.preventDefault();
    tambahBuku();
    renderBuku();
  });

  // Fungsi tambah buku
  function tambahBuku() {
    const judulBuku = document.getElementById("judul-buku").value;
    const penulisBuku = document.getElementById("penulis-buku").value;
    const tahunBuku = document.getElementById("tahun-buku").value;
    const selesaiBaca = document.getElementById("cek-buku-selesai").checked;

    // Buat id buku
    function buatIdBuku() {
      return +new Date();
    }
    const idBuku = buatIdBuku();

    // Buat objek buku
    function buatObjekBuku(id, title, author, year, isComplete) {
      return {
        id,
        title,
        author,
        year: parseInt(year),
        isComplete,
      };
    }

    // Tambah buku ke dalam array
    const objekBuku = buatObjekBuku(
      idBuku,
      judulBuku,
      penulisBuku,
      tahunBuku,
      selesaiBaca,
    );
    buku.push(objekBuku);

    // Trigger event render-buku
    const RENDER_EVENT = "render-buku";
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  // Listener event render-buku
  document.addEventListener("render-buku", function () {
    renderBuku();
    simpanData();
  });

  // Fungsi untuk membuat elemen buku
  function buatBuku(objekBuku) {
    const infoBuku = document.createElement("div");
    infoBuku.classList.add("info-buku");

    const judulBuku = document.createElement("h3");
    judulBuku.classList.add("judul-buku");
    judulBuku.innerText = objekBuku.title;
    infoBuku.appendChild(judulBuku);

    const penulisBuku = document.createElement("p");
    penulisBuku.classList.add("penulis-buku");
    penulisBuku.innerText = objekBuku.author;
    infoBuku.appendChild(penulisBuku);

    const tahunBuku = document.createElement("p");
    tahunBuku.classList.add("tahun-buku");
    tahunBuku.innerText = objekBuku.year;
    infoBuku.appendChild(tahunBuku);

    const aksiBuku = document.createElement("div");
    aksiBuku.classList.add("aksi-buku");
    infoBuku.appendChild(aksiBuku);

    if (objekBuku.isComplete) {
      const selesaiBaca = document.createElement("button");
      selesaiBaca.classList.add("selesai-dibaca");
      selesaiBaca.innerText = "Belum Selesai Dibaca";
      aksiBuku.appendChild(selesaiBaca);

      selesaiBaca.addEventListener("click", function () {
        tambahBukuKeBelumSelesaiDibaca(objekBuku.id);
      });

      const hapusBuku = document.createElement("button");
      hapusBuku.classList.add("hapus-buku");
      hapusBuku.innerText = "Hapus Buku";
      aksiBuku.appendChild(hapusBuku);

      hapusBuku.addEventListener("click", function () {
        tampilkanDialog();
        const tombolBatal = document.getElementById("btn-batal");
        const tombolHapus = document.getElementById("btn-hapus");
        tombolBatal.addEventListener("click", function () {
          sembunyikanDialog();
        });
        tombolHapus.addEventListener("click", function () {
          hapusBukuDariDaftar(objekBuku.id);
          sembunyikanDialog();
        });
      });
    } else {
      const selesaiBaca = document.createElement("button");
      selesaiBaca.classList.add("selesai-dibaca");
      selesaiBaca.innerText = "Selesai Dibaca";
      aksiBuku.appendChild(selesaiBaca);

      selesaiBaca.addEventListener("click", function () {
        tambahBukuKeSelesaiDibaca(objekBuku.id);
      });

      const hapusBuku = document.createElement("button");
      hapusBuku.classList.add("hapus-buku");
      hapusBuku.innerText = "Hapus Buku";
      aksiBuku.appendChild(hapusBuku);

      hapusBuku.addEventListener("click", function () {
        tampilkanDialog();
        const tombolBatal = document.getElementById("btn-batal");
        const tombolHapus = document.getElementById("btn-hapus");
        tombolBatal.addEventListener("click", function () {
          sembunyikanDialog();
        });
        tombolHapus.addEventListener("click", function () {
          hapusBukuDariDaftar(objekBuku.id);
          sembunyikanDialog();
        });
      });
    }
    return infoBuku;
  }

  // Fungsi untuk menambahkan buku ke dalam daftar selesai dibaca
  function tambahBukuKeSelesaiDibaca(idBuku) {
    for (const bukuItem of buku) {
      if (bukuItem.id === idBuku) {
        bukuItem.isComplete = true;
      }
    }
    const RENDER_EVENT = "render-buku";
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  // Fungsi untuk menambahkan buku ke dalam daftar belum selesai dibaca
  function tambahBukuKeBelumSelesaiDibaca(idBuku) {
    for (const bukuItem of buku) {
      if (bukuItem.id === idBuku) {
        bukuItem.isComplete = false;
      }
    }
    const RENDER_EVENT = "render-buku";
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  // Fungsi untuk menghapus buku dari daftar
  function hapusBukuDariDaftar(idBuku) {
    for (let i = 0; i < buku.length; i++) {
      if (buku[i].id === idBuku) {
        buku.splice(i, 1);
        break;
      }
    }
    renderBuku();
    const RENDER_EVENT = "render-buku";
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  // Fungsi untuk pencarian buku
  const formBuku = document.getElementById("cari-buku");
  formBuku.addEventListener("submit", function (event) {
    event.preventDefault();
    cariBuku();
  });

  function cariBuku() {
    const kataKunci = document.getElementById("cari-judul").value.toLowerCase();
    const hasilPencarian = buku.filter((buku) =>
      buku.title.toLowerCase().includes(kataKunci)
    );
  
    const listBukuBelumSelesaiDibaca = document.getElementById("list-buku-belum-selesai-dibaca");
    const listBukuSelesaiDibaca = document.getElementById("list-buku-selesai-dibaca");
  
    listBukuBelumSelesaiDibaca.innerHTML = "";
    listBukuSelesaiDibaca.innerHTML = "";
  
    for (const bukuItem of hasilPencarian) {
      const infoBuku = buatBuku(bukuItem);
      if (bukuItem.isComplete) {
        listBukuSelesaiDibaca.appendChild(infoBuku);
      } else {
        listBukuBelumSelesaiDibaca.appendChild(infoBuku);
      }
    }
  }

  // Custom Dialog
  const dialog = document.getElementById("dialog");
  function tampilkanDialog() {
    dialog.style.display = "flex";
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);
  }
  function sembunyikanDialog() {
    dialog.style.display = "none";
    const overlay = document.querySelector(".overlay");
    if (overlay) {
      overlay.remove();
    }
  }

  // Fungsi untuk menyimpan data buku ke dalam localStorage
  function simpanData() {
    const dataBuku = JSON.stringify(buku);
    localStorage.setItem("dataBuku", dataBuku);
  }

  // Fungsi untuk memuat data buku dari localStorage
  function muatData() {
    const dataBuku = localStorage.getItem("dataBuku");
    if (dataBuku) {
      buku = JSON.parse(dataBuku);
      renderBuku();
    }
  }

  muatData();
  document.addEventListener("render-buku", simpanData);
});
