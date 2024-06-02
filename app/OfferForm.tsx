import React from "react";
import { Checkbox } from "@nextui-org/checkbox";
import { RadioGroup, Radio } from "@nextui-org/radio";

const services = [
  { name: "Flytthjälp" },
  { name: "Flyttstädning" },
  { name: "Packning" },
  { name: "Montering" },
];

const locales = [{ name: "Inrikesflytt" }, { name: "Utrikesflytt" }];
const OfferForm = () => {
  return (
    <div className="w-[500px] h-[700px] rounded-md p-4 border shadow-md">
      <form className="grid justify-start space-y-5" action="">
        <label className="text-2xl mb-4">Bokningsförfrågan</label>
        <div className="space-y-1">
          <label className="font-bold mb-2" htmlFor="">
            Vad behöver du hjälp med?
          </label>
          <div className="grid grid-cols-2 gap-1">
            {services.map((service) => (
              <Checkbox
                className="border m-0 rounded-md min-w-52"
                size="md"
                key={service.name}
              >
                {service.name}
              </Checkbox>
            ))}
          </div>
        </div>
        <div className="grid space-y-1">
          <RadioGroup label="Din flytt är">
            {locales.map((locale) => (
              <Radio className="border m-0 rounded-md min-w-52" value={locale.name}>
                {locale.name}
              </Radio>
            ))}
          </RadioGroup>
        </div>
      </form>
    </div>
  );
};

export default OfferForm;
