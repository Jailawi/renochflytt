"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ServiceSelection from "./ServiceSelection";
import PersonalForm from "./PersonalForm";
import { Button } from "@nextui-org/react";
import AdressForm from "./AdressForm";

const steps = [
  {
    id: "Step 1",
    name: "Välja tjänst",
    fields: ["service", "locale"],
  },
  {
    id: "Step 2",
    name: "Personlig information",
    fields: ["customerType", "name", "email", "phone", "rutavdrag"],
  },
  {
    id: "Step 3",
    name: "Adress",
    fields: [
      "currentRecidence",
      "currentAdress",
      "currentPostcode",
      "currentCity",
      "currentRecidenceArea",
      "currentFloor",
      "currentElevator",
      "newRecidence",
      "newAdress",
      "newPostcode",
      "newCity",
      "newRecidenceArea",
      "newFloor",
      "newElevator",
    ],
  },
];

const offerForm = () => {
  const [step, setStep] = useState(0);
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const next = async () => {
    const fields = steps[step].fields;
    const output = await trigger(fields, { shouldFocus: true });

    if (!output) return;

    if (step < 2) {
      setStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (step != 0) {
      setStep((step) => step - 1);
    }
  };

  const formState = watch();

  return (
    <form
      className="flex flex-col gap-4 mt-4"
      onSubmit={handleSubmit((data) => {
        console.log(data);
        setDate({
          startDate: null,
          endDate: null,
        });
        reset();
        setStep(0);
        window.scrollTo({ top: 0, behavior: "smooth" });
      })}
    >
      {step === 0 && (
        <ServiceSelection
          register={register}
          errors={errors}
          formState={formState}
        />
      )}
      {step === 1 && (
        <PersonalForm
          register={register}
          errors={errors}
          formState={formState}
          date={date}
          setDate={setDate}
        />
      )}
      {step === 2 && (
        <AdressForm register={register} errors={errors} formState={formState} />
      )}
      <div className="flex gap-2">
        {step > 0 && (
          <Button
            type="button"
            onClick={prev}
            className="bg-gray-400 w-1/2 font-semibold text-md text-white hover:text-black"
          >
            Gå tillbaka
          </Button>
        )}
        {step < 2 && (
          <Button
            type="button"
            onClick={next}
            className="bg-[#FF5100] w-1/2 font-semibold text-md text-white hover:text-black"
          >
            Nästa
          </Button>
        )}
        {step == 2 && (
          <Button
            type="submit"
            className="bg-[#FF5100] w-1/2 font-semibold text-md text-white hover:text-black"
          >
            Skicka förfrågan
          </Button>
        )}
      </div>
    </form>
  );
};

export default offerForm;
