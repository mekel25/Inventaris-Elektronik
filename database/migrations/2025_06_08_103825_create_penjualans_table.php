// database/migrations/xxxx_xx_xx_xxxxxx_create_penjualans_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('penjualans', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('pelanggan_id')->nullable()->constrained('pelanggans')->onDelete('set null'); // Jika Anda akan punya tabel pelanggan
            $table->string('nama_pelanggan')->nullable(); // Untuk pelanggan non-member atau data cepat
            $table->dateTime('tanggal_penjualan')->default(now());
            $table->decimal('total_harga', 15, 2); // Total harga transaksi (misal: hingga 999 Triliun dengan 2 desimal)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penjualans');
    }
};