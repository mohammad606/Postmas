import Nav from "@/app/component/common/Bar/Nav";
import Sidebar from "@/app/component/common/Bar/Sidebar/Sidebar";
import ClientPage from "@/app/component/FetchPageContenar/ClientPage";

export default function Home() {
    return (
        <main className={'flex flex-col'}>
            <Nav />
            <div className={'flex w-full h-full'}>
                <Sidebar />
                <ClientPage />
            </div>
        </main>
    );
}