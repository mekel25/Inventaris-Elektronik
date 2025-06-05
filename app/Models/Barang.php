<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    use HasFactory;
    protected $fillable = [
        'kategori_id',
        'nama_barang',
        'deskripsi',
        'harga',
        'stok',
    ];

    // Relasi ke Kategori (satu barang dimiliki oleh satu kategori)
    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }
}