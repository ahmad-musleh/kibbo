"use client";
import { ToggleSwitch } from "flowbite-react";

export default function Toggle({
  text,
  state,
  updateToggleState,
}: {
  text: string;
  state: boolean;
  updateToggleState: Function;
}) {
  return (
    <>
      <label className="relative my-2 inline-flex w-full cursor-pointer justify-between rounded-lg bg-[#505051] p-4">
        <span className=""> {text} </span>
        <ToggleSwitch
          className=""
          checked={state}
          label=""
          onChange={() => updateToggleState()}
        />
      </label>
    </>
  );
}
