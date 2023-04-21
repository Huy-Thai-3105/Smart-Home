import { useState } from "react";
import { Icon } from "@iconify/react";

export const ToggleButton = (props: {
  toggleHeight: string;
  label: string;
  callback: () => void;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="flex flex-row items-start gap-2" onClick={props.callback}>
      <div className="transition-transform active:scale-110">
        {!isChecked ? (
          <Icon
            icon="carbon:checkbox"
            height={props.toggleHeight}
            onClick={() => setIsChecked(!isChecked)}
          />
        ) : (
          <Icon
            icon="carbon:checkbox-checked-filled"
            height={props.toggleHeight}
            onClick={() => setIsChecked(!isChecked)}
          />
        )}
      </div>
      <div className="grow pt-1 text-lg">{props.label}</div>
    </div>
  );
};
