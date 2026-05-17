import NavBar from "../components/NavBar";


function AdminProfile() {
    return(
        <main className="flex h-screen w-full overflow-hidden bg-gray-300 text-zinc-900">
            <div className="h-screen w-64 shrink-0 overflow-hidden shadow-2xl">
                <NavBar />
            </div>

            <section className="flex min-w-0 flex-1 flex-col gap-5 overflow-y-auto p-5">
                <header className="rounded-lg bg-gray-500 px-5 py-4 shadow-lg">
                    <h1 className="text-2xl font-bold text-white">Admin Profile</h1>
                    <p className="text-sm text-gray-100">Manage your account details.</p>
                </header>
            </section>
        </main>
    );
}

export default AdminProfile;
