"use client";
import React, { useEffect, useState } from "react";
import { Button, Radio, RadioGroup, Input } from "@nextui-org/react";
import Datepicker from "react-tailwindcss-datepicker";
import { useForm } from "react-hook-form";

const customerTypes = [{ type: "Privatperson" }, { type: "Företag" }];

const isMoivngDateFlexible = ["Ja", "Nej"];
const rutAvdrag = ["Ja", "Nej"];

const PersonalForm = ({ setStep }: any) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    const [date, setDate] = useState({
        startDate: null,
        endDate: null,
    });
    const handleDateChange = (newDate: any) => {
        setDate(newDate);
    };
    const formState = watch();

    // Save form state to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("formState", JSON.stringify(formState));
    }, [formState]);

    useEffect(() => {
        const savedFormState = localStorage.getItem('formState');
        if (savedFormState) {
          const parsedFormState = JSON.parse(savedFormState);
          for (const key in parsedFormState) {
            setValue(key, parsedFormState[key]);
          }
        }
      }, [setValue]);

    return (
        <form
            className="grid justify-start space-y-3"
            action=""
            onSubmit={handleSubmit((data) => {
                console.log({ ...data, ...date });
                setStep(2);
                window.scrollTo({ top: 0, behavior: "smooth" });
                localStorage.clear();
            })}
        >
            <div className="grid gap-2">
                <label className="font-medium">Information om dig</label>
                <RadioGroup
                    className="font-bold text-black"
                    color="warning"
                    {...register("customerType", { required: true })}
                >
                    <div className="flex gap-2">
                        {customerTypes.map((customer) => (
                            <Radio
                                className="border border-[#DDDDDD] m-0 rounded-md min-w-52 font-normal data-[selected=true]:border-warning hover:bg-gray-100"
                                value={customer.type}
                                key={customer.type}
                                onSelect={() =>
                                    setValue("customerType", customer.type)
                                }
                                {...register("customerType")}
                            >
                                {customer.type}
                            </Radio>
                        ))}
                    </div>
                </RadioGroup>
                {errors.customerType &&
                    errors.customerType.type === "required" && (
                        <span className="text-xs text-red-500 mt-0 p-0">
                            Detta fält krävs
                        </span>
                    )}
            </div>
            <div>
                <Input
                    variant="bordered"
                    classNames={{ inputWrapper: "border-1" }}
                    type="text"
                    label={
                        formState.customerType === "Företag"
                            ? "Företagsnamn"
                            : "Fullständigt namn"
                    }
                    {...register("name", {
                        required: true,
                    })}
                />
                {errors.name && (
                    <span className="text-xs text-red-500 mt-0 p-0">
                        {formState.customerType === "Företag"
                            ? "Företagsnamn"
                            : "Fullständigt namn"}{" "}
                        krävs
                    </span>
                )}
            </div>
            <div>
                <Input
                    variant="bordered"
                    classNames={{ inputWrapper: "border-1" }}
                    type="email"
                    label="E-postadress"
                    {...register("email", {
                        required: true,
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Invalid email address",
                        },
                    })}
                />
                {errors.email && (
                    <span className="text-xs text-red-500 mt-0 p-0">
                        Ogiltig e-postadress
                    </span>
                )}
            </div>
            <div>
                <Input
                    variant="bordered"
                    classNames={{ inputWrapper: "border-1" }}
                    type="tel"
                    label="Telefonnummer"
                    {...register("phone", { required: true })}
                />
                {errors.phone && errors.phone.type === "required" && (
                    <span className="text-xs text-red-500 mt-0 p-0">
                        Telefonnummer krävs
                    </span>
                )}
            </div>
            <div className="border border-[#DDDDDD] rounded-md text-sm pt-2">
                <label className="px-4" htmlFor="">
                    När behöver du hjälp?
                </label>
                <Datepicker
                    startWeekOn="mon"
                    i18n={"sv"}
                    primaryColor={"orange"}
                    useRange={false}
                    asSingle={true}
                    value={date}
                    onChange={handleDateChange}
                />
            </div>
            <div className="grid gap-1">
                <label className="font-medium">
                    Är ditt flyttdatum/städdatum flexibelt?
                </label>
                <RadioGroup
                    className="font-bold text-black"
                    label=""
                    color="warning"
                    {...register("flexible")}
                >
                    <div className="flex gap-2">
                        {isMoivngDateFlexible.map((option) => (
                            <Radio
                                {...register("flexible")}
                                className="border border-[#DDDDDD] m-0 rounded-md min-w-52 font-normal data-[selected=true]:border-warning hover:bg-gray-100"
                                value={option}
                                key={option}
                            >
                                {option}
                            </Radio>
                        ))}
                    </div>
                </RadioGroup>
            </div>
            {formState.customerType === "Privatperson" && (
                <div className="grid gap-1">
                    <label className="font-medium">
                        Är du berättigad till Rutavdrag?
                    </label>
                    <RadioGroup
                        className="font-bold text-black"
                        label=""
                        color="warning"
                        {...register("rutavdrag")}
                    >
                        <div className="flex gap-2">
                            {rutAvdrag.map((option) => (
                                <Radio
                                    className="border border-[#DDDDDD] m-0 rounded-md min-w-52 font-normal data-[selected=true]:border-warning hover:bg-gray-100"
                                    value={option}
                                    key={option}
                                    {...register("rutavvdrag")}
                                >
                                    {option}
                                </Radio>
                            ))}
                        </div>
                    </RadioGroup>
                </div>
            )}
            <div className="flex gap-2">
                <Button
                    type="button"
                    onClick={() => setStep(0)}
                    className="bg-gray-400 w-1/2 font-semibold text-md text-white hover:text-black"
                >
                    Gå tillbaka
                </Button>
                <Button
                    type="submit"
                    className="bg-[#FF5100] w-1/2 font-semibold text-md text-white hover:text-black"
                >
                    Nästa
                </Button>
            </div>
        </form>
    );
};

export default PersonalForm;
