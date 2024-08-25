import { useState } from "react";
import OfferForm from "./OfferForm";
export default function Home() {


    return (
        <main className="flex min-h-screen justify-center items-center">
            <div className=" h-[700px] p-4 my-4">
                <h1 className="text-4xl ">Bokningsförfrågan</h1>
                <OfferForm/>
            </div>
        </main>
    );
}
