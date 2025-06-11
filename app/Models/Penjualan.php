<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penjualan extends Model
{
    use HasFactory;

    // Kolom yang dapat diisi secara massal
    protected $fillable = [
        'nama_pelanggan',
        'tanggal_penjualan',
        'total_harga',
        // 'pelanggan_id', // Uncomment jika Anda punya tabel pelanggan
    ];

    // Relasi One-to-Many ke DetailPenjualan (satu penjualan memiliki banyak detail)
    public function details()
    {
        return $this->hasMany(DetailPenjualan::class);
    }

    // Relasi One-to-Many ke Pelanggan (opsional, jika Anda punya model Pelanggan.php)
    // public function pelanggan()
    // {
    //     return $this->belongsTo(Pelanggan::class);
    // }
}