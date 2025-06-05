<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Barang; // Import model Barang
// use App\Models\Penjualan; // Import model Penjualan (akan digunakan nanti)

class DashboardController extends Controller
{
    public function index()
    {
        $barangTersediaCount = Barang::where('stok', '>', 0)->count();
        $totalPenjualanHariIni = 0; // Placeholder
        $produkTerlarisBulanIni = 'Belum ada data'; // Placeholder

        return Inertia::render('Dashboard', [
            'totalPenjualanHariIni' => $totalPenjualanHariIni,
            'barangTersediaCount' => $barangTersediaCount,
            'produkTerlarisBulanIni' => $produkTerlarisBulanIni,
        ]);
    }
}