import React from "react";
import { Radio, RadioGroup, Input } from "@nextui-org/react";
import Datepicker from "react-tailwindcss-datepicker";

const customerTypes = ["Privatperson", "Företag"];
const isMoivngDateFlexible = ["Ja", "Nej"];
const rutAvdrag = ["Ja", "Nej"];

const PersonalForm = ({ register, errors, formState, date, setDate }: any) => {
  return (
    <div className="grid justify-start space-y-3">
      <div className="grid gap-2">
        <label className="font-medium">Information om dig</label>
        <RadioGroup
          className="font-bold text-black"
          color="warning"
          {...register("customerType", { required: true })}
          defaultValue={formState.customerType}
        >
          <div className="flex gap-2">
            {customerTypes.map((customerType) => (
              <Radio
                className="border border-[#DDDDDD] m-0 rounded-md min-w-52 font-normal data-[selected=true]:border-warning hover:bg-gray-100"
                value={customerType}
                key={customerType}
                {...register("customerType")}
              >
                {customerType}
              </Radio>
            ))}
          </div>
        </RadioGroup>
        {errors.customerType && errors.customerType.type === "required" && (
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
          defaultValue={formState.name}
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
          defaultValue={formState.email}
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
          defaultValue={formState.phone}
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
          onChange={setDate}
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
          defaultValue={formState.flexible}
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
            defaultValue={formState.rutavdrag}
            {...register("rutavdrag", { required: true })}
          >
            <div className="flex gap-2">
              {rutAvdrag.map((option) => (
                <Radio
                  className="border border-[#DDDDDD] m-0 rounded-md min-w-52 font-normal data-[selected=true]:border-warning hover:bg-gray-100"
                  value={option}
                  key={option}
                  {...register("rutavdrag")}
                >
                  {option}
                </Radio>
              ))}
            </div>
          </RadioGroup>
          {errors.rutavdrag && errors.rutavdrag.type === "required" && (
            <span className="text-xs text-red-500 mt-0 p-0">Fältet krävs</span>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalForm;
