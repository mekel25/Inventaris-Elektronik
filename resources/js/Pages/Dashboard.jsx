// resources/js/Pages/Dashboard.jsx
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
    auth,
    totalPenjualanHariIni,
    barangTersediaCount,
    produkTerlarisBulanIni,
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dasbor Admin
                </h2>
            }
        >
            <Head title="Dasbor Admin" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Selamat datang, {auth.user.name}!
                            </h3>

                            {/* Bagian Ringkasan Data */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                {/* Total Penjualan Hari Ini */}
                                <div className="bg-blue-100 p-4 rounded-lg shadow">
                                    <h4 className="font-bold text-blue-800">
                                        Total Penjualan Hari Ini
                                    </h4>
                                    <p className="text-2xl text-blue-900 mt-2">
                                        Rp{" "}
                                        {totalPenjualanHariIni
                                            ? parseFloat(
                                                  totalPenjualanHariIni
                                              ).toLocaleString("id-ID")
                                            : "0"}
                                    </p>
                                </div>

                                {/* Barang yang Tersedia */}
                                <div className="bg-green-100 p-4 rounded-lg shadow">
                                    <h4 className="font-bold text-green-800">
                                        Barang yang Tersedia
                                    </h4>
                                    <p className="text-2xl text-green-900 mt-2">
                                        {barangTersediaCount !== undefined
                                            ? barangTersediaCount
                                            : "0"}
                                    </p>
                                </div>

                                {/* Produk Terlaris Bulan Ini */}
                                <div className="bg-green-100 p-4 rounded-lg shadow">
                                    <h4 className="font-bold text-green-800">
                                        Produk Terlaris Bulan Ini
                                    </h4>
                                    <p className="text-xl text-green-900 mt-2">
                                        {produkTerlarisBulanIni ||
                                            "Belum ada data"}
                                    </p>
                                </div>
                            </div>

                            {/* Bagian Grafik Penjualan */}
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Grafik Penjualan
                            </h3>
                            <div className="bg-gray-50 p-6 rounded-lg shadow">
                                <p className="text-gray-600">
                                    Grafik penjualan akan tampil di sini
                                    (harian, mingguan, bulanan).
                                </p>
                            </div>

                            {/* Bagian Navigasi Cepat */}
                            <div className="mt-8">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">
                                    Aksi Cepat
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href={route("barang.index")}
                                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Manajemen Barang
                                    </Link>
                                    <Link
                                        href={route("transaksi.baru")}
                                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Transaksi Baru
                                    </Link>
                                    <Link
                                        href={route("laporan.penjualan")}
                                        className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Laporan Penjualan
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
