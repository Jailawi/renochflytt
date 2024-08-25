import { divider, Input, Radio, RadioGroup } from "@nextui-org/react";
import React from "react";

const adress = ["current", "new"];
const residences = ["Lägenhet", "Villa", "Radhus"];
const elevator = ["Ja", "Nej"];

const AdressForm = ({ register, errors, formState }: any) => {
  let adressTrigger =
    formState?.service &&
    formState.service[0] === "Flyttstädning" &&
    formState.service.length === 1
      ? ["current"]
      : adress;
  return (
    <div className="grid justify-start gap-10">
      {adressTrigger.map((adress) => {
        const dynamicRecidence = `${adress}Recidence`;
        const dynamicAdress = `${adress}Adress`;
        const dynamicPostcode = `${adress}Postcode`;
        const dynamicCity = `${adress}City`;
        const dynamicRecidenceArea = `${adress}RecidenceArea`;
        const dynamicFloor = `${adress}Floor`;
        const dynamicElevator = `${adress}Elevator`;

        return (
          <div className="grid justify-start space-y-3">
            <label className="font-medium text-xl">
              {adress === "current" ? "Nuvarande" : "Ny"} bostad
            </label>
            <div className="grid gap-2">
              <label className="font-medium">Bostad</label>
              <RadioGroup
                className="font-bold text-black"
                color="warning"
                {...register(dynamicRecidence, { required: true })}
                defaultValue={formState[dynamicRecidence]}
              >
                <div className="flex gap-2">
                  {residences.map((recidence) => (
                    <Radio
                      className="border border-[#DDDDDD] m-0 rounded-md min-w-52 font-normal data-[selected=true]:border-warning hover:bg-gray-100"
                      value={recidence}
                      key={recidence}
                      {...register(dynamicRecidence)}
                    >
                      {recidence}
                    </Radio>
                  ))}
                </div>
              </RadioGroup>
              {errors[dynamicRecidence] &&
                errors[dynamicRecidence].type === "required" && (
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
                label={"Adress"}
                defaultValue={formState[dynamicAdress]}
                {...register(dynamicAdress, {
                  required: true,
                })}
              />
              {errors[dynamicAdress] &&
                errors[dynamicAdress].type === "required" && (
                  <span className="text-xs text-red-500 mt-0 p-0">
                    Adress krävs
                  </span>
                )}
            </div>
            <div>
              <Input
                variant="bordered"
                classNames={{ inputWrapper: "border-1" }}
                type="text"
                label={"Postnummer"}
                defaultValue={formState[dynamicPostcode]}
                {...register(dynamicPostcode, {
                  required: true,
                })}
              />
              {errors[dynamicPostcode] &&
                errors[dynamicPostcode].type === "required" && (
                  <span className="text-xs text-red-500 mt-0 p-0">
                    Postnummer krävs
                  </span>
                )}
            </div>
            <div>
              <Input
                variant="bordered"
                classNames={{ inputWrapper: "border-1" }}
                type="text"
                label={"Stad"}
                defaultValue={formState[dynamicCity]}
                {...register(dynamicCity, {
                  required: true,
                })}
              />
              {errors[dynamicCity] &&
                errors[dynamicCity].type === "required" && (
                  <span className="text-xs text-red-500 mt-0 p-0">
                    Adress krävs
                  </span>
                )}
            </div>
            <div>
              <Input
                variant="bordered"
                classNames={{ inputWrapper: "border-1" }}
                type="text"
                label={"Antal kvm"}
                defaultValue={formState[dynamicRecidenceArea]}
                {...register(dynamicRecidenceArea, {
                  required: true,
                })}
              />
              {errors[dynamicRecidenceArea] &&
                errors[dynamicRecidenceArea].type === "required" && (
                  <span className="text-xs text-red-500 mt-0 p-0">
                    Obligatoriskt fält
                  </span>
                )}
            </div>
            {formState[dynamicRecidence] === "Lägenhet" && (
              <div className="grid gap-2">
                <div>
                  <Input
                    variant="bordered"
                    classNames={{ inputWrapper: "border-1" }}
                    type="text"
                    label={"Våning"}
                    defaultValue={formState[dynamicFloor]}
                    {...register(dynamicFloor, {
                      required: true,
                    })}
                  />
                  {errors[dynamicFloor] &&
                    errors[dynamicFloor].type === "required" && (
                      <span className="text-xs text-red-500 mt-0 p-0">
                        Våning krävs
                      </span>
                    )}
                </div>
                <div className="grid gap-1">
                  <label className="font-medium">
                    Finns hiss tillgängligt?
                  </label>
                  <RadioGroup
                    className="font-bold text-black"
                    color="warning"
                    {...register(dynamicElevator, { required: true })}
                    defaultValue={formState[dynamicElevator]}
                  >
                    <div className="flex gap-2">
                      {elevator.map((option) => (
                        <Radio
                          className="border border-[#DDDDDD] m-0 rounded-md min-w-52 font-normal data-[selected=true]:border-warning hover:bg-gray-100"
                          value={option}
                          key={option}
                          {...register(dynamicElevator)}
                        >
                          {option}
                        </Radio>
                      ))}
                    </div>
                  </RadioGroup>
                  {errors[dynamicElevator] &&
                    errors[dynamicElevator].type === "required" && (
                      <span className="text-xs text-red-500 mt-0 p-0">
                        Detta fält krävs
                      </span>
                    )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AdressForm;
