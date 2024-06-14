"use client";
import React from "react";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";

const services = [
    { name: "Flytthjälp" },
    { name: "Flyttstädning" },
    { name: "Packning" },
    { name: "Montering" },
];

const locales = [{ name: "Inrikesflytt" }, { name: "Utrikesflytt" }];

interface OfferRequest {
    service: string[];
    locale: string;
}

const OfferForm = ({ setStep }: any) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const savedData = localStorage.getItem("OfferRequest");
    const data: OfferRequest = savedData ? JSON.parse(savedData) : null;

    console.log(data);

    return (
        <form
            onSubmit={handleSubmit((data) => {
                console.log(data);
                localStorage.setItem("OfferRequest", JSON.stringify(data));
                setStep(1);
                window.scrollTo({ top: 0, behavior: "smooth" });
            })}
            className="grid justify-start space-y-3"
            action=""
        >
            <div className="space-y-1">
                <label className="font-medium" htmlFor="">
                    Vad behöver du hjälp med?
                </label>
                <CheckboxGroup
                    className="font-bold"
                    label=""
                    color="warning"
                    defaultValue={data ? data.service : []}
                >
                    <div className="grid grid-cols-2 gap-2">
                        {services.map((service) => (
                            <Checkbox
                                className="font-normal border m-0 rounded-md min-w-52 data-[selected=true]:border-warning"
                                size="md"
                                value={service.name}
                                key={service.name}
                                {...register("service", { required: true })}
                            >
                                {service.name}
                            </Checkbox>
                        ))}
                    </div>
                </CheckboxGroup>
                {errors.service && errors.service.type === "required" && (
                    <span className="text-xs text-red-500 mt-0 p-0">
                        Välj vad du behöver hjälp med
                    </span>
                )}
            </div>

            <div className="grid gap-1">
                <label className="font-medium">Din flytt är</label>
                <RadioGroup
                    className="font-bold text-black"
                    label=""
                    color="warning"
                    defaultValue={data ? data.locale : ""}
                    {...register("locale", { required: true })}
                >
                    <div className="grid gap-2">
                        {locales.map((locale) => (
                            <Radio
                                className="border m-0 rounded-md min-w-52 font-normal data-[selected=true]:border-warning"
                                value={locale.name}
                                key={locale.name}
                                {...register("locale")}
                            >
                                {locale.name}
                            </Radio>
                        ))}
                    </div>
                </RadioGroup>
                {errors.locale && errors.locale.type === "required" && (
                    <span className="text-xs text-red-500 mt-0 p-0">
                        Typ av flytt krävs
                    </span>
                )}
            </div>
            <Button
                type="submit"
                className="bg-[#FF5100] w-1/2 font-semibold text-md text-white hover:text-black"
            >
                Nästa
            </Button>
        </form>
    );
};

export default OfferForm;
