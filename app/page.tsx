"use client";
import { useState } from "react";
import OfferForm from "./OfferForm";
import PersonalForm from "./PersonalForm";

export default function Home() {
    const [step, setStep] = useState(0);


    return (
        <main className="flex min-h-screen justify-center items-center">
            <div className=" h-[700px] p-4 my-4">
                <h1 className="text-4xl ">Bokningsförfrågan</h1>
                <div className="p-2 mt-4 ">
                    {step === 0 && <OfferForm setStep={setStep} />}
                    {step === 1 && <PersonalForm setStep={setStep} />}
                </div>
            </div>
        </main>
    );
}
