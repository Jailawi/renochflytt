"use client";
import React from "react";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { RadioGroup, Radio } from "@nextui-org/radio";

const services = [
  { name: "Flytthjälp" },
  { name: "Flyttstädning" },
  { name: "Packning" },
  { name: "Montering" },
];

const locales = [{ name: "Inrikesflytt" }, { name: "Utrikesflytt" }];

const ServiceSelection = ({ register, errors, formState }: any) => {
  
  return (
    <div className="grid justify-start space-y-3">
      <div className="space-y-1">
        <label className="font-medium" htmlFor="">
          Vad behöver du hjälp med?
        </label>
        <CheckboxGroup className="font-bold" label="" color="warning" defaultValue={formState.service}>
          <div className="grid grid-cols-2 gap-2">
            {services.map((service) => (
              <Checkbox
                className="font-normal border m-0 rounded-md min-w-52 data-[selected=true]:border-warning hover:bg-gray-100"
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
          defaultValue={formState.locale}
          {...register("locale", { required: true })}
        >
          <div className="grid gap-2">
            {locales.map((locale) => (
              <Radio
                className="border m-0 rounded-md min-w-52 font-normal data-[selected=true]:border-warning hover:bg-gray-100"
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
    </div>
  );
};

export default ServiceSelection;
