document.addEventListener('DOMContentLoaded', function() {
  // Fungsi ketika checkbox selesai dibaca di klik
  const checkbox = document.getElementById('cek-buku-selesai');
  const statusBuku = document.getElementById('status-buku');

  checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
      statusBuku.innerText = 'Selesai Dibaca';
    } else {
      statusBuku.innerText = 'Belum Selesai Dibaca';
    }
  });

  // Simpan objek buku ke dalam array
  let buku = [];

  // Render buku
  function renderBuku() {
    const listBukuBelumSelesaiDibaca = document.getElementById('list-buku-belum-selesai-dibaca');
    const listBukuSelesaiDibaca = document.getElementById('list-buku-selesai-dibaca');
    listBukuBelumSelesaiDibaca.innerHTML = '';
    listBukuSelesaiDibaca.innerHTML = '';

    for (const bukuItem of buku) {
      const infoBuku = buatBuku(bukuItem);
      if (bukuItem.selesai) {
        listBukuSelesaiDibaca.appendChild(infoBuku);
      } else {
        listBukuBelumSelesaiDibaca.appendChild(infoBuku);
      };
    }
  }

  // Tambahkan buku baru
  const inputBuku = document.getElementById('input-buku');

  inputBuku.addEventListener('submit', function(event) {
    event.preventDefault();
    tambahBuku();
    renderBuku();
  });

  // Fungsi tambah buku
  function tambahBuku() {
    const judulBuku = document.getElementById('judul-buku').value;
    const penulisBuku = document.getElementById('penulis-buku').value;
    const tahunBuku = document.getElementById('tahun-buku').value;
    const selesaiBaca = document.getElementById('cek-buku-selesai').checked;

    // Buat id buku
    function buatIdBuku() {
      return +new Date();
    }
    const idBuku = buatIdBuku();

    // Buat objek buku
    function buatObjekBuku(id, judul, penulis, tahun, selesai) {
      return {
        id,
        judul,
        penulis,
        tahun,
        selesai
      }
    }

    // Tambahkan buku ke dalam array
    const objekBuku = buatObjekBuku(idBuku, judulBuku, penulisBuku, tahunBuku, selesaiBaca);
    buku.push(objekBuku);

    // Trigger event render-buku
    const RENDER_EVENT = 'render-buku';
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  // Listener untuk event render-buku
  document.addEventListener('render-buku', renderBuku);

  // Fungsi untuk membuat elemen buku
  function buatBuku(objekBuku){
    const infoBuku = document.createElement('div');
    infoBuku.classList.add('info-buku');

    const judulBuku = document.createElement('h3');
    judulBuku.classList.add('judul-buku');
    judulBuku.innerText = objekBuku.judul;
    infoBuku.appendChild(judulBuku);

    const penulisBuku = document.createElement('p');
    penulisBuku.classList.add('penulis-buku');
    penulisBuku.innerText = objekBuku.penulis;
    infoBuku.appendChild(penulisBuku);

    const tahunBuku = document.createElement('p');
    tahunBuku.classList.add('tahun-buku');
    tahunBuku.innerText = objekBuku.tahun;
    infoBuku.appendChild(tahunBuku);

    const aksiBuku = document.createElement('div');
    aksiBuku.classList.add('aksi-buku');
    infoBuku.appendChild(aksiBuku);

    const selesaiBaca = document.createElement('button');
    selesaiBaca.classList.add('selesai-dibaca');
    selesaiBaca.innerText = objekBuku.selesai ? 'Belum Selesai Dibaca' : 'Selesai Dibaca'; 
    aksiBuku.appendChild(selesaiBaca);

    const hapusBuku = document.createElement('button');
    hapusBuku.classList.add('hapus-buku');
    hapusBuku.innerText = 'Hapus Buku';
    aksiBuku.appendChild(hapusBuku);

    return infoBuku;
  }
});
