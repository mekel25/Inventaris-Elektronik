// resources/js/Pages/Kategori/Index.jsx
import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import { router } from "@inertiajs/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import ikon untuk tampilan yang lebih baik
import { PlusIcon, PencilIcon } from "@heroicons/react/24/solid";

export default function Index({ auth, kategoris, filters }) {
    const { flash } = usePage().props;

    const [showingModal, setShowingModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    // State baru untuk konfirmasi hapus di dalam modal
    const [confirmingDelete, setConfirmingDelete] = useState(false);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        id: null,
        nama_kategori: "",
    });

    const [searchTerm, setSearchTerm] = useState(filters.search || "");

    useEffect(() => {
        if (flash && flash.success) {
            toast.success(flash.success);
        }
        if (flash && flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    // Menggunakan useEffect untuk debounce search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(
                route("kategori.index"),
                { search: searchTerm },
                { preserveState: true, replace: true }
            );
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const openAddModal = () => {
        setIsEditMode(false);
        setConfirmingDelete(false);
        reset();
        setShowingModal(true);
    };

    const openEditModal = (kategori) => {
        setIsEditMode(true);
        setConfirmingDelete(false);
        setData({
            id: kategori.id,
            nama_kategori: kategori.nama_kategori,
        });
        setShowingModal(true);
    };

    const closeModal = () => {
        setShowingModal(false);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const targetRoute = isEditMode
            ? route("kategori.update", data.id)
            : route("kategori.store");
        const action = isEditMode ? put : post;

        action(targetRoute, {
            onSuccess: () => closeModal(),
            onError: (err) => console.error("Form submission error:", err),
        });
    };

    const handleDelete = () => {
        destroy(route("kategori.destroy", data.id), {
            onSuccess: () => closeModal(),
            onError: (err) => console.error("Delete Error:", err),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Manajemen Kategori
                </h2>
            }
        >
            <Head title="Manajemen Kategori" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium text-gray-900">
                                Daftar Kategori
                            </h3>
                            <PrimaryButton onClick={openAddModal}>
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Tambah Kategori
                            </PrimaryButton>
                        </div>

                        <div className="mb-4">
                            <TextInput
                                id="search"
                                type="text"
                                name="search"
                                value={searchTerm}
                                className="mt-1 block w-full md:w-1/2"
                                placeholder="Cari kategori..."
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {/* Diubah menjadi rata tengah */}
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama Kategori
                                        </th>
                                        {/* Diubah menjadi rata tengah */}
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {kategoris.data.length > 0 ? (
                                        kategoris.data.map((kategori) => (
                                            <tr key={kategori.id} className="hover:bg-gray-50">
                                                {/* Diubah menjadi rata tengah */}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                                    {kategori.nama_kategori}
                                                </td>
                                                {/* Diubah menjadi rata tengah & tombol hapus dihilangkan */}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                                                    <button onClick={() => openEditModal(kategori)} className="text-indigo-600 hover:text-indigo-900 font-medium flex items-center justify-center mx-auto">
                                                        <PencilIcon className="h-5 w-5 mr-1" />
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                                Tidak ada data kategori.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {kategoris.total > 0 && (
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-sm text-gray-700">
                                    Menampilkan {kategoris.from} sampai {kategoris.to} dari {kategoris.total} hasil
                                </span>
                                <div className="flex">
                                    {kategoris.links.map((link, index) => (
                                        <a key={index} href={link.url || '#'} onClick={(e) => {
                                                if(link.url) {
                                                    e.preventDefault();
                                                    router.get(link.url, {}, { preserveState: true });
                                                }
                                            }}
                                            className={`ml-2 px-3 py-1 rounded-md text-sm ${
                                                link.active ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
                                            } ${!link.url ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal Tambah/Edit Kategori yang sudah dimodifikasi */}
            <Modal show={showingModal} onClose={closeModal}>
                {/* Tampilan konfirmasi hapus */}
                {confirmingDelete ? (
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-2">
                            Anda yakin ingin menghapus kategori ini?
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Kategori "{data.nama_kategori}" akan dihapus secara permanen. Tindakan ini tidak dapat diurungkan.
                        </p>
                        <div className="flex justify-end items-center">
                            <SecondaryButton onClick={() => setConfirmingDelete(false)} className="mr-2">
                                Batal
                            </SecondaryButton>
                            <DangerButton onClick={handleDelete} disabled={processing}>
                                Ya, Hapus
                            </DangerButton>
                        </div>
                    </div>
                ) : (
                    /* Tampilan form Tambah/Edit */
                    <form onSubmit={handleSubmit} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">
                            {isEditMode ? "Edit Kategori" : "Tambah Kategori Baru"}
                        </h2>
                        <div className="mb-4">
                            <InputLabel htmlFor="nama_kategori" value="Nama Kategori" />
                            <TextInput id="nama_kategori" type="text" name="nama_kategori" value={data.nama_kategori} className="mt-1 block w-full" isFocused={true} onChange={(e) => setData("nama_kategori", e.target.value)} />
                            <InputError message={errors.nama_kategori} className="mt-2" />
                        </div>
                        {/* Tata letak tombol di footer modal diubah */}
                        <div className="flex justify-between items-center mt-6">
                            <div>
                                {isEditMode && (
                                    <DangerButton type="button" onClick={() => setConfirmingDelete(true)} disabled={processing}>
                                        Hapus
                                    </DangerButton>
                                )}
                            </div>
                            <div className="flex items-center">
                                <SecondaryButton type="button" onClick={closeModal} className="mr-2">
                                    Batal
                                </SecondaryButton>
                                <PrimaryButton disabled={processing}>
                                    {isEditMode ? "Simpan Perubahan" : "Tambah Kategori"}
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                )}
            </Modal>
            <ToastContainer position="bottom-right" theme="colored" />
        </AuthenticatedLayout>
    );
}