import QuizNumber from "@/components/QuizNumber";
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/quiz")({
    component: Quiz,
});

function Quiz(){
    return (
        <div className="bg-[#F5F5F5] w-dvw h-dvh ">
            <div className="flex items-start max-w-[1300px] w-full mx-auto justify-between gap-[5%] lg:flex-row flex-col pt-20">
                {/* SECTION KIRI */}
                <div className="flex items-start  lg:w-[781px] w-full h-full flex-col gap-[21px]">
                    <div className="flex py-[30px] px-5 items-center gap-5 self-stretch bg-white rounded-2xl shadow-md">
                        <p>Tingkat Kesulitan: <span className="text-[#EB7348]  font-semibold">Sulit</span></p>
                        <p>Tipe soal: <span className="text-[#0E7490] font-semibold">Pilihan ganda</span></p>
                    </div>
                    
                    <div className="flex min-h-[330px] py-[30px] px-6 flex-col justify-between items-start self-stretch rounded-xl bg-white shadow-md mb-4 lg:mb-0">
                        <div>
                            <p className="mb-4 font-bold">1. Siapa Mulyono</p>
                            <form action="" className="ml-4 space-y-4">
                                <div>
                                    <input type="radio" name="soal_1" id="jokowi" className="mr-2"/>
                                    <label htmlFor="jokowi" className="">Jokowi</label>
                                </div>
                                
                                <div>
                                    <input type="radio" name="soal_1" id="habibie" className="mr-2"/>
                                    <label htmlFor="habibie">Habibie</label> 
                                </div>
                                
                                <div>
                                    <input type="radio" name="soal_1" id="raka" className="mr-2"/>
                                    <label htmlFor="raka">Raka</label> 
                                </div>
                                <div>
                                    <input type="radio" name="soal_1" id="gibran" className="mr-2"/>
                                    <label htmlFor="gibran">Gibran</label> 
                                </div>
                                
                            </form>
                        </div>
                        <div className="flex items-center self-stretch justify-between mt-14">
                            <button className="h-10 p-2.5 w-full max-w-[150px] min-w-[130px] bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-500 rounded-lg cursor-pointer">Sebelumnya</button>
                            <p className="hidden md:block">Soal 1 dari 15</p>
                            <button className="h-10 p-2.5 w-full max-w-[150px] min-w-[130px] bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 rounded-lg text-white cursor-pointer">Selanjutnya</button>
                        </div>
                    </div>
                </div>


                {/* SECTION KANAN */}
                <div className="flex lg:w-[630px] w-full flex-col items-center gap-[30px] self-stretch justify-between">
                    <div className="flex px-[30px] py-5 flex-col items-start gap-[26px] self-stretch rounded-2xl bg-white shadow-md grow">
                        <p>Soal</p>
                        <div className="grid justify-between w-full h-full grid-cols-5">
                            {
                                [...Array(15)].map((_, i)=> (
                                    <QuizNumber key={i} number={i+1}/>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center self-stretch gap-x-[7%] gap-y-5">
                        <button className="rounded-[10px] shadow-2xl bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 h-10 grow text-white cursor-pointer">Ubah Quiz</button>
                        <button className="rounded-[10px] shadow-2xl bg-white hover:bg-slate-50 active:bg-slate-100 h-10 grow cursor-pointer">Unduh PDF</button>
                        <button className="rounded-[10px] shadow-2xl bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 h-10 w-full text-white cursor-pointer">Lihat Jawaban</button>
                    </div>
                </div>
            </div>
            
        </div>

    )
}